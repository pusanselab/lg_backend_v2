

const logout = (req, res) => {

    console.log(req.body)
    const result = {
        code:200,
        message:"success"
    }

    return res.json(result)
}

module.exports = { logout }
