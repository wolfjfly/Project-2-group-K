const sgMail = require('@sendgrid/mail');
const { foundDonation, newRegistration } = require('../email-templates/emailTemplates');

require('dotenv').config({
    path:require('find-config')('.env'),
});

const foundEmail = async (toEmail, username) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        const foundTemplate = newRegistration(toEmail, username);

        const foundSentData = await sgMail.send(foundTemplate);

        return foundSentData;
    } catch (error) {
        console.error(error)

        return error;
    }
};
const claimRequest = async (toEmail, username, title, description) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        const foundTemplate = foundDonation(toEmail, username, title, description);

        const foundSentData = await sgMail.send(foundTemplate);

        return foundSentData;
    } catch (error) {
        console.error(error)

        return error;
    }
};

module.exports = {foundEmail,claimRequest};