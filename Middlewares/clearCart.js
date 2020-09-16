module.exports = async (req, res, next) => {
    const user = await User.findById(req.payload.id)
    if (user == null) throw 'User Not Found'

    await user.updateOne({ inCart: [] })

    next()
}