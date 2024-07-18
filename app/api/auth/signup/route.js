import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { createHmac } from 'crypto'; // Use crypto for hashing
import supabase from "@/app/config/supabase";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

// Function to hash passwords
function hashPassword(password) {
    const hash = createHmac('sha256', process.env.PASSWORD_SALT)
        .update(password)
        .digest('hex');
    return hash;
}

export async function POST(req) {
    // Retrieve the headers from the incoming request
    const headersInstance = headers();

    // Extract the 'authorization' header from the request headers
    const authorization = headersInstance.get('authorization');

    // If there is no authorization header, return a 401 response
    if (!authorization) {
        return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
    }

    // Split the 'authorization' header to separate the Bearer token
    const splited_authorization = authorization.split("Bearer ");

    // Retrieve the Bearer token from the split result
    const bearer_token = splited_authorization[1];

    // Check if the Bearer token matches the expected value from the environment variables
    if (bearer_token === process.env.MASTER_BEARER_KEY) {
        const json = await req.json();

        // Ensure required fields exist in the JSON data
        if (!json.fullname || !json.email || !json.password || !json.country || !json.gender || !json.institution || !json.gradePoint) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const signup_data = {
            fullname: json.fullname,
            email: json.email,
            password: json.password,
            country: json.country,
            gender: json.gender,
            institution: json.institution,
            gradePoint: json.gradePoint
        };

        //checking if the email exists
        const { data } = await supabase
            .from('users')
            .select('*')
            .eq('email', signup_data.email);

        if (data.length > 0) {
            return NextResponse.json({ message: "Email already exist" }, { status: 500 });
        } else {
            // Hashing password
            const hashedPassword = hashPassword(signup_data.password);

            async function InsertUserDataIntoDb(email, password, fullname, country, gender, institution, grade) {
                // Generate user id
                const user_id = uuidv4();

                // Store data in supabase
                try {
                    const { error } = await supabase
                        .from("users")
                        .insert({
                            "user_id": user_id,
                            "email": email,
                            "password": password,
                            "role": "user",
                            "status": "pending",
                            "sub_status": "free",
                        });
                    if (error) {
                        return NextResponse.json({ message: error }, { status: 500 });
                    } else {
                        await InsertIntoUserProfileDb(user_id, fullname, country, gender, institution, grade);
                        function generateRandomCode() {
                            const min = 1000;
                            const max = 9999;
                            const code = Math.floor(Math.random() * (max - min + 1)) + min;
                            return code;
                        }
                        const randomCode = generateRandomCode();
                        await SendMail(fullname, "usestudysyncapp@gmail.com", process.env.GOOGLE_PASSWORD, email, `Welcome to Study Sync | Please verify your email address ${email}`, randomCode)
                        await InsertConfirmationCodeToDb(user_id, randomCode);
                        return NextResponse.json({ message: "Account Created" }, { status: 201 });
                    }
                } catch (error) {
                    return NextResponse.json({ message: error }, { status: 500 });
                }
            }


            async function SendMail(fullname,sender, password, reciver, subject, message) {
                const transporter = nodemailer.createTransport({
                    port: 465,
                    host: "smtp.gmail.com",
                    auth: {
                        user: sender,
                        pass: password,
                    },
                    secure: true,
                });

                const mailData = {
                    from: sender,
                    to: reciver,
                    subject: subject,
                    text: subject,
                    html: `
                    <!DOCTYPE html>
                        <html>
                            <head>
    
                                <meta charset="utf-8">
                                <meta http-equiv="x-ua-compatible" content="ie=edge">
                                <title>${subject}</title>
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
                                                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Verify your email address</h1>
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
                                                            <p style="margin: 0;">Hi ${fullname},</p>
                                                            <br />
                                                            <p style="margin: 0;">Thank you for signing up for a study sync account. Please confirm your email address by copying the code below and pasting it when you open this <a href="https://studysyncapp.xyz/setup/confirm-mail" target="_blank">Link</a> in to start using Study Sync.</p>
                                                            <br />
                                                            <p style="margin: 0;">Please note that the verification code is valid for the next 5 minutes. After that, it will expire, and you must request a new verification code.</p>
                                                        </td>
                                                    </tr>
                                                    <!-- end copy -->
    
                                                    <!-- start button -->
                                                    <tr>
                                                        <td align="left" bgcolor="#ffffff">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                                                        <table border="0" cellpadding="0" cellspacing="0">
                                                                            <tr>
                                                                                <td align="center" bgcolor="#85486e" style="border-radius: 6px;">
                                                                                    <span style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${message}</span>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- end button -->
    
                                                    <!-- start copy -->
                                                    <tr>
                                                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                                            <p style="margin: 0;">If you have any questions, send us an email usestudysyncapp@gmail.com.</p>
                                                        </td>
                                                    </tr>
                                                    <!-- end copy -->
    
                                                    <!-- start copy -->
                                                    <tr>
                                                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                                            <p style="margin: 0;">We are glad you are here!,<br> The Study Sync Team</p>
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
                                                                <p style="margin: 0;">You received this email because we received a request for verification for your account. If you didn't request verification you can safely delete this email.</p>
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
                            reject({ message: err.message, status: 500 });
                        } else {
                            resolve({ message: "Email sent successfully", info });
                        }
                    });
                });
            }

            async function InsertConfirmationCodeToDb(user_id, randomCode) {
                const { error } = await supabase
                    .from("confirmation_code")
                    .insert({
                        "user_id": user_id,
                        "code": randomCode,
                        "status": "active"
                    });

                if (error) {
                    console.error('Error inserting confirmation code:', error);
                } else {
                    console.error('successfully inserted confirmation code');
                }
            }


            async function InsertIntoUserProfileDb(user_id, fullname, country, gender, institution, grade) {
                const { error } = await supabase
                    .from("profile")
                    .insert({
                        "user_id": user_id,
                        "fullname": fullname,
                        "country": country,
                        "gender": gender,
                        "institution": institution,
                        "grade_point": grade
                    });
                if (error) {
                    console.error('Error inserting user profile:', error);
                } else {
                    console.error('successfully inserted user profile');
                }
            }

            return await InsertUserDataIntoDb(signup_data.email, hashedPassword, signup_data.fullname, signup_data.country, signup_data.gender, signup_data.institution, signup_data.gradePoint);
        }
    } else {
        // Return a 403 response if the bearer token does not match
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
}
