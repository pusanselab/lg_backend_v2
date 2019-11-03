const sequelize = require('sequelize');

const overview = (req, res) => {
    const result = {
        content: {
            model: [
                {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ],
            test: [
                {}, {}, {}, {}, {}, {}
            ]
        }
    };

    db.Header.findOne({
        where: {
            lgmv_model_filter1: 'Multi V H/P'
        },
        attributes: [
            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
        ],
    }).then(counter => {
        console.log(counter.dataValues)
        result.content.model[0] = counter.dataValues
        result.content.model[0].name = 'Multi V H/P'

        db.Header.findOne({
            where: {
                lgmv_model_filter1: 'Multi V H/R'
            },
            attributes: [
                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
            ],
        }).then(counter => {
            result.content.model[1] = counter.dataValues
            result.content.model[1].name = 'Multi V H/R'

            db.Header.findOne({
                where: {
                    lgmv_model_filter1: 'Multi V ARUM'
                },
                attributes: [
                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                ],
            }).then(counter => {
                result.content.model[2] = counter.dataValues
                result.content.model[2].name = 'Multi V ARUM'

                db.Header.findOne({
                    where: {
                        lgmv_model_filter1: 'Multi Water'
                    },
                    attributes: [
                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                    ],
                }).then(counter => {
                    result.content.model[3] = counter.dataValues
                    result.content.model[3].name = 'Multi Water'

                    db.Header.findOne({
                        where: {
                            lgmv_model_filter1: 'Multi V S'
                        },
                        attributes: [
                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                        ],
                    }).then(counter => {
                        result.content.model[4] = counter.dataValues
                        result.content.model[4].name = 'Multi V S'

                        db.Header.findOne({
                            where: {
                                lgmv_model_filter1: 'Multi V M'
                            },
                            attributes: [
                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                            ],
                        }).then(counter => {
                            result.content.model[5] = counter.dataValues
                            result.content.model[5].name = 'Multi V M'

                            db.Header.findOne({
                                where: {
                                    lgmv_model_filter1: 'Multi V Space'
                                },
                                attributes: [
                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                ],
                            }).then(counter => {
                                result.content.model[6] = counter.dataValues
                                result.content.model[6].name = 'Multi V Space'

                                db.Header.findOne({
                                    where: {
                                        lgmv_model_filter1: 'GHP'
                                    },
                                    attributes: [
                                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                    ],
                                }).then(counter => {
                                    result.content.model[7] = counter.dataValues
                                    result.content.model[7].name = 'GHP'

                                    db.Header.findOne({
                                        where: {
                                            lgmv_model_filter1: 'Chiller'
                                        },
                                        attributes: [
                                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                        ],
                                    }).then(counter => {
                                        result.content.model[8] = counter.dataValues
                                        result.content.model[8].name = 'Chiller'

                                        db.Header.findOne({
                                            where: {
                                                lgmv_model_filter1: 'Therma V'
                                            },
                                            attributes: [
                                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                            ],
                                        }).then(counter => {
                                            result.content.model[9] = counter.dataValues
                                            result.content.model[9].name = 'Therma V'

                                            db.Header.findOne({
                                                where: {
                                                    lgmv_model_filter1: 'Single Package'
                                                },
                                                attributes: [
                                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                ],
                                            }).then(counter => {
                                                result.content.model[10] = counter.dataValues
                                                result.content.model[10].name = 'Single Package'

                                                db.Header.findOne({
                                                    where: {
                                                        lgmv_model_filter1: 'Single&Multi'
                                                    },
                                                    attributes: [
                                                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                    ],
                                                }).then(counter => {
                                                    result.content.model[11] = counter.dataValues
                                                    result.content.model[11].name = 'Single&Multi'

                                                    db.Header.findOne({
                                                        where: {
                                                            lgmv_model_filter1: 'Refrigeration'
                                                        },
                                                        attributes: [
                                                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                        ],
                                                    }).then(counter => {
                                                        result.content.model[12] = counter.dataValues
                                                        result.content.model[12].name = 'Refrigeration'

                                                        db.Header.findOne({
                                                            where: {
                                                                test_step1: '성능'
                                                            },
                                                            attributes: [
                                                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                            ],
                                                        }).then(counter => {
                                                            result.content.test[0] = counter.dataValues
                                                            result.content.test[0].name = '성능'

                                                            db.Header.findOne({
                                                                where: {
                                                                    test_step1: '냉방성능'
                                                                },
                                                                attributes: [
                                                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                ],
                                                            }).then(counter => {
                                                                result.content.test[1] = counter.dataValues
                                                                result.content.test[1].name = '냉방성능'

                                                                db.Header.findOne({
                                                                    where: {
                                                                        test_step1: '난방성능'
                                                                    },
                                                                    attributes: [
                                                                        [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                    ],
                                                                }).then(counter => {
                                                                    result.content.test[2] = counter.dataValues
                                                                    result.content.test[2].name = '난방성능'

                                                                    db.Header.findOne({
                                                                        where: {
                                                                            test_step1: '안정성'
                                                                        },
                                                                        attributes: [
                                                                            [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                        ],
                                                                    }).then(counter => {
                                                                        result.content.test[3] = counter.dataValues
                                                                        result.content.test[3].name = '안정성'

                                                                        db.Header.findOne({
                                                                            where: {
                                                                                test_step1: '신뢰성'
                                                                            },
                                                                            attributes: [
                                                                                [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                            ],
                                                                        }).then(counter => {
                                                                            result.content.test[4] = counter.dataValues
                                                                            result.content.test[4].name = '신뢰성'

                                                                            db.Header.findOne({
                                                                                where: {
                                                                                    test_step1: '기타'
                                                                                },
                                                                                attributes: [
                                                                                    [sequelize.fn('count', sequelize.col('lgmv_model_filter1')), 'count']
                                                                                ],
                                                                            }).then(counter => {
                                                                                result.content.test[5] = counter.dataValues
                                                                                result.content.test[5].name = '기타'

                                                                                db.Odu.findOne({
                                                                                    attributes: [
                                                                                        [sequelize.fn('count', sequelize.col('odu_uid')), 'count']
                                                                                    ]
                                                                                }).then(counter => {
                                                                                    result.content.db_usage = (counter.dataValues.count / 1000000000).toFixed(10)
                                                                                    console.log(result.content.db_usage)

                                                                                    return res.json(result)

                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

module.exports = { overview }
