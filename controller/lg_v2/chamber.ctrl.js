const recent_test = (req, res) => {
    const result = {}

    db.Header.findAll({
        order: [
            ['lgmv_date', 'DESC']
        ],
        limit: 5
    }).then(header => {
        if (header.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            result.content = header
            result.code = 200
            result.message = "success"
            return res.json(result)
        }
    })
}


const chamber_status = (req, res) => {
    const result = {}
    // const date = new Date();
    //
    // console.log(date)
    db.Header.findAll({
        order: [
            ['lgmv_date', 'DESC']
        ],
        // limit: 5
    }).then(header => {
        if (header.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(header)
            result.content = header
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}


module.exports = {recent_test, chamber_status}