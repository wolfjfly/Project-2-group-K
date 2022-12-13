const sgMail = require('@sendgrid/mail');
const { foundDonation } = require('../email-templates/emailTemplates');

require('dotenv').config({
    path:require('find-config')('.env'),
});

const foundEmail = async (template, toEmail, username) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        const foundTemplate = foundDonation(toEmail, username);

        const foundSentData = await sgMail.send(foundTemplate);

        return foundSentData;
    } catch (error) {
        console.error(error)

        return error;
    }
};

module.exports = foundEmail;