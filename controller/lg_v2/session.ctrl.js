

const session = (req, res) => {
    const result = {
        session : true
    }
    if(!req.session.user){
        result.session = false
    }

    console.log(result)
    return res.json(result)
}

module.exports = { session }
