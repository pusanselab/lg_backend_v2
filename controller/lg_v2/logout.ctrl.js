

const logout = (req, res) => {

    req.session.destroy()
    const result = {
        code:200,
        message:"success"
    }
    return res.json(result)
}

module.exports = { logout }
