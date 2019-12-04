const create_user = (req, res) => {  // 유저 ID 발급
    const result = {}
    db.User.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        if (!user) {
            db.User.create(req.body).then(user => {  // User db 에 user 객체 저장
                return res.json(user).end()
            })
        }
        if (user) {  // id 를 가진 기존 user 가 있다면 id 중복 메시지 출력
            result.status = 400
            result.message = "id 중복"
            return res.json(result).end()
        }
    })

}

const delete_header_data = (req, res) => {   // 헤더 데이터 삭제 ( id 삭제 , 날짜 삭제 )
    const body = req.body
    const type = body.type   // type = id or type = date

    if (type === 'date') {   // 날짜 삭제 이면
        const first_date = body.first_date  // 시작 날짜
        const end_date = body.end_date  // 끝 날짜
        db.Header.findAll().then(headers => {  // 시작 날짜와 끝 날짜 사이에 있는 모든 헤더를 다 삭제
            for (var i = 0; i < headers.length; i++) {
                var header_date = headers[i].lgmv_date.substring(0, 10)
                if (first_date < header_date) {
                    if (header_date < end_date) {
                        db.Header.destroy({    // 헤더 삭제 , 헤더를 삭제하면 관련된 item data, raw data 다 삭제가 된다.
                            where: {
                                header_uid: headers[i].header_uid
                            }
                        }).then(resu => {
                            return res.json(resu).end()
                        })
                    }
                }
            }
        })
    }

    if (type === 'id') {    // type 이 id 이면
        const id = body.id
        db.Header.destroy({     // 헤더 삭제 , item ,raw 모두 삭제
            where: {
                header_uid: id
            }
        }).then(resu => {
            return res.json(resu).end()
        })
    }
}

const check_admin_password = (req, res) => {    // 관리자 모드 접근시 패스워드를 비교하기 위해 만든 함수
    db.User.findOne({
        where: {
            userUid: 1  // userUid 가 1번인 유저의 비밀번호를 return 한다.
                        // 추후, 비밀번호를 바꾸고 싶다면, user table 의 uid = 1인 raw 의 pwd 를 바꾸어 주면 된다.
        }
    }).then(user => {
        return res.json(user).end()
    })

}

module.exports = {create_user, delete_header_data, check_admin_password}