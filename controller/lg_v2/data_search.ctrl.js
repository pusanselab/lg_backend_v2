const data_search_id = (req, res) => {
    const uid = req.body.header_uid;
    const result = {}
    db.Header.findByPk(uid).then(header => {
        if (header) {
            result.message = "success"
            result.content = header
            return res.json(result)
        }
        else
            result.message = "fail"
            result.content = header
            return res.json(result)
    })
}


const data_search = (req, res) => {
    const lgmv_model_filter1 = req.body.lgmv_model_filter1
    const lgmv_model_filter2 = req.body.lgmv_model_filter2
    const lgmv_model_name = req.body.lgmv_model_name
    const lgmv_r = req.body.lgmv_r
    const lgmv_main_ver = req.body.lgmv_main_ver
    const lgmv_eep_ver = req.body.lgmv_eep_ver
    const calorimeter_cap = req.body.calorimeter_cap
    const calorimeter_power = req.body.calorimeter_power
    const calorimeter_eer = req.body.calorimeter_eer
    const calorimeter_power_vol = req.body.calorimeter_power_vol
    const calorimeter_id_wb = req.body.calorimeter_id_wb
    const calorimeter_id_db = req.body.calorimeter_id_db
    const calorimeter_od_wb = req.body.calorimeter_od_wb
    const calorimeter_od_db = req.body.calorimeter_od_db
    const conn_file_date = req.body.conn_file_date
    const idu_chassis = req.body.idu_chassis
    const odu_chassis = req.body.odu_chassis
    const plm_step1 = req.body.plm_step1
    const plm_step2 = req.body.plm_step2
    const conn_tester = req.body.conn_tester
    const conn_testroom_number = req.body.conn_testroom_number
    const conn_pipe_type = req.body.conn_pipe_type
    const conn_test_result = req.body.conn_test_result
    const conn_memo = req.body.conn_memo
    const conn_operation_rate = req.body.conn_operation_rate

    const result = {}
    const query = {}

    function execption_checker(input) {
        if (input == "" || input == undefined) {
            return false
        }
        else {
            return true
        }
    }

    if (execption_checker(lgmv_model_filter1)) {
        query.lgmv_model_filter1 = lgmv_model_filter1
    }
    if (execption_checker(lgmv_model_filter2)) {
        query.lgmv_model_filter2 = lgmv_model_filter2
    }
    if (execption_checker(lgmv_model_name)) {
        query.lgmv_model_name = lgmv_model_name
    }
    if (execption_checker(lgmv_r)) {
        query.lgmv_r = lgmv_r
    }
    if (execption_checker(lgmv_main_ver)) {
        query.lgmv_main_ver = lgmv_main_ver
    }
    if (execption_checker(lgmv_eep_ver)) {
        query.lgmv_eep_ver = lgmv_eep_ver
    }
    if (execption_checker(calorimeter_cap)) {
        query.calorimeter_cap = calorimeter_cap
    }
    if (execption_checker(calorimeter_power)) {
        query.calorimeter_power = calorimeter_power
    }
    if (execption_checker(calorimeter_eer)) {
        query.calorimeter_eer = calorimeter_eer
    }
    if (execption_checker(calorimeter_power_vol)) {
        query.calorimeter_power_vol = calorimeter_power_vol
    }
    if (execption_checker(calorimeter_id_wb)) {
        query.calorimeter_id_wb = calorimeter_id_wb
    }
    if (execption_checker(calorimeter_id_db)) {
        query.calorimeter_id_db = calorimeter_id_db
    }
    if (execption_checker(calorimeter_od_wb)) {
        query.calorimeter_od_wb = calorimeter_od_wb
    }
    if (execption_checker(calorimeter_od_db)) {
        query.calorimeter_od_db = calorimeter_od_db
    }
    if (execption_checker(conn_file_date)) {
        query.conn_file_date = conn_file_date
    }
    if (execption_checker(idu_chassis)) {
        query.idu_chassis = idu_chassis
    }
    if (execption_checker(odu_chassis)) {
        query.odu_chassis = odu_chassis
    }
    if (execption_checker(plm_step1)) {
        query.plm_step1 = plm_step1
    }
    if (execption_checker(plm_step2)) {
        query.plm_step2 = plm_step2
    }
    if (execption_checker(conn_tester)) {
        query.conn_tester = conn_tester
    }
    if (execption_checker(conn_testroom_number)) {
        query.conn_testroom_number = conn_testroom_number
    }
    if (execption_checker(conn_pipe_type)) {
        query.conn_pipe_type = conn_pipe_type
    }
    if (execption_checker(conn_test_result)) {
        query.conn_test_result = conn_test_result
    }
    if (execption_checker(conn_memo)) {
        query.conn_memo = conn_memo
    }
    if (execption_checker(conn_operation_rate)) {
        query.conn_operation_rate = conn_operation_rate
    }

    db.Header.findAll({
        where: query
    }).then(header => {
        if (header.length == 0) {
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


const data_search_detail = (req, res) => {
    const lgmv_serial_number = req.body.lgmv_serial_number;
    const calorimeter_id_wb = req.body.calorimeter_id_wb;
    const calorimeter_id_db = req.body.calorimeter_id_db;
    const calorimeter_od_wb = req.body.calorimeter_od_wb;
    const calorimeter_od_db = req.body.calorimeter_od_db;
    const conn_operation_rate = req.body.conn_operation_rate;
    const conn_testroom_number = req.body.conn_testroom_number;
    const test_step2 = req.body.test_step2;

    const header_uid = req.body.header_uid;

    const result = {
        summary : {},
        similar_test : {}
    };

    // 냉방 성능 확인  -> LG 에서 max 값이 여러개일 때 어떻게 할 것인지 알려주면 추후 작업 할 것임.
    // db.Header.findByPk(header_uid).then(header => {
    //     if (header.test_step2 === '냉방 성능') {
    //         eer_item_num = header.eer_item_num
    //         item_num = eer_item_num.slice(5)
    //         if(parseInt(item_num) <= 1000) {
    //             db.Raw_1.findOne({
    //                 where: {
    //
    //                 }
    //             })
    //         }
    //         else if(parseInt(item_num) <= 2000) {
    //
    //         }else if(parseInt(item_num) <= 3000) {
    //
    //         }else if(parseInt(item_num) <= 4000) {
    //
    //         }
    //     }
    // })


    //유사 시험 검사
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
    }).then(header => {
        if (header.length == 0) {
            result.similar_test.code = 400
            result.similar_test.message = "failure"
            return res.json(result)
        } else {
            result.similar_test.code = 200
            result.similar_test.message = "success"
            result.similar_test.header = header
            return res.json(result)
        }
    })
}

module.exports = {data_search_id, data_search, data_search_detail}