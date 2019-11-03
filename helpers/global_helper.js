function Pageable(req, content) {
    page = req.query.page
    size = req.query.size
    totalElements = content.count
    totalPages = Math.ceil(totalElements / size)
    isFirst = parseInt(page) === 0
    isLast = (totalPages === 0) ? true : parseInt(page) === (totalPages - 1)
    return {
        'content': content.rows,
        'page': page,
        'size': size,
        'totalPages': totalPages,
        'totalElements': totalElements,
        'isFirst': isFirst,
        'isLast': isLast
    }
}

function TxtForm(res, txt) {
    return res.status(200).json({data: txt})
}

function ResForm(res, data) {
    return res.json({data: data}).end()
}

function ErrForm(res, err) {
    let status
    let errCode
    let errMsg

    if (typeof err === "object") {
        if (!e[err.name]) status = 500
        else status = e[err.name].status
        errCode = err.name
        errMsg = err
    } else {
        status = e[err].status
        errCode = err
        errMsg = e[errCode].msg
    }

    return res.status(status).json({
        errCode: errCode,
        errMsg: errMsg
    })
}

function IsEmpty(v) {
    if (Array.isArray(v)) {
        let result
        v.forEach((value, _) => {
            if (value === undefined || value === '' || value === null) {
                result = true
            }
            else {
                result = false
            }
        })
        return result
    } else return v === undefined || v === '' || v === null
}

module.exports = (db, app, appRoot, express) => {
    global.serverkey = "AAAAVZL-m2w:APA91bEknMJSA2w_eo2Kbz4f_RdHjVx9IXqHqhCLohNx_OWHPF8bbopHCu3gGa4lpOLS99emK2ctvsGCKWzWSg-yPiNBIhA1MsfpwmcF8xbrUQxYmuHWr-iSix85CpmwG-QMOufGj85V"
    global.db = db
    global.app = app
    global.appRoot = appRoot
    global.express = express
    global.ErrForm = ErrForm
    global.IsEmpty = IsEmpty
    global.Pageable = Pageable
    global.TxtForm = TxtForm
    global.ResForm = ResForm

    global.role = {
        YG: 'YG',
        YM: 'YM',
        SG: 'SG',
        SM: 'SM',
        SS: 'SS',
        C: 'C'
    }

    global.e = {
        SequelizeValidationError: {
            status: 400,
            code: 'SequelizeValidationError',
            msg: '요청값이 잘못되었습니다.'
        },
        PasswordValidationError: {
            status: 400,
            code: 'PasswordValidationError',
            msg: '비밀번호가 일치하지 않습니다.'
        },
        FileIsEmptyError: {
            status: 400,
            code: 'FileIsEmptyError',
            msg: '파일이 존재하지 않습니다.'
        },
        BusStopNotFoundError: {
            status: 400,
            code: 'BusStopNotFoundError',
            msg: '버스 정류장이 존재하지 않습니다.'
        },
        RegionNotFoundError: {
            status: 400,
            code: 'RegionNotFoundError',
            msg: '해당 지역이 존재하지 않습니다.'
        },
        BusNotFoundError: {
            status: 400,
            code: 'BusNotFoundError',
            msg: '버스가 존재하지 않습니다.'
        },
        HistoryNotFoundError: {
            status: 400,
            code: 'HistoryNotFoundError',
            msg: '해당 고유 번호에 대한 기록이 존재하지 않습니다.'
        }

    }
}
