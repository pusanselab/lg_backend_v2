const get_item_list = (req, res) => {
    const header_uid = req.body.header_uid

    db.Item.findAll({
        where: {
            header_uid : header_uid
        }
    }).then(items => {
        return res.json(items)
    })
}

const get_raw_list = async (req, res) => {
    const header_uid = req.body.header_uid
    const item_list = req.body.item_list
    const result = []
    var i =0
    const temp_time = {}
    await db.Raw_1.findAll({
        where: {
            header_uid: header_uid
        },
        attributes: ['Date','time']
    }).then(async dateAndTimes => {
        temp_time.time = dateAndTimes
        await result.push(temp_time)
    })
     for (i; i<item_list.length; i++) {
        var data = {}

        item_num = item_list[i].slice(5)
        if(parseInt(item_num) <= 1000){
            await db.Raw_1.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]],
                limit: 1000
            }).then(async raw_1s => {
                data.item = item_list[i]
                data.raws = raw_1s
                await result.push(data)
            })
        }
        else if(parseInt(item_num) <= 2000){
            db.Raw_2.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]],
                limit: 1000

            }).then(async raw_2s => {
                data.item = item_list[i]
                data.raws = raw_2s
                await result.push(data)
            })
        }
        else if(parseInt(item_num) <= 3000){
            db.Raw_3.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]],
                limit: 1000

            }).then(async raw_3s => {
                data.item = item_list[i]
                data.raws = raw_3s
                await result.push(data)
            })
        }
        else if(parseInt(item_num) <= 4000){
            db.Raw_4.findAll({
                where: {
                    header_uid: header_uid
                },
                attributes: [item_list[i]],
                limit: 1000

            }).then(async raw_4s => {
                data.item = item_list[i]
                data.raws = raw_4s
                await result.push(data)
            })
        }
         if(i === item_list.length - 1) {
             return res.json(result)
         }
    }

}


module.exports = {get_item_list, get_raw_list}