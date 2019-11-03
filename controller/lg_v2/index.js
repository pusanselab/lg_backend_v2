const admin_ctrl = require('./admin.ctrl')
const router = express.Router()

router.post('/user/create', admin_ctrl.create_user)
router.post('/data/delete', admin_ctrl.delete_header_data)
module.exports = router
