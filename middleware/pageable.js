app.use((req, res, next) => {
    req.query.page = parseInt(req.query.page) || 0
    req.query.size = parseInt(req.query.size) || 10
    req.query.offset = req.query.page * req.query.size
    next()
})