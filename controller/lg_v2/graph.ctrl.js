const get_item_list = (req, res) => {
    const header_uid = req.query.header_uid

    db.Item.findAll({
        where: {
            header_uid : header_uid
        }
    }).then(items => {
        return res.json(items)
    })
}

module.exports = {get_item_list}