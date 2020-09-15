const nodemailer = require('nodemailer')
const activeMessageHtml = require('./EmailContentHandlers/activeMessageHandler')
const resetPassMessageHtml = require('./EmailContentHandlers/resetPassMessageHandler')

const { ACTIVATION_METHOD, RESET_PASSWORD_METHOD } = require('./MethodHandlers/sendEmailMethodHandler')

module.exports = async (userEmail, token, method) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.AUTH_MANAGER_EMAIL.toString(), 
            pass: process.env.AUTH_MANAGER_PASSWORD.toString(),
        },
    })
    
    const { html, subject } = generateEmailContent(process.env.CLIENT_URL, token, method)
    
    await transporter.sendMail({
        from: `"Travel Shop" <${process.env.AUTH_MANAGER_EMAIL}>`, 
        to: userEmail, 
        subject, 
        html
    })
}

function generateEmailContent(clientUrl, token, method) {
    let html
    let subject
    switch(method) {
        case ACTIVATION_METHOD: {
            html = activeMessageHtml(clientUrl, token)
            subject = "✔ Please Verify Your Account ✔"
            break
        }
        case RESET_PASSWORD_METHOD: {
            html = resetPassMessageHtml(clientUrl, token)
            subject = "✔ Reset Your Account's Password ✔"
            break
        }
    }
    
    return { html, subject }
}