const create_user = (req, res) => {
    console.log(req.body)
    const result = {}
    db.User.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        if (!user) {
            db.User.create(req.body).then(user => {
                return res.json(user).end()
            })
        }
        if (user) {
            result.status = 400
            result.message = "id 중복"
            return res.json(result).end()
        }
    })

}

const delete_header_data = (req, res) => {
    const body = req.body
    const type = body.type

    if (type === 'date') {
        const first_date = body.first_date
        const end_date = body.end_date
        console.log(type)
        db.Header.findAll().then(headers => {
            for (var i = 0; i < headers.length; i++) {
                var header_date = headers[i].lgmv_date.substring(0, 10)
                if (first_date < header_date) {
                    if (header_date < end_date) {
                        db.Header.destroy({
                            where: {
                                header_uid: headers[i].header_uid
                            }
                        }).then(resu => {
                            return res.json(resu).end()
                        })
                    }
                }
            }
        })
    }

    if (type === 'id') {
        const id = body.id
        console.log(type)
        db.Header.destroy({
            where: {
                header_uid: id
            }
        }).then(resu => {
            return res.json(resu).end()
        })
    }
}

module.exports = {create_user, delete_header_data}