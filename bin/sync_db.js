const models = require('../models/db')

module.exports = () => {
    return models.sequelize.sync({force: false})
}