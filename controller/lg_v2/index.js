// 명진 컨트롤러
const admin_ctrl = require('./admin.ctrl')
const data_search_ctrl = require('./data_search.ctrl')
const graph_ctrl = require('./graph.ctrl')
const session_ctrl = require('./session.ctrl')
const logger_ctrl = require('./logger.ctrl')
// 종성 컨트롤러
const overview_ctrl = require('./overview.ctrl')
const login_ctrl = require('./login.ctrl')
const logout_ctrl = require('./logout.ctrl')
const chamber_ctrl = require('./chamber.ctrl')
const red_check_ctrl = require('./red_check.ctrl')
// const data_search_ctrl = require('./data_search.ctrl')
const router = express.Router()






// 명진이
router.post('/user/create', admin_ctrl.create_user)
router.post('/data/delete', admin_ctrl.delete_header_data)
router.post('/data_search_id', data_search_ctrl.data_search_id)
router.post('/data_search', data_search_ctrl.data_search)
router.post('/data_search_detail', data_search_ctrl.data_search_detail)
router.post('/similar_test', data_search_ctrl.similar_test)
router.post('/graph/items',graph_ctrl.get_item_list)
router.post('/graph/raws', graph_ctrl.get_raw_list)
router.post('/check_admin', admin_ctrl.check_admin_password)
router.post('/save_logger', logger_ctrl.save_logger)
router.get('/get_logger', logger_ctrl.get_logger)









// 종성이
router.post('/overview', overview_ctrl.overview)
router.post('/login', login_ctrl.login)
router.post('/logout', logout_ctrl.logout)
router.post('/chamber/recent_test', chamber_ctrl.recent_test)
router.post('/chamber/chamber_status', chamber_ctrl.chamber_status)
router.post('/session', session_ctrl.session)
router.get('/red_check', red_check_ctrl.red_check)
router.post('/chamber/chamber_testroom_number', chamber_ctrl.chamber_testroom_number)














module.exports = router