const moment = require('moment')

const data_search_id = (req, res) => {
    const uid = req.body.header_uid;
    const result = {}
    db.Header.findByPk(uid).then(header => {
        if (header) {
            result.message = "success"
            result.content = header
            return res.json(result)
        } else
            result.message = "fail"
        result.content = header
        return res.json(result)
    })
}


const data_search = (req, res) => {

    let date_from = req.body.lg_search_date_box_from
    let date_to = req.body.lg_search_date_box_to
    const lgmv_serial_number = req.body.lgmv_serial_number
    const header_uid = req.body.header_uid
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
    const test_step1 = req.body.test_step1
    const test_step2 = req.body.test_step2
    const conn_tester = req.body.conn_tester
    const conn_testroom_number = req.body.conn_testroom_number
    const conn_pipe_type = req.body.conn_pipe_type
    const conn_test_result = req.body.conn_test_result
    const conn_memo = req.body.conn_memo
    const conn_operation_rate = req.body.conn_operation_rate


    console.log(req.body)
    console.log(date_to)
    console.log(date_from)
    const result = {}
    let query = {}

    function execption_checker(input) {
        if (input == "" || input == undefined || input == null) {
            return false
        } else {
            return true
        }
    }

    if (moment(date_to, "YYYY-MM-DD").diff(moment(date_from, "YYYY-MM-DD")) > 0) {
        query = {
            conn_file_date: {
                between: []
            }
        }
        if (execption_checker(date_from)) {
            date_from = date_from.replace(/-/g, '.')
            query.conn_file_date.between.push(date_from)
        }
        if (execption_checker(date_to)) {
            date_to = date_to.replace(/-/g, '.')
            query.conn_file_date.between.push(date_to)
        }
    }

    if (execption_checker(header_uid)) {
        query.header_uid = header_uid
    }
    if (execption_checker(lgmv_serial_number)) {
        query.lgmv_serial_number = lgmv_serial_number
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
    if (execption_checker(plm_step1) && plm_step1 !== '- 선택 -') {
        query.plm_step1 = plm_step1
    }
    if (execption_checker(plm_step2) && plm_step2 !== '- 선택 -') {
        query.plm_step2 = plm_step2
    }
    if (execption_checker(test_step1) && test_step1 !== '- 선택 -') {
        query.test_step1 = test_step1
    }
    if (execption_checker(test_step2) && test_step2 !== '- 선택 -') {
        query.test_step2 = test_step2
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
    console.log(query)
    db.Header.findAll({
        where: query
    }).then(header => {
        if (header.length == 0) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log('에헤라디야')
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
        summary: {},
        content: {
            raw_data: {}
        }
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
    db.Header.findOne({
        where: {
            header_uid: header_uid,
            lgmv_serial_number: lgmv_serial_number,
            calorimeter_id_wb: calorimeter_id_wb,
            calorimeter_id_db: calorimeter_id_db,
            calorimeter_od_wb: calorimeter_od_wb,
            calorimeter_od_db: calorimeter_od_db,
            conn_operation_rate: conn_operation_rate,
            conn_testroom_number: conn_testroom_number,
            test_step2: test_step2
        },
        order: [['conn_file_date', 'ASC']]
    }).then(async header => {
        if (header.length == 0) {
            result.code = 400
            result.message = "failure"
        } else {
            result.code = 200
            result.message = "success"

            const eer_result_params = header.dataValues.eer_result_params.split(",")
            const eer_item_num = header.dataValues.eer_item_num
            console.log(eer_result_params)
            const attr = ['header_uid', eer_item_num]
            if (Number(eer_item_num.slice(5)) <= 500) {
                db.Raw_0000_0500.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 1000) {
                db.Raw_0501_1000.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 1500) {

                db.Raw_1001_1500.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 2000) {

                db.Raw_1501_2000.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 2500) {

                db.Raw_2001_2500.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 3000) {

                db.Raw_2501_3000.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 3500) {

                db.Raw_3001_3500.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 4000) {

                db.Raw_3501_4000.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 4500) {

                db.Raw_4001_4500.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }

                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }
            else if (Number(eer_item_num.slice(5)) <= 5000) {

                db.Raw_4501_5000.findAll({
                    where: {
                        header_uid: header.dataValues.header_uid
                    },
                    attributes: attr,
                    raw: true
                }).then(async raws => {
                    var flag = 0
                    var comp = 0
                    var EER_Arr = []
                    for (var i = 0; i < raws.length; i++) {
                        var t_temp = raws[i][eer_item_num]
                        EER_Arr.push(Number(t_temp))

                        if (EER_Arr[i] > comp) {
                            comp = EER_Arr[i]
                            flag = i
                        }
                        if (i === raws.length - 1) {
                            result.content.raw_data = raws[flag]
                            for (var j = 0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if (number <= 500) {
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                } else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: header.dataValues.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: header.dataValues.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if (j === eer_result_params.length - 1) {
                                    console.log("redundancy check finish")
                                    console.log(result)
                                    return res.json(result)
                                }
                            }
                        }
                    }
                })
            }

        }
    })

}


module.exports = {data_search_id, data_search, data_search_detail}