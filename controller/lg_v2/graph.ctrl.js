const get_item_list = (req, res) => {
    const header_uid = req.body.header_uid
    const result = []
    db.Item.findAll({
        where: {
            header_uid: header_uid
        }
    }).then(items => {
        for(let i=0; i<items.length; i++) {
            if(!(items[i].unit === "UNIT_STRING")) {
                result.push(items[i])
            }
            if(i === items.length-1) {
                return res.json(result)
            }
        }
    })
}

const get_raw_list = async (req, res) => {
    const header_uid = req.body.header_uid
    const item_list = req.body.item_list
    const result = {
            items: [],
            raws: {},
            time: {}
    }
    var i = 0
    result.items = item_list
    const temp_time = {}
    const temp_result = []
     db.Raw_0000_0500.findAll({
        where: {
            header_uid: header_uid
        },
        attributes: ['Date', 'time']
    }).then(async dateAndTimes => {
        result.time = dateAndTimes
    })
    for (let i=0; i < item_list.length; i++) {
            var data = {}
            item_num = item_list[i].slice(5)
            if (parseInt(item_num) <= 500) {
                await db.Raw_0000_0500.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]
                }).then(async raw_1s => {
                    data.item = item_list[i]
                    data.raws = raw_1s
                    temp_result.push(raw_1s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 1000) {
                db.Raw_0501_1000.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_2s => {
                    data.item = item_list[i]
                    data.raws = raw_2s
                    temp_result.push(raw_2s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 1500) {
                db.Raw_1001_1500.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_3s => {
                    data.item = item_list[i]
                    data.raws = raw_3s
                    temp_result.push(raw_3s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 2000) {
                db.Raw_1501_2000.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]
                }).then(async raw_4s => {
                    data.item = item_list[i]
                    data.raws = raw_4s
                    temp_result.push(raw_4s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 2500) {
                db.Raw_2001_2500.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_5s => {
                    data.item = item_list[i]
                    data.raws = raw_5s
                    temp_result.push(raw_5s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 3000) {
                db.Raw_2501_3000.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_6s => {
                    data.item = item_list[i]
                    data.raws = raw_6s
                    temp_result.push(raw_6s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 3500) {
                db.Raw_3001_3500.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_7s => {
                    data.item = item_list[i]
                    data.raws = raw_7s
                    temp_result.push(raw_7s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 4000) {
                db.Raw_3501_4000.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_8s => {
                    data.item = item_list[i]
                    data.raws = raw_8s
                    temp_result.push(raw_8s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 4500) {
                db.Raw_4001_4500.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_9s => {
                    data.item = item_list[i]
                    data.raws = raw_9s
                    temp_result.push(raw_9s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }
            else if (parseInt(item_num) <= 5000) {
                db.Raw_4501_5000.findAll({
                    where: {
                        header_uid: header_uid
                    },
                    attributes: [item_list[i]]

                }).then(async raw_10s => {
                    data.item = item_list[i]
                    data.raws = raw_10s
                    temp_result.push(raw_10s)
                    if (i === item_list.length - 1) {
                        var raws_result = []
                        var size_of_raws = temp_result[0].length
                        for(let k=0; k<size_of_raws; k++){
                            var temp_obj = {}
                            var temp_obj2 = {}
                            for(let j=0; j<temp_result.length; j++){
                                temp_obj2 = temp_obj
                                temp_obj = Object.assign(temp_obj2, temp_result[j][k].dataValues)
                            }
                            raws_result.push(temp_obj)
                        }

                        result.raws = raws_result
                        return res.json(result)
                    }
                })
            }

        }


}


module.exports = {get_item_list, get_raw_list}