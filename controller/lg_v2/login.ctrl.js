

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
            sessionStore.user_id.push(Id)
            sessionStore.user_id = sessionStore.user_id.filter( (item, idx, array) => {
                return array.indexOf( item ) === idx ;
            });
            console.log(sessionStore)
            result.user_info = {
                user_id : Id,
                user_pwd : Pwd
            }
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
