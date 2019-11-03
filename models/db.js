const Sequelize = require('sequelize')


const isTest = process.env.NODE_ENV === 'test'
const host = (!isTest) ? '164.125.70.12' : '164.125.70.12'

const database = (!isTest) ? 'lg_work' : 'lg_work'

const sequelize = new Sequelize(
    database,
    'lg',
    'selab',
    {
        host: host,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            // useUTC: false, //for reading from database
            // dateStrings: true,
            // typeCast: true
        },
        timezone: '+09:00' //for writing to database
    }
)

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: require('./user.model')(Sequelize, sequelize),
    Header: require('./header.model')(Sequelize, sequelize),
    Item: require('./item.model')(Sequelize, sequelize),
    Raw_1: require('./raw_1.model')(Sequelize, sequelize),
    Raw_2: require('./raw_2.model')(Sequelize, sequelize),
    Raw_3: require('./raw_3.model')(Sequelize, sequelize),
    Raw_4: require('./raw_4.model')(Sequelize, sequelize)
}

db.Header.hasMany(db.Raw_1, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_1.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Raw_2, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_2.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Raw_3, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_3.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Raw_4, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Item, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



module.exports = db;
