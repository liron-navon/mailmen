const nodemailer = require('nodemailer');

// i dont realy care too much for the safety of this random password,
// and yet - please dont do wierd shit with it.
//create your own mail and use your password please.
const user = 'github.lironavon@gmail.com';
const password = 'GDtavd836';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: password
    }
});

module.exports = { sender : transporter, address: user };
