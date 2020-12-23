const nodemailer = require('nodemailer')
const activeMessageHtml = require('./EmailContentHandlers/activeMessageHandler')
const resetPassMessageHtml = require('./EmailContentHandlers/resetPassMessageHandler')
const { ACTIVATION_METHOD, RESET_PASSWORD_METHOD } = require('./MethodHandlers/sendEmailMethodHandler')

module.exports = async (userEmail, token, method) => {
    const { 
        CLIENT_URL: clientUrl,
        AUTH_MANAGER_EMAIL: user, 
        AUTH_MANAGER_PASSWORD: pass, 
    } = process.env

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, secure: false,
        auth: { user, pass }
    })
    
    const { html, subject } = generateEmailContent(clientUrl, token, method)
    await transporter.sendMail({ from: `"Travel Shop" <${user}>`, to: userEmail, subject, html })
}

function generateEmailContent(clientUrl, token, method) {
    switch(method) {
        case ACTIVATION_METHOD: return {
            html: activeMessageHtml(clientUrl, token),
            subject: "✔ Please Verify Your Account ✔"
        }
        case RESET_PASSWORD_METHOD: return {
            html: resetPassMessageHtml(clientUrl, token),
            subject: "✔ Reset Your Account's Password ✔"
        }
        default: return { html: null, subject: null }
    }
}