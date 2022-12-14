require('dotenv').config({
    path: require('find-config')('.env')
});


    function newRegistration(toEmail, username) {
        return {
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: `Welcome ${username}, to the Village!!`,
            text: 'Thank you for Registering!',
            html: `<h1>Thanks for registering an account with <strong>It Takes a Village!</strong></h1>
            <br>
            <h2>You're already making a difference! See how you can contribute to those in your community or submit a request for a good or service!</h2>
            <br>
            <strong>Sincerely,</strong>
            <br>
            <strong>Your fellow villagers 👨‍👩‍👧‍👦🏕️</strong>`
        }
    }

    function foundDonation(toEmail, username, title, description) {
        console.log(toEmail, username, title, description)
        return {
            from: process.env.FROM_EMAIL,
            to:process.env.TO_EMAIL,
            subject: `Good News, ${username} - someone in the village has ${title} for you!`,
            text: `Directions to claim ${title}`,
            html: `<h1>Please be patient!</h1>
            <br>
            <p>Give us 24 hours from the time of this notification to process your request. After that you can stop at the Community Center on 123 Drury Lane NW, Cape Coral, FL 33914 to pick up ${description}</p>
            <br>
            <h3>Remember, It Takes a Village😉</h3>`
        }
    

    // future development
    // itemClaimed: function(toEmail, username) {
    //     return {
    //         from: process.env.FROM_EMAIL,
    //         to: toEmail,
    //         subject: `URGENT! ${username}, somebody is in need of an item you offered to the community. Please deliver ${Request.title} to the community station.`,
    //         text: 'Your item has been claimed by a community member in need!',
    //         html: ``
    //     }
    // }    

};

module.exports = { foundDonation, newRegistration }