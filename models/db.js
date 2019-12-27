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
        connectTimeout: 20000,
        dialectOptions: {
            // useUTC: false, //for reading from database
            // dateStrings: true,
            // typeCast: true
        },
        timezone: '+09:00', //for writing to database
    }
)

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: require('./user.model')(Sequelize, sequelize),
    Header: require('./header.model')(Sequelize, sequelize),
    Item: require('./item.model')(Sequelize, sequelize),
    Raw_0000_0500: require('./raw_0000_0500.model')(Sequelize, sequelize),
    Raw_0501_1000: require('./raw_0501_1000.model')(Sequelize, sequelize),
    Raw_1001_1500: require('./raw_1001_1500.model')(Sequelize, sequelize),
    Raw_1501_2000: require('./raw_1501_2000.model')(Sequelize, sequelize),
    Raw_2001_2500: require('./raw_2001_2500.model')(Sequelize, sequelize),
    Raw_2501_3000: require('./raw_2501_3000.model')(Sequelize, sequelize),
    Raw_3001_3500: require('./raw_3001_3500.model')(Sequelize, sequelize),
    Raw_3501_4000: require('./raw_3501_4000.model')(Sequelize, sequelize),
    Raw_4001_4500: require('./raw_4001_4500.model')(Sequelize, sequelize),
    Raw_4501_5000: require('./raw_4501_5000.model')(Sequelize, sequelize),
    Logger: require('./logger.model')(Sequelize, sequelize)
}

db.Header.hasMany(db.Raw_0000_0500, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_1.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Raw_0501_1000, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_2.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Raw_1001_1500, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_3.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Raw_1501_2000, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



db.Header.hasMany(db.Raw_2001_2500, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



db.Header.hasMany(db.Raw_2501_3000, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



db.Header.hasMany(db.Raw_3001_3500, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



db.Header.hasMany(db.Raw_3501_4000, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



db.Header.hasMany(db.Raw_4001_4500, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



db.Header.hasMany(db.Raw_4501_5000, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})


db.Header.hasMany(db.Item, {foreignKey: 'header_uid', constraints: false, sourceKey: 'header_uid', onDelete: 'cascade'})
// db.Raw_4.belongsTo(db.Header, {foreignKey: 'header_uid', constraints: false, targetKey: 'header_uid', onDelete: 'cascade'})



module.exports = db;
