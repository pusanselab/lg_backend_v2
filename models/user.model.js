module.exports = (Sequelize, sequelize) => {
    return sequelize.define('User', {
            userUid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                type: Sequelize.STRING,
                comment: '유저 id'
            },
            pwd: {
                type: Sequelize.STRING,
                comment: '유저 pwd'
            }
        }, {
            freezeTableName: true,
            timestamps: false
        },
    )
}
