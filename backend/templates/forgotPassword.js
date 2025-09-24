const forgotPasswordTemplate = (data) => {
  const emailContent = `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f5f6fa; width:100%;"> 

    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#F9F6F3; padding:40px 0;">
    
      <tr>
        <td align="center">
          <!-- Card Container -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#fdfdfdff; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.1); padding:40px; width:80%;">
          
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; font-size:22px; color:#333;">Hello <span style="color:#ae5fe7;">${data.name}</span>,</h2>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h1 style="margin:0; font-size:26px; color:#111; font-weight:bold;">Reset Your Password</h1>
              </td>
            </tr>

            <tr>
              <td style="font-size:15px; line-height:1.6; color:#555; text-align:center; padding:0 20px 30px;">
                Need to reset your password? No problem!  
                Just click the button below and you'll be on your way.  
                If you didn’t make this request, please ignore this email.
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding-bottom:30px;">
                <a href="${data.link}" style="background-color:#ae5fe7; color:#fff; text-decoration:none; padding:14px 36px; border-radius:8px; font-weight:bold; font-size:16px; display:inline-block;">
                  Reset Password
                </a>
              </td>
            </tr>

            <!-- Fallback link -->
            <tr>
              <td style="font-size:13px; color:#888; text-align:center; line-height:1.5;">
                If the button above doesn’t work, copy and paste this link into your browser:  
                <br/>
                <a href="${data.link}" style="color:#ae5fe7; word-break:break-all;">${data.link}</a>
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

  return emailContent;
};

module.exports = { forgotPasswordTemplate };
