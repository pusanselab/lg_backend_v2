// 명진 컨트롤러
const admin_ctrl = require('./admin.ctrl')
const data_search_ctrl = require('./data_search.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
// 종성 컨트롤러
// const data_search_ctrl = require('./data_search.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
const router = express.Router()






// 명진이
router.post('/user/create', admin_ctrl.create_user)
router.post('/data/delete', admin_ctrl.delete_header_data)
router.post('/data_search_id', data_search_ctrl.data_search_id)
router.post('/data_search', data_search_ctrl.data_search)















// 종성이




















module.exports = router