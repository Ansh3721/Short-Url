const app = require('express');
const router = app.Router();

const{handleRegisterUser, handleLoginUser} = require('../controller/user');



router.post('/', handleRegisterUser);
router.get('/login', handleLoginUser);

module.exports = router;

