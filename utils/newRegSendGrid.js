const sgMail = require('@sendgrid/mail');
const { newRegistration } = require('../email-templates/emailTemplates');

require('dotenv').config({
    path: require('find-config')('.env'),
});

const sendEmail = async (toEmail, username) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        const emailTemplate = newRegistration(toEmail, username);

        const msgSentData = await sgMail.send(emailTemplate);

        return msgSentData;
    } catch (error) {
        console.error(error);

        return error;
    }
};

module.exports = sendEmail;
