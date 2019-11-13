const sequelize = require('sequelize');


const red_check = (req, res) => {

    const lgmv_serial_number = req.query.lgmv_serial_number;
    const calorimeter_id_wb = req.query.calorimeter_id_wb;
    const calorimeter_id_db = req.query.calorimeter_id_db;
    const calorimeter_od_wb = req.query.calorimeter_od_wb;
    const calorimeter_od_db = req.query.calorimeter_od_db;
    const conn_operation_rate = req.query.conn_operation_rate;
    const conn_testroom_number = req.query.conn_testroom_number;
    const test_step2 = req.query.test_step2;


    const result = {}
    result.content = {
        header_uid: [],
        raw_data: {}
    }
    db.Header.findAll({
        where: {
            lgmv_serial_number: lgmv_serial_number,
            calorimeter_id_wb: calorimeter_id_wb,
            calorimeter_id_db: calorimeter_id_db,
            calorimeter_od_wb: calorimeter_od_wb,
            calorimeter_od_db: calorimeter_od_db,
            conn_operation_rate: conn_operation_rate,
            conn_testroom_number: conn_testroom_number,
            test_step2: test_step2
        }
    }).then( async header => {
        if (header.length == 0) {
            result.code = 400
            result.message = "failure"
        } else {
            result.code = 200
            result.message = "success"
            for (let i = 0; i < header.length; i++) {
                result.content.header_uid.push(header.header_uid)
            }

            const recent_header = header[header.length-1]
            const eer_result_params = recent_header.eer_result_params.split(",")
            const eer_item_num = recent_header.eer_item_num

            console.log(eer_item_num)
            // const temp = [
            //     'Time',
            //     [sequelize.fn('MAX', sequelize.col(eer_item_num)), 'EER']
            // ]
            // for(let j = 0 ; j < eer_result_params.length ; j++){
            //     console.log(eer_result_params[j])
            //     temp.push(eer_result_params[j])
            // }

            db.Raw_0000_0500.findAll({
                where:{
                    header_uid : recent_header.header_uid
                },
                attributes:[
                    [eer_item_num]
                ],
                order: [
                    [eer_item_num , 'DESC']
                ],
                limit : 1
            }).then(raw_0000_0500 =>{
                return res.json(raw_0000_0500)
                console.log(raw_0000_0500.dataValues)
            })
        }
    })
}

module.exports = { red_check }
