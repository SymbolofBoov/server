const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, // must be App Password
            }
        });

        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,  // better to use your Gmail here
            to: email,
            subject: title,
            html: body,
        });

        console.log("✅ Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.log("❌ Error while sending email:", error);
        return { error: error.message };
    }
};

module.exports = mailSender;
