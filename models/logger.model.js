module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Logger', {
            loggerUid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            chamber_status: {
                type: Sequelize.INTEGER
            },
            data_search: {
                type: Sequelize.INTEGER
            },
            data_detail: {
                type: Sequelize.INTEGER
            },
            graph: {
                type: Sequelize.INTEGER
            },
            option: {
                type: Sequelize.INTEGER
            }
        }, {
            freezeTableName: true,
            timestamps: false
        },
    )
}
