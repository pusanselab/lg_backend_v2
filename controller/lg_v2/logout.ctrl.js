

const logout = (req, res) => {
    const logout_id = req.body.logout_id

    while(true){
        var search = sessionStore.user_id.indexOf(logout_id);
        if(search!=-1){
            sessionStore.user_id.splice(search,1); // "A"를 찾아서 삭제한다.
        }else{
            break;
        }
    }
    console.log(sessionStore)
    const result = {
        code:200,
        message:"success"
    }
    return res.json(result)
}

module.exports = { logout }
