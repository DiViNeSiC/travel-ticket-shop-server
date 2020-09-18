module.exports = (url, token) => {
    return `
        <h2>Reset Password Of Your Account</h2>
        </br>
        <p>
            Be careful !
            We sent you this email to reset your account's password
            </br>
            If you don't request this link please DO NOT send this link to anyone and reset your email account password (Just in case)
        </p>
        <span>Note:</span>
        <p>
            If you won't be able to click the link below make sure you allow the link access on spam folder
            </br>
            Or enable "Report Not Spam" on this email
        </p>
        </br>
        <a href=${url}/#/reset-password/${token}>Reset Password!</a>
    `
}