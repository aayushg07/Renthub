// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: 'smtp-mail.outlook.com',
//   port: 587,
//   secure: false, // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER, // Your Outlook email (e.g., sircodo@outlook.com)
//     pass: process.env.EMAIL_PASS, // Your Outlook password or app-specific password
//   },
//   tls: {
//     ciphers: 'SSLv3',
//   },
// });

// export async function sendEmail(to: string, subject: string, text: string, from: string = process.env.EMAIL_USER!) {
//   const mailOptions = {
//     from, // Sender address
//     to,   // Recipient address
//     subject,
//     text,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     return info;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// }

// export default transporter;