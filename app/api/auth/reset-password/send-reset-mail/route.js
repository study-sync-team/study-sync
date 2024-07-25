import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';
import supabase from "@/app/config/supabase";
import btoa from 'btoa';


export async function POST(req) {
    // Retrieve the headers from the incoming request
    const headersInstance = headers();

    // Extract the 'authorization' header from the request headers
    const authorization = headersInstance.get('authorization');

    if (!authorization) {
        return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
    }

    // Split the 'authorization' header to separate the Bearer token
    const splited_authorization = authorization.split("Bearer ");

    if (splited_authorization.length !== 2) {
        return NextResponse.json({ error: 'Invalid authorization format' }, { status: 401 });
    }

    // Retrieve the Bearer token from the split result
    const bearer_token = splited_authorization[1];

    // Check if the Bearer token matches the expected value from the environment variables
    if (bearer_token !== process.env.MASTER_BEARER_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const json = await req.json();

    if (!json.email) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const send_reset_mail_data = {
        mail: json.email
    };

    function generateRandomCode() {
        const min = 1000;
        const max = 9999;
        const code = Math.floor(Math.random() * (max - min + 1)) + min;
        return code;
    }
    const randomCode = generateRandomCode();

    async function SendResetPasswordMail(receiver, code, user_id) {

        try {


            //broswer const encoded_code = btoa(randomCode.toString());



            const transporter = nodemailer.createTransport({
                port: 465,
                host: "smtp.gmail.com",
                auth: {
                    user: "usestudysyncapp@gmail.com",
                    pass: process.env.GOOGLE_PASSWORD,
                },
                secure: true,
            });

            const mailData = {
                from: "usestudysyncapp@gmail.com",
                to: receiver,
                subject: "Study Sync | Reset your Study Sync Password",
                text: "Study Sync | Reset your Study Sync Password",
                html: `
                <!DOCTYPE html>
                    <html>
                        <head>

                            <meta charset="utf-8">
                            <meta http-equiv="x-ua-compatible" content="ie=edge">
                            <title>Study Sync| Reset your Study Sync Password</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <style type="text/css">
                                /**
                                * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                                */
                                @media screen {
                                    @font-face {
                                        font-family: 'Source Sans Pro';
                                        font-style: normal;
                                        font-weight: 400;
                                        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                                    }
                                    @font-face {
                                        font-family: 'Source Sans Pro';
                                        font-style: normal;
                                        font-weight: 700;
                                        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                                    }
                                }
                        
                                body,
                                table,
                                td,
                                a {
                                    -ms-text-size-adjust: 100%; /* 1 */
                                    -webkit-text-size-adjust: 100%; /* 2 */
                                }
                        
                                table,
                                td {
                                    mso-table-rspace: 0pt;
                                    mso-table-lspace: 0pt;
                                }
  
                                img {
                                    -ms-interpolation-mode: bicubic;
                                }
 
                                a[x-apple-data-detectors] {
                                    font-family: inherit !important;
                                    font-size: inherit !important;
                                    font-weight: inherit !important;
                                    line-height: inherit !important;
                                    color: inherit !important;
                                    text-decoration: none !important;
                                }
  
                                div[style*="margin: 16px 0;"] {
                                    margin: 0 !important;
                                }
                                body {
                                    width: 100% !important;
                                    height: 100% !important;
                                    padding: 0 !important;
                                    margin: 0 !important;
                                }
                    
                                table {
                                    border-collapse: collapse !important;
                                }
                                a {
                                    color: #1a82e2;
                                }
                                img {
                                    height: auto;
                                    line-height: 100%;
                                    text-decoration: none;
                                    border: 0;
                                    outline: none;
                                }
                            </style>

                        </head>
                        <body style="background-color: #F7F2F6;">

                        <!-- start preheader -->
                        <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                        Verify your email address
                        </div>
                        <!-- end preheader -->

                        <!-- start body -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">

                        <!-- start logo -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef">
                                <!--[if (gte mso 9)|(IE)]>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                    <tr>
                                        <td align="center" valign="top" width="600">
                                            <![endif]-->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="center" valign="top" style="padding: 36px 24px;">
                                                        <a href="https://studysyncapp.xyz" target="_blank" style="display: inline-block;">
                                                            <img src="https://studysyncapp.xyz/logo2.png" alt="Logo" border="0" width="300" style="display: block; width: 300px; max-width: 300px; min-width: 300px;">
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if (gte mso 9)|(IE)]>
                                        </td>
                                    </tr>
                                </table>
                                <![endif]-->
                            </td>
                        </tr>
                        <!-- end logo -->

                        <!-- start hero -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef">
                                <!--[if (gte mso 9)|(IE)]>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                    <tr>
                                        <td align="center" valign="top" width="600">
                                            <![endif]-->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset your Study Sync Password</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if (gte mso 9)|(IE)]>
                                        </td>
                                    </tr>
                                </table>
                                <![endif]-->
                            </td>
                        </tr>
                        <!-- end hero -->

                        <!-- start copy block -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef">
                                <!--[if (gte mso 9)|(IE)]>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                    <tr>
                                        <td align="center" valign="top" width="600">
                                            <![endif]-->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                                                <!-- start copy -->
                                                <tr>
                                                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                                        <p style="margin: 0;">Hi ${receiver},</p>
                                                        <br />
                                                        <p style="margin: 0;">We received a request to reset your password for your Study Sync account. To proceed, simply click on the link below</p>
                                                        <br />
                                                        <p style="margin: 0;"><a href=https://studysyncapp.xyz/reset-password/${code}/${user_id}>Click here to reset your password</a></p>
                                                    </td>
                                                </tr>
                                                <!-- end copy -->

                                                

                                            </table>
                                            <!--[if (gte mso 9)|(IE)]>
                                        </td>
                                    </tr>
                                </table>
                                <![endif]-->
                            </td>
                        </tr>
                        <!-- end copy block -->

                        <!-- start footer -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                                <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                        <tr>
                                            <td align="center" valign="top" width="600">
                                                <![endif]-->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                                                    <!-- start permission -->
                                                    <tr>
                                                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                                            <p style="margin: 0;">You received this email because we received a request of a password reset for your account. If you didn't request this you can safely delete this email.</p>
                                                        </td>
                                                    </tr>
                                                    <!-- end permission -->

                                                    <!-- start unsubscribe -->
                                                    <tr>
                                                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                                            <p style="margin: 0;">To stop receiving these emails, you can <a href="" target="_blank">unsubscribe</a> at any time.</p>
                                                            <p style="margin: 0;">From the cool kids building epic shit</p>
                                                        </td>
                                                    </tr>
                                                    <!-- end unsubscribe -->

                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                            </td>
                                        </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                            <!-- end footer -->

                        </table>
                        <!-- end body -->

                    </body>
                </html>
                `
            };

            return new Promise((resolve, reject) => {
                transporter.sendMail(mailData, function (err, info) {
                    if (err) {
                        console.error('Error sending email:', err);
                        reject(err);
                    } else {
                        resolve(info);
                    }
                });
            });

        } catch (error) {

            return { message: "Could not send", status: 500 };

        }

    }

    async function InsertResetCodeIntoDb(email, code, ran) {

        try {

            const { data, error } = await supabase
                .from('users')
                .select('user_id')
                .eq('email', email)
                .single();

            if (error) {
                return { message: "Email does not exist", status: 500 }
            } else {

                try {

                    const { error } = await supabase
                        .from("reset_password")
                        .insert({
                            "code": ran,
                            "status": "active",
                        });
                    if (error) {
                        return { message: "Could not insert", status: 500 }
                    } else {
                        await SendResetPasswordMail(email, code, data.user_id);
                        return { message: "Reset password mail sent", status: 200 }
                    }

                } catch (error) {
                    return { message: "Could not insert", status: 500 }
                }

            }

        } catch (error) {
            return { message: "Email does not exist", status: 500 }
        }

    }

    try {
        const insert_reset_code = await InsertResetCodeIntoDb(send_reset_mail_data.mail, randomCode, randomCode)
        return NextResponse.json({ message: insert_reset_code.message }, { status: insert_reset_code.status });
    } catch (error) {
        console.error('Failed to send reset password email:', error);
        return NextResponse.json({ message: "Could not send email" }, { status: 500 });
    }
}