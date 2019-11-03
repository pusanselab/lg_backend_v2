const admin_ctrl = require('./admin.ctrl')
const router = express.Router()
// 명진이
router.post('/user/create', admin_ctrl.create_user)
router.post('/data/delete', admin_ctrl.delete_header_data)















// 종성이



















module.exports = router
