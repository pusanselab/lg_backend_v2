

const session = (req, res) => {
    const result = {
        session : false
    }
    for(var i = 0 ; i < sessionStore.user_id.length ; i++){
        if(req.get('user_id') === sessionStore.user_id[i]){
            result.session = true
        }
    }
    console.log('Store user : ' + sessionStore.user_id)
    console.log('session user : ' + req.get('user_id'))

    return res.json(result)
}

module.exports = { session }
