const get_item_list = (req, res) => {
    const header_uid = req.body.header_uid

    db.Item.findAll({
        where: {
            header_uid: header_uid
        }
    }).then(items => {
        return res.json(items)
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
    const temp_time = {}
    const temp_result = []
    await db.Raw_1.findAll({
        where: {
            header_uid: header_uid
        },
        attributes: ['Date', 'time']
    }).then(async dateAndTimes => {
        result.time = dateAndTimes
    })
    for (i; i < item_list.length; i++) {
        var data = {}
        item_num = item_list[i].slice(5)
        if (parseInt(item_num) <= 1000) {
            await db.Raw_1.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]]
            }).then(async raw_1s => {
                data.item = item_list[i]
                data.raws = raw_1s
                 result.items.push(item_list[i])
                 temp_result.push(raw_1s)

            })
        }
        else if (parseInt(item_num) <= 2000) {
            db.Raw_2.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]]

            }).then(async raw_2s => {
                data.item = item_list[i]
                data.raws = raw_2s
                 result.items.push(item_list[i])
                 temp_result.push(raw_2s)
            })
        }
        else if (parseInt(item_num) <= 3000) {
            db.Raw_3.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]]

            }).then(async raw_3s => {
                data.item = item_list[i]
                data.raws = raw_3s
                 result.items.push(item_list[i])
                 temp_result.push(raw_3s)
            })
        }
        else if (parseInt(item_num) <= 4000) {
            db.Raw_4.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]]

            }).then(async raw_4s => {
                data.item = item_list[i]
                data.raws = raw_4s
                 result.items.push(item_list[i])
                 temp_result.push(raw_4s)
            })

                raw_new = Object.assign(data.raws)
        }
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
    }

}


module.exports = {get_item_list, get_raw_list}