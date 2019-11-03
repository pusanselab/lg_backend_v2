const sequelize = require('sequelize');

const test = (req, res) => {
    // db.User.findAll().then(result => {
    //     return res.json(result).end()
    // }).catch(err => {
    //     return ErrForm(res, err)
    // })
    const result = {}

    db.Header.findAll({}).then(header => {
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

const redundancy_check = (req, res) => {

    const lgmv_serial_number = req.query.lgmv_serial_number;
    const calorimeter_id_wb = req.query.calorimeter_id_wb;
    const calorimeter_id_db = req.query.calorimeter_id_db;
    const calorimeter_od_wb = req.query.calorimeter_od_wb;
    const calorimeter_od_db = req.query.calorimeter_od_db;
    const conn_operation_rate = req.query.conn_operation_rate;
    const conn_testroom_number = req.query.conn_testroom_number;
    const test_step2 = req.query.test_step2;


    const result = {}
    result.content = {}
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
        // include:[
        //     {
        //         model : db.Calorimeter,
        //         attributes: [
        //             'TXT_TIME',
        //             [sequelize.fn('MAX',sequelize.col('EER')), 'EER']
        //         ],
        //         include:[
        //             {
        //                 model : db.Odu,
        //                 attributes: [
        //                     "TXT_INV1_TARGETTING_N_TRACE", "TXT_INV2_TARGETTING_N_TRACE",
        //                     "TXT_FAN1_TRACE","TXT_FAN2_TRACE", "TXT_MAIN_EEV", "TXT_SUB_EEV"
        //                 ]
        //             },
        //             {
        //                 model : db.Idu,
        //                 attributes: ["TXT_IDU_WIND"]
        //             }
        //         ]
        //     }
        // ],
    }).then(async header => {
        if (header.length == 0) {
            result.code = 400
            result.message = "failure"
        } else {
            // console.log(header)

            result.code = 200
            result.message = "success"
            re_arr = []
            for (let i = 0; i < header.length; i++) {
                re_obj = {}
                re_obj.odu = {}
                re_obj.idu = {}

                var header_uid = header[i].dataValues.header_uid
                // console.log(i, "번째 데이터", header[i].dataValues)
                re_obj.header = header[i]

                await db.Calorimeter.findOne({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [
                        'TXT_TIME',
                        [sequelize.fn('MAX', sequelize.col('EER')), 'EER']
                    ],
                }).then(calorimeter => {
                    re_obj.calorimeter = calorimeter
                    // result.content[i].header = header[i]
                    // result.content[i].raw.EER = EER

                    db.Odu.findOne({
                        where: {
                            header_uid: header_uid,
                            TXT_TIME: calorimeter.dataValues.TXT_TIME
                        },
                        attributes: ["TXT_INV1_TARGETTING_N_TRACE", "TXT_INV2_TARGETTING_N_TRACE", "TXT_FAN1_TRACE", "TXT_FAN2_TRACE", "TXT_MAIN_EEV", "TXT_SUB_EEV"]
                    }).then(odu => {
                        const compressor_1 = odu.TXT_INV1_TARGETTING_N_TRACE
                        const compressor_2 = odu.TXT_INV2_TARGETTING_N_TRACE
                        const odu_fan_rpm1 = odu.TXT_FAN1_TRACE
                        const odu_fan_rpm2 = odu.TXT_FAN2_TRACE
                        const main_eev = odu.TXT_MAIN_EEV
                        const sub_eev = odu.TXT_SUB_EEV

                        re_obj.odu.compressor_1 = compressor_1
                        re_obj.odu.compressor_2 = compressor_2
                        re_obj.odu.odu_fan_rpm1 = odu_fan_rpm1
                        re_obj.odu.odu_fan_rpm2 = odu_fan_rpm2
                        re_obj.odu.main_eev = main_eev
                        re_obj.odu.sub_eev = sub_eev
                    })
                    db.Idu.findOne({
                        where: {
                            header_uid: header_uid,
                            TXT_TIME: calorimeter.dataValues.TXT_TIME
                        },
                        attributes: ["TXT_IDU_WIND"]
                    }).then(idu => {
                        const idu1_fan_rpm = idu.TXT_IDU_WIND

                        re_obj.idu.idu1_fan_rpm = idu1_fan_rpm
                        re_arr.push(re_obj)
                        if (i === header.length - 1) {
                            result.content = re_arr
                            return res.json(result)
                        }
                    })
                })
            }
        }
    })
}

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

const overview = (req, res) => {
    const result = {
        content: {
            model: [
                {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ],
            test: [
                {}, {}, {}, {}, {}, {}
            ]
        }
    };

    db.Header.findOne({
        where: {
            lgmv_model_filter1: 'Multi V H/P'
        },
        attributes: [
            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
        ],
    }).then(counter => {
        console.log(counter.dataValues)
        result.content.model[0] = counter.dataValues
        result.content.model[0].name = 'Multi V H/P'

        db.Header.findOne({
            where: {
                lgmv_model_filter1: 'Multi V H/R'
            },
            attributes: [
                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
            ],
        }).then(counter => {
            result.content.model[1] = counter.dataValues
            result.content.model[1].name = 'Multi V H/R'

            db.Header.findOne({
                where: {
                    lgmv_model_filter1: 'Multi V ARUM'
                },
                attributes: [
                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                ],
            }).then(counter => {
                result.content.model[2] = counter.dataValues
                result.content.model[2].name = 'Multi V ARUM'

                db.Header.findOne({
                    where: {
                        lgmv_model_filter1: 'Multi Water'
                    },
                    attributes: [
                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                    ],
                }).then(counter => {
                    result.content.model[3] = counter.dataValues
                    result.content.model[3].name = 'Multi Water'

                    db.Header.findOne({
                        where: {
                            lgmv_model_filter1: 'Multi V S'
                        },
                        attributes: [
                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                        ],
                    }).then(counter => {
                        result.content.model[4] = counter.dataValues
                        result.content.model[4].name = 'Multi V S'

                        db.Header.findOne({
                            where: {
                                lgmv_model_filter1: 'Multi V M'
                            },
                            attributes: [
                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                            ],
                        }).then(counter => {
                            result.content.model[5] = counter.dataValues
                            result.content.model[5].name = 'Multi V M'

                            db.Header.findOne({
                                where: {
                                    lgmv_model_filter1: 'Multi V Space'
                                },
                                attributes: [
                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                ],
                            }).then(counter => {
                                result.content.model[6] = counter.dataValues
                                result.content.model[6].name = 'Multi V Space'

                                db.Header.findOne({
                                    where: {
                                        lgmv_model_filter1: 'GHP'
                                    },
                                    attributes: [
                                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                    ],
                                }).then(counter => {
                                    result.content.model[7] = counter.dataValues
                                    result.content.model[7].name = 'GHP'

                                    db.Header.findOne({
                                        where: {
                                            lgmv_model_filter1: 'Chiller'
                                        },
                                        attributes: [
                                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                        ],
                                    }).then(counter => {
                                        result.content.model[8] = counter.dataValues
                                        result.content.model[8].name = 'Chiller'

                                        db.Header.findOne({
                                            where: {
                                                lgmv_model_filter1: 'Therma V'
                                            },
                                            attributes: [
                                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                            ],
                                        }).then(counter => {
                                            result.content.model[9] = counter.dataValues
                                            result.content.model[9].name = 'Therma V'

                                            db.Header.findOne({
                                                where: {
                                                    lgmv_model_filter1: 'Single Package'
                                                },
                                                attributes: [
                                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                ],
                                            }).then(counter => {
                                                result.content.model[10] = counter.dataValues
                                                result.content.model[10].name = 'Single Package'

                                                db.Header.findOne({
                                                    where: {
                                                        lgmv_model_filter1: 'Single&Multi'
                                                    },
                                                    attributes: [
                                                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                    ],
                                                }).then(counter => {
                                                    result.content.model[11] = counter.dataValues
                                                    result.content.model[11].name = 'Single&Multi'

                                                    db.Header.findOne({
                                                        where: {
                                                            lgmv_model_filter1: 'Refrigeration'
                                                        },
                                                        attributes: [
                                                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                        ],
                                                    }).then(counter => {
                                                        result.content.model[12] = counter.dataValues
                                                        result.content.model[12].name = 'Refrigeration'

                                                        db.Header.findOne({
                                                            where: {
                                                                test_step1: '성능'
                                                            },
                                                            attributes: [
                                                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                            ],
                                                        }).then(counter => {
                                                            result.content.test[0] = counter.dataValues
                                                            result.content.test[0].name = '성능'

                                                            db.Header.findOne({
                                                                where: {
                                                                    test_step1: '냉방성능'
                                                                },
                                                                attributes: [
                                                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                ],
                                                            }).then(counter => {
                                                                result.content.test[1] = counter.dataValues
                                                                result.content.test[1].name = '냉방성능'

                                                                db.Header.findOne({
                                                                    where: {
                                                                        test_step1: '난방성능'
                                                                    },
                                                                    attributes: [
                                                                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                    ],
                                                                }).then(counter => {
                                                                    result.content.test[2] = counter.dataValues
                                                                    result.content.test[2].name = '난방성능'

                                                                    db.Header.findOne({
                                                                        where: {
                                                                            test_step1: '안정성'
                                                                        },
                                                                        attributes: [
                                                                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                        ],
                                                                    }).then(counter => {
                                                                        result.content.test[3] = counter.dataValues
                                                                        result.content.test[3].name = '안정성'

                                                                        db.Header.findOne({
                                                                            where: {
                                                                                test_step1: '신뢰성'
                                                                            },
                                                                            attributes: [
                                                                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                            ],
                                                                        }).then(counter => {
                                                                            result.content.test[4] = counter.dataValues
                                                                            result.content.test[4].name = '신뢰성'

                                                                            db.Header.findOne({
                                                                                where: {
                                                                                    test_step1: '기타'
                                                                                },
                                                                                attributes: [
                                                                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                                ],
                                                                            }).then(counter => {
                                                                                result.content.test[5] = counter.dataValues
                                                                                result.content.test[5].name = '기타'

                                                                                db.Odu.findOne({
                                                                                    attributes: [
                                                                                        [sequelize.fn('count', sequelize.col('odu_uid')), 'count']
                                                                                    ]
                                                                                }).then(counter => {
                                                                                    result.content.db_usage = (counter.dataValues.count / 1000000000).toFixed(10)
                                                                                    console.log(result.content.db_usage)

                                                                                    return res.json(result)

                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

const chamber_status = (req, res) => {
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
            console.log(header)
            result.content = header
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })


}

const data_search_id = (req, res) => {
    const uid = req.body.header_uid;

    const result = {};

    db.Header.findOne({
        where: {
            header_uid: uid
        }
    }).then(header => {
        db.Calorimeter.findOne({
            where: {
                header_uid: uid
            },
            attributes: [
                [sequelize.fn('count', sequelize.col('calorimeter_uid')), 'count']
            ],
        }).then(Calorimeter => {
            if (header == null) {
                result.code = 400
                result.message = "failure"
                return res.json(result)
            } else {
                console.log(Calorimeter)
                console.log(header.dataValues)
                result.content = header.dataValues
                result.count = Calorimeter.dataValues.count
                result.code = 200
                result.message = "success"
                return res.json(result)
            }
        })
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

    console.log("쿼리다", query)

    db.Header.findAll({
        where: query
    }).then(header => {
        if (header.length == 0) {
            console.log("왜 일로들오노?")
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
        content: {
            cooling_performance: {},
            header: {}
        },
        header: {},
        cooling_performance: {}
    };

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
        console.log("header 값 : ", header)
        if (header.length == 0) {
            result.header.code = 400
            result.header.message = "failure"
        } else {
            result.content.header = header
            result.header.code = 200
            result.header.message = "success"
        }
    }).then(db.Calolimeter.findAll({
        where: {
            header_uid: header_uid
        },
        order: [
            ['EER', 'DESC']
        ]
        //attributes: [sequelize.fn('MAX', 'EER'), 'EER']
    }).then(calorimeter => {
        if (calorimeter.length == 0) {
            result.cooling_performance.code = 400
            result.cooling_performance.message = "failure"
            return res.json(result)
        } else {
            const index = calorimeter[0].dataValues.TXT_TIME;
            const EER = calorimeter[0].dataValues.EER

            result.content.cooling_performance.EER = EER

            db.Odu.findOne({
                where: {
                    header_uid: header_uid,
                    // TXT_TIME : index
                },
                attributes: ["TXT_INV1_TARGETTING_N_TRACE", "TXT_INV2_TARGETTING_N_TRACE", "TXT_FAN1_TRACE", "TXT_FAN2_TRACE", "TXT_MAIN_EEV", "TXT_SUB_EEV"]
            }).then(odu => {
                const compressor_1 = odu.TXT_INV1_TARGETTING_N_TRACE
                const compressor_2 = odu.TXT_INV2_TARGETTING_N_TRACE
                const odu_fan_rpm1 = odu.TXT_FAN1_TRACE
                const odu_fan_rpm2 = odu.TXT_FAN2_TRACE
                const main_eev = odu.TXT_MAIN_EEV
                const sub_eev = odu.TXT_SUB_EEV

                result.content.cooling_performance.compressor_1 = compressor_1
                result.content.cooling_performance.compressor_2 = compressor_2
                result.content.cooling_performance.odu_fan_rpm1 = odu_fan_rpm1
                result.content.cooling_performance.odu_fan_rpm2 = odu_fan_rpm2
                result.content.cooling_performance.main_eev = main_eev
                result.content.cooling_performance.sub_eev = sub_eev

                db.Idu.findOne({
                    where: {
                        header_uid: header_uid,
                        TXT_TIME: index
                    },
                    attributes: ["TXT_IDU_WIND"]
                }).then(idu => {
                    const idu1_fan_rpm = idu.TXT_IDU_WIND

                    result.content.cooling_performance.idu1_fan_rpm = idu1_fan_rpm
                    result.cooling_performance.code = 200
                    result.cooling_performance.message = "success"
                    return res.json(result)

                })
            })
        }
    }))
}

const graph_odu = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Odu.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_idu = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {
        content: {
            model: []
        }
    }

    db.Idu.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content.model = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_hru = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Hru.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_calolimeter = (req, res) => {
    const header_uid = req.body.header_uid
    const column_name = req.body.column_name

    const result = {}

    db.Calolimeter.findAll({
        where: {
            header_uid: header_uid,
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_sidu_awhp = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Sidu_awhp.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_sidu_casecade = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Sidu_cascade.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_sidu_dxc = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Sidu_dxc.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_sidu_fau = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Sidu_fau.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_sidu_showcase = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Sidu_showcase.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}

const graph_sidu_whu = (req, res) => {
    const header_uid = req.body.header_uid
    const section_count = req.body.section_count
    const column_name = req.body.column_name

    const result = {}

    db.Sidu_whu.findAll({
        where: {
            header_uid: header_uid,
            section_count: section_count
        },
        attributes: [[column_name, "value"], "TXT_TIME"]
    }).then(send_data => {
        if (send_data.length == null) {
            result.code = 400
            result.message = "failure"
            return res.json(result)
        } else {
            console.log(send_data)
            result.content = send_data
            result.code = 200
            result.message = "success"
            console.log(result)
            return res.json(result)
        }
    })
}
const make_csv = (req, res) => {
    const header_uid = req.query.header_uid

    db.Header.findOne({
        where: {
            header_uid: header_uid
        },
        include: [
            {
                model: db.Calorimeter,
            },
            // {
            //     model: db.Hru
            // },
            // {
            //     model: db.Idu
            // },
            // {
            //     model: db.Odu
            // },
            // {
            //     model: db.Sidu_awhp
            // },
            // {
            //     model: db.Sidu_cascade
            // },
            // {
            //     model: db.Sidu_dxc
            // },
            // {
            //     model: db.Sidu_fau
            // },
            // {
            //     model: db.Sidu_showcase
            // },
            // {
            //     model: db.Sidu_whu
            // }
        ]
    }).then(header =>  {
        return res.json(header)
    })
}


module.exports = {
    test, redundancy_check, login, overview, chamber_status, data_search, data_search_id, data_search_detail,
    graph_odu, graph_idu, graph_hru, graph_calolimeter, graph_sidu_awhp, graph_sidu_casecade,
    graph_sidu_dxc, graph_sidu_fau, graph_sidu_showcase, graph_sidu_whu, make_csv
}
