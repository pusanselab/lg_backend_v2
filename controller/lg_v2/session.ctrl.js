

const session = (req, res) => {
    console.log("hello")
    let session = true
    if(!req.session.user){
        session = false
    }

    return res.json(session)
}

module.exports = { session }
