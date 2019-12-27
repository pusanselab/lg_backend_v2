const save_logger = (req, res) => {
    console.log("hihi")
    const logger_type = req.body.logger_type
    if(logger_type === "chamber_status"){
        db.Logger.findByPk(1).then(logger => {
            logger.update({
                chamber_status: logger.chamber_status + 1
            }).then(result => {
                return res.json(result)
            })

        }).catch(err => {
            console.log(err)
        })
    }

    if(logger_type === "data_search"){
        db.Logger.findByPk(1).then(logger => {
            logger.update({
                data_search: logger.data_search + 1
            }).then(result => {
                return res.json(result)
            })

        }).catch(err => {
            console.log(err)
        })
    }
    if(logger_type === "data_detail"){
        db.Logger.findByPk(1).then(logger => {
            logger.update({
                data_detail: logger.data_detail + 1
            }).then(result => {
                return res.json(result)
            })

        }).catch(err => {
            console.log(err)
        })
    }

   if(logger_type === "graph"){
        db.Logger.findByPk(1).then(logger => {
            logger.update({
                graph: logger.graph + 1
            }).then(result => {
                return res.json(result)
            })

        }).catch(err => {
            console.log(err)
        })
    }


    if(logger_type === "option"){
        db.Logger.findByPk(1).then(logger => {
            logger.update({
                option: logger.option + 1
            }).then(result => {
                return res.json(result)
            })

        }).catch(err => {
            console.log(err)
        })
    }

}

const get_logger = (req, res) => {
    db.Logger.findByPk(1).then(logger => {
        return res.json(logger)
    })
}

module.exports = { save_logger, get_logger }
