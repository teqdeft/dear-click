const verificationEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body > 

  <table width="100%" border="0" cellspacing="0" cellpadding="0" padding:40px 0;">
    <tr>
      <td align="center">
        <!-- Card Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#fdfdfdff; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.1); padding:40px; width:80%;">
          <!-- <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="https://mytruestories.studioubique-dev.com/assets/image/Logo.png" alt="Welcome" width="80" style="display:block;"/>
            </td>
          </tr>  -->
          <!-- Greeting -->
         

          <!-- Title -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0; font-size:26px; color:#111; font-weight:bold;">Verify Your Email</h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="font-size:15px; line-height:1.6; color:#555; text-align:center; padding:0 20px 30px;">
              Thanks for signing up with <strong>Dear Click</strong>!  
              Please use the OTP below to verify your email address.  
              This helps us keep your account secure.
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <div style="display:inline-block; background:#f5f6fa; font-size:28px; font-weight:bold; letter-spacing:6px; padding:14px 28px; border-radius:12px; text-align:center;">
                ${data.otp}
              </div>
            </td>
          </tr>

          <!-- Note -->
          <tr>
            <td style="font-size:13px; color:#888; text-align:center; line-height:1.5;">
              If you didn’t request this verification, you can safely ignore this email.
            </td>
          </tr>
<tr>
            <td style="font-size:13px; color:#888; text-align:center; line-height:1.5;">
              With gratitude,<br/>
              <b>Dear Click Team</b>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

module.exports = { verificationEmailTemplate };
