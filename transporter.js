const nodemailer = require('nodemailer');

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