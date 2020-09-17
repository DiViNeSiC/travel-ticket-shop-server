module.exports = (req, callback) => {
    const whitelist = [process.env.CLIENT_URL]
    let corsOptions
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)    
}