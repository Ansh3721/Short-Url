const express = require('express');

const router = express.Router();
const {generateUrlHandler, handleRedirect} = require('../controller/url');

const URL = require('../models/url');

router.post('/', generateUrlHandler );
router.get("/:shortId", handleRedirect);


module.exports = router;