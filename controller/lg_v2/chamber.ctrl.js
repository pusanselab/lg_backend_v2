const moment = require('moment')
const sequelize = require('sequelize');



const recent_test = (req, res) => {
    const result = {
        test_time : []
    }
    let temp_time = 0
    let total_time =""

    db.Header.findAll({
        order: [
            ['lgmv_date', 'DESC']
        ],
        limit: 5
    }).then(async header => {
        if (header.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            for(let i = 0 ; i < header.length ; i++){
                console.log(header[i].header_uid)
                // await db.Raw_0000_0500.findAll({
                //     where: {
                //         header_uid: header[i].header_uid
                //     },
                //     // order:[
                //     //     ['Time', 'ASC']
                //     // ],
                //     attribute: [
                //         [sequelize.fn('Max', sequelize.col('Time')), 'Time'],
                //     ]
                // })

                await db.Raw_0000_0500.max('Time', {
                    where: {
                        header_uid : header[i].header_uid
                    }
                }).then(raws_time => {
                    console.log(header[i].conn_file_time)
                    console.log(raws_time)

                    const start_time = header[i].conn_file_time
                    const end_time = raws_time

                    // console.log(raws_time[raws_time.length-1].Time)
                    // console.log(raws_time[0].Time)
                    // const start_time = raws_time[0].Time
                    // const end_time = raws_time[raws_time.length-1].Time


                    temp_time = moment(end_time,"HH:mm:ss").diff(moment(start_time,"HH:mm:ss"))/1000

                    total_time = String(parseInt(temp_time/3600 )) + "시간 " + String(parseInt((temp_time%3600)/60)) + "분 " + String((temp_time%60)) + "초 "

                    console.log(total_time)

                    result.test_time.push(total_time)
                })

            }
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
    const testroom_number = req.body.testroom_number

    const result = {
        month:[
            [],[],[],[],[],[]
        ]
    }
    const date = new Date();

    db.Header.findAll({
        where:{
            conn_testroom_number : testroom_number
        },
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