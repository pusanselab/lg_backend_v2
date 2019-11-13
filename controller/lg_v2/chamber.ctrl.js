const moment = require('moment')

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


const chamber_testroom_number = (req, res) => {
    const result = {
        testroom_number : []
    }
    const date = new Date();

    db.Header.findAll({
        order: [
            ['conn_file_date', 'DESC']
        ],
        attributes : ["conn_file_date","conn_testroom_number"]
    }).then(header => {
        if (header.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {

            for(var i = 0 ; i < header.length ; i++){
                var data_date = header[i].dataValues.conn_file_date;
                console.log(data_date)
                data_date = data_date.replace(/\./g,'-')
                var between = moment(date).diff(data_date, "month")

                if( between < 6 ){
                    result.testroom_number.push(header[i].conn_testroom_number)
                }
            }

            result.testroom_number = result.testroom_number.filter( (item, idx, array) => {
                return array.indexOf( item ) === idx ;
            });
            
            result.code = 200
            result.message = "success"
            return res.json(result)
        }
    })
}


const chamber_status = (req, res) => {
    const result = {
        month:[
            [],[],[],[],[],[]
        ]
    }
    const date = new Date();

    db.Header.findAll({
        order: [
            ['conn_file_date', 'DESC']
        ],
        // attributes : ["conn_file_date"]
    }).then(header => {
        if (header.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {

            for(var i = 0 ; i < header.length ; i++){
                var data_date = header[i].dataValues.conn_file_date;
                data_date = data_date.replace(/\./g,'-')
                var between = moment(date).diff(data_date, "month")

                if( between < 6 ){
                    result.month[between].push(header[i].dataValues)
                }
            }

            result.code = 200
            result.message = "success"
            return res.json(result)
        }
    })
}


module.exports = {recent_test, chamber_status, chamber_testroom_number}