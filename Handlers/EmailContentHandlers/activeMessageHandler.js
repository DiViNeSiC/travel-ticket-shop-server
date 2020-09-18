module.exports = (url, token) => {
    return `
        <h2>Please Active Your Account</h2>
        </br>
        <p>
            Thank you for registering your account on travel ticket shop. 
            </br>
            Please Press the link to active your account then you will be able to use your account
        </p>
        <span>Note:</span>
        <p>
            If you won't be able to click the link below make sure you allow the link access on spam folder
            </br>
            Or enable "Report Not Spam" on this email
        </p>
        </br>
        <a href=${url}/#/account-activation/${token}>Active Your Account!</a>
    `
}