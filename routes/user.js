const app = require('express');
const router = app.Router();

const{handleRegisterUser} = require('../controller/user');



router.post('/', handleRegisterUser);

module.exports = router;

