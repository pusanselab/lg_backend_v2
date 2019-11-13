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
        },
        order: [['conn_file_date', 'ASC']]
    }).then(async header => {
        if (header.length == 0) {
            result.code = 400
            result.message = "failure"
        }
        else {
            result.code = 200
            result.message = "success"

            for (let i = 0; i < header.length; i++) {
                result.content.header_uid.push(header[i].header_uid)
            }

            const recent_header = header[header.length - 1]

            const eer_result_params = recent_header.eer_result_params.split(",")
            const eer_item_num = recent_header.eer_item_num
            console.log(eer_result_params)
            const attr = ['header_uid', eer_item_num]
            if (Number(eer_item_num.slice(5)) <= 500) {
                db.Raw_0000_0500.findAll({
                    where: {
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
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
                        header_uid: recent_header.header_uid
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
                            for( var j=0; j < eer_result_params.length; j++) {
                                var eer_result_param_temp = {}
                                var temp = []
                                var number = Number(eer_result_params[j].slice(5))
                                if(number <= 500){
                                    await db.Raw_0000_0500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1000) {
                                    await db.Raw_0501_1000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 1500) {
                                    await db.Raw_1001_1500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2000) {
                                    await db.Raw_1501_2000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 2500) {
                                    await db.Raw_2001_2500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3000) {
                                    await db.Raw_2501_3000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 3500) {
                                    await db.Raw_3001_3500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4000) {
                                    await db.Raw_3501_4000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 4500) {
                                    await db.Raw_4001_4500.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }
                                else if (number <= 5000) {
                                    await db.Raw_4501_5000.findAll({
                                        where: {
                                            header_uid: recent_header.header_uid
                                        },
                                        attribute: [eer_result_params[j]]
                                    }).then(async eer_raws => {
                                        await temp.push(eer_raws[Number(flag)][eer_result_params[j]])
                                        await db.Item.findOne({
                                            where: {
                                                header_uid: recent_header.header_uid,
                                                item: eer_result_params[j]
                                            }
                                        }).then(item => {
                                            temp.push(item.name)
                                        })
                                        result.content.raw_data[eer_result_params[j]] = temp
                                    })
                                }

                                if(j === eer_result_params.length -1 ){
                                    console.log("redundancy check finish")
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

module.exports = {red_check}