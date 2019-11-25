

const logout = (req, res) => {
    sessionStore.user_id = ''
    console.log(sessionStore)
    const result = {
        code:200,
        message:"success"
    }
    return res.json(result)
}

module.exports = { logout }
