const db = require("../../db/db");
const { success, error } = require("../../helpers/response");
const { generateOtp } = require("../../services/generateOtp");
const { sendmail } = require("../../services/sendMail");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../../common/jwt");
const {
  verificationEmailTemplate,
} = require("../../templates/verificationEmail");
const moment = require("moment");
const { forgotPasswordTemplate } = require("../../templates/forgotPassword");
const { createResetToken } = require("../../services/createPasswordResetToken");

// test
const test = async (req, res) => {
  try {
    return success(res, { user: req.user }, 200, "route working");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// send otp
const sendOtp = async (req, res) => {
  const { email, phone } = req.body;

  try {
    if (!email && !phone) {
      return error(res, "Choose either email or phone", null, 403);
    }

    const otp = generateOtp(); // common function to create 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // check if user already exists (for email)
    if (email) {
      const user = await db("users").where({ email }).first();
      if (user) {
        return error(res, "Email Already Exists", null, 400);
      }

      // store OTP
      await db("otps").insert({ email, otp, expiresAt });

      // send the otp email
      await sendmail({
        to: email,
        subject: "Email Verification",
        html: verificationEmailTemplate({ otp }),
      });

      return success(res, null, 200, "Otp sent!, check your inbox");
    }

    // for phone later
    if (phone) {
      const user = await db("users").where({ phone }).first();
      if (user) {
        return error(res, "Phone No Already Exists", null, 400);
      }
      // store OTP
      await db("otps").insert({ phone, otp, expiresAt });

      return success(res, { otp }, 200, "Use this OTP");
    }
  } catch (err) {
    return error(res, "Something went wrong......", err.message, 500);
  }
};

//verify user
const verifyEmail = async (req, res) => {
  const { email, phone, otp } = req.body;

  try {
    // Validation
    if (email && otp) {
      if (!email || !otp) {
        return error(res, "Email and OTP are required", null, 403);
      }

      // Find OTP record
      const otpEntry = await db("otps")
        .where({ email, otp })
        .andWhere("expiresAt", ">", new Date()) // check expiry
        .first();

      if (!otpEntry) {
        return error(res, "Invalid or expired OTP", null, 400);
      }

      // OTP verified -- cleanup (delete OTP so it can’t be reused)
      await db("otps").where({ id: otpEntry.id }).del();

      await db("users").insert({
        email,
        emailOtp: otpEntry.otp,
        emailVerified: true,
      });
      return success(res, null, 200, "OTP verified!");
    }
    if (phone && otp) {
      if (!phone || !otp) {
        return error(res, "Phone and OTP are required", null, 403);
      }

      // Find OTP record
      const otpEntry = await db("otps")
        .where({ phone, otp })
        .andWhere("expiresAt", ">", new Date()) // check expiry
        .first();

      if (!otpEntry) {
        return error(res, "Invalid or expired OTP", null, 400);
      }

      // OTP verified -- cleanup (delete OTP so it can’t be reused)
      await db("otps").where({ id: otpEntry.id }).del();

      await db("users").insert({
        phone,
        phoneOtp: otpEntry.otp,
        mobileVerified: true,
      });
      return success(res, null, 200, "OTP verified!");
    }
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// complete user profile
const createProfile = async (req, res) => {
  try {
    const { name, username, email, phone } = req.body;

    // validation
    if (!name || !username || (!email && !phone)) {
      return error(res, "Name, username and email are required", null, 403);
    }

    // profile picture must be uploaded
    if (!req.file) {
      return error(res, "Profile picture is required", null, 403);
    }

    // filename comes from multer
    const filename = req.file.filename; // stored file name
    const filePath = req.filePath; // middleware already sets this relative path

    // check if username is unique
    const existing = await db("users").where({ username }).first();
    if (existing) {
      return error(res, "Username already taken", null, 400);
    }
    if (email) {
      // update user profile (assuming user already has a row after OTP verification)
      await db("users").where({ email }).update({
        name,
        username,
        profile_pic: filename,
        updated_at: new Date(),
      });
    }
    if (phone) {
      // update user profile (assuming user already has a row after OTP verification)
      await db("users").where({ phone }).update({
        name,
        username,
        profile_pic: filename,
        updated_at: new Date(),
      });
    }

    return success(res, "Profile created", 201);
  } catch (err) {
    return error(res, "something went wrong!", err.message, 500);
  }
};

// create password
const setPassword = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    // validation
    if ((!email && !phone) || !password) {
      return error(res, "Email, Phone and password are required", null, 400);
    }

    // check if user exists
    const userExists = await db("users")
      .where(function () {
        if (email) this.orWhere({ email });
        if (phone) this.orWhere({ phone });
      })
      .first();

    if (!userExists) {
      return error(res, "User not found", null, 404);
    }

    // check if password already set
    // if (user.password) {
    //   return error(res, "Password already set. Please login.", 400);
    // }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (email) {
      // update user with password
      await db("users").where({ email }).update({
        password: hashedPassword,
        status: true,
        updated_at: new Date(),
      });
    }
    if (phone) {
      // update user with password
      await db("users").where({ phone }).update({
        password: hashedPassword,
        status: true,
        updated_at: new Date(),
      });
    }
    // creating the token with user details without passsword
    const user = await db("users")
      .where({ id: userExists.id })
      .select(
        "id",
        "role",
        "name",
        "userName",
        "email",
        "emailOtp",
        "phone",
        "phoneOtp",
        "mobileVerified",
        "emailVerified",
        "profile_pic",
        "status",
        "created_at",
        "updated_at"
      )
      .first();

    //common function to create the token
    const token = generateJwtToken(user);
    return success(
      res,
      { token },

      201,
      "Password created!"
    );
  } catch (err) {
    return error(res, "Something went wrong", err.message, 400);
  }
};

// forgot password
const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return error(res, "Username is required", null, 400);
    }

    const user = await db("users").where({ username }).first();
    if (!user) {
      return error(res, "Username not found!", null, 404);
    }

    const token = createResetToken(); // generate the secure random token

    await db("password_resets").insert({
      user_id: user.id,
      token,
      expires_at: moment().add(5, "minutes").toDate(),
    });

    const resetPasswordLink =
      process.env.REACT_APP_FRONT_URL + "/reset-password/" + token;

    // for email
    await sendmail({
      to: user.email,
      subject: "Dear Click: Reset Password",
      html: forgotPasswordTemplate({
        name: user.name,
        link: resetPasswordLink,
      }),
    });

    // by phone Number added after

    return success(
      res,
      " ",
      201,
      "Reset password link Sent! Check your inbox."
    );
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// verify the token and reset password
const verifyAndResetPassword = async (req, res) => {
  try {
    const { token, new_password } = req.body;

    if (!token || !new_password) {
      return error(res, "Password required", null, 400);
    }

    const resetEntry = await db("password_resets").where({ token }).first();
    if (!resetEntry) {
      return error(res, "Invalid token! Please try again later", null, 400);
    }

    const expiresAt = moment(resetEntry.expires_at, "YYYY-MM-DD HH:mm:ss");
    if (moment().isAfter(expiresAt)) {
      return error(res, "Link expired! Try again", null, 400);
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await db("users").where({ id: resetEntry.user_id }).update({
      password: hashedPassword,
    });

    return success(res, null, 201, "Password reset successfully");
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong!", err.message, 500);
  }
};

// change the existing password
const changePassword = async (req, res) => {
  try {
    const { old_password, password } = req.body;
    if (!old_password || !password) {
      return error(res, "Both fields required!", null, 403);
    }
    // get the user id from the middleware
    const userId = req.user.id;
    const user = await db("users").where({ id: userId }).first();

    if (!user) {
      return error(res, "User not found!", null, 404);
    }

    // camparing current password with old password
    const comparedPassword = await bcrypt.compare(old_password, user.password);
    if (!comparedPassword) {
      return error(res, "Current Password Incorrect!", null, 403);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db("users")
      .where({ id: userId })
      .update({ password: hashedPassword });

    return success(res, null, 201, "New Password Updated!");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// signIn
const signIn = async (req, res) => {
  try {
    const { input, password } = req.body;

    if (!password) {
      return error(res, "Password required!", null, 400);
    }

    let user;

    // Detect type of input
    if (/^\S+@\S+\.\S+$/.test(input)) {
      // check if input is email
      user = await db("users").where({ email: input }).first();
    } else if (/^\d{10}$/.test(input)) {
      // check if input is phone (here assuming 10 digits,
      user = await db("users").where({ phone: input }).first();
    } else {
      // otherwise treat it as username
      user = await db("users").where({ userName: input }).first();
    }

    if (!user) {
      return error(res, "User not found!", null, 404);
    }

    // camparing the passwword with original password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return error(res, "Incorrect Password!", null, 401);
    }

    // creating the token with user details without passsword
    const UserToken = await db("users")
      .where({ id: user.id })
      .select(
        "id",
        "role",
        "name",
        "userName",
        "email",
        "emailOtp",
        "phone",
        "phoneOtp",
        "mobileVerified",
        "emailVerified",
        "profile_pic",
        "status",
        "created_at",
        "updated_at"
      )
      .first();

    // common function to create the token
    const token = generateJwtToken(UserToken);
    return success(res, { token }, 200, `Welcome back! ${user.userName}`);
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// update user details
const addUserDetails = async (req, res) => {
  try {
    const { bio, website, gender, dob, phone, email } = req.body;
    // validation
    if (!bio && !website && !gender && !dob && !phone && !email) {
      return error(res, "Please provide at least one field!", null, 403);
    }
    // get the user from middleware
    const userId = req.user.id;
    const user = await db("users").where({ id: userId }).first();

    if (!user) {
      return error(res, "User not found!", null, 404);
    }

    const userDetails = await db("user_details").where({ userId }).first();

    if (!userDetails) {
      await db("user_details").insert({
        userId,
        bio,
        website,
        gender,
        date_of_birth: dob,
      });
    } else {
      await db("user_details").where({ userId }).update({
        userId,
        bio,
        website,
        gender,
        date_of_birth: dob,
      });
    }

    // update email or phone  only if data not entered before
    if (user.phone == null && phone) {
      await db("users").where({ id: userId }).update({
        phone,
      });
    }

    if (user.email == null && email) {
      await db("users").where({ id: userId }).update({
        email,
      });
    }

    return success(res, " ", 200, "Details Updated!");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// update account settings
const UserAccountSetting = async (req, res) => {
  try {
    const { account_type, account_privacy, language } = req.body;

    // get the user from middleware
    const userId = req.user.id;

    const user = await db("users").where({ id: userId }).first();

    if (!user) {
      return error(res, "User not found!", null, 404);
    }

    if (!account_type && !account_privacy && !language) {
      return error(res, "Please provide at least one field!", null, 403);
    }

    const existUser = await db("user_account_settings")
      .where({ userId })
      .first();

    // update privacy status in both tables
    if (!existUser) {
      await db("users").where({ id: userId }).update({ account_privacy });
      await db("user_account_settings").insert({
        userId,
        account_type,
        account_privacy,
        language,
      });
    } else {
      await db("users").where({ id: userId }).update({ account_privacy });
      await db("user_account_settings").where({ userId }).update({
        userId,
        account_type,
        account_privacy,
        language,
      });
    }

    return success(res, account_privacy, 200, "Settings Updated!");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// fetch user details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return error(res, "Id is required!", null, 403);
    }

    const existUser = await db("users").where({ id: userId }).first();

    if (!existUser) {
      return error(res, "User Not Found!", null, 403);
    }

    const user = await db("users")
      .leftJoin("user_details", "user_details.userId", "users.id")
      .leftJoin(
        "user_account_settings",
        "user_account_settings.userId",
        "users.id"
      )
      .select(
        "users.name",
        "users.email",
        "users.phone",
        "users.userName",
        "user_details.bio",
        "user_details.website",
        "user_details.date_of_birth",
        "user_details.gender",
        "user_account_settings.account_type",
        "user_account_settings.account_privacy",
        "user_account_settings.language"
      )
      .where("users.id", userId)
      .first();

    return success(res, { user }, 200, "User Fetched!");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

module.exports = {
  test,
  sendOtp,
  verifyEmail,
  createProfile,
  setPassword,
  forgotPassword,
  verifyAndResetPassword,
  changePassword,
  signIn,
  addUserDetails,
  getUserDetails,
  UserAccountSetting,
};
