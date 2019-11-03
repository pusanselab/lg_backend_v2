module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Item', {
            itemUid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            headerUid: {
                type: Sequelize.INTEGER
            },
            item: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            unit: {
                type: Sequelize.STRING
            },
            section: {
                type: Sequelize.STRING
            },
            section_count: {
                type: Sequelize.INTEGER
            }
        }, {
            freezeTableName: true,
            timestamps: false
        },
    )
}
