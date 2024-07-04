const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishwajeetroundhal0@gmail.com',
    pass: 'nyvi lpup khbm jypi'
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'vishwajeetroundhal0@gmail.com',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {  };