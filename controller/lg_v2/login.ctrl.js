

const login = (req, res) => {
    const Id = req.body.user_id;
    const Pwd = req.body.user_pwd;

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
            req.session.user = {
                id: user.id,
                pw: user.pwd,
                name: 'Testing',
                authorized: true,
                cookie: {
                    maxAge: 1000 * 10 // 쿠키 유효기간
                }
            };
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
