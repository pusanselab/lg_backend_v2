

const session = (req, res) => {
    const result = {
        session : false
    }
    if(req.get('user_id') === sessionStore.user_id){
        result.session = true
    }
    console.log('Store user : ' + sessionStore.user_id)
    console.log('session user : ' + req.get('user_id'))

    return res.json(result)
}

module.exports = { session }
