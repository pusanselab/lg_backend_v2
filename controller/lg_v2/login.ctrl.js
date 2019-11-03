const login = (req, res) => {
    const Id = req.body.user_id;
    const Pwd = req.body.user_pwd;

    // console.log(req.body.userId)
    // console.log(req.body.userPwd)
    console.log(req.body)
    const result = {};
    db.User.findOne({
        where: {
            id: Id
        }
    }).then(user => {
        if (user == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else if (user.pwd === Pwd) {
            result.code = 200
            result.message = "success"
            return res.json(result)
        }
        else {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        }
    })
}

module.exports = { login }
