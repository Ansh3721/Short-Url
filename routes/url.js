const express = require('express');

const router = express.Router();
const {generateUrlHandler, handleRedirect, handlegetAnalytics} = require('../controller/url');

const URL = require('../models/url');

router.post('/', generateUrlHandler );
router.get("/:shortId", handleRedirect);
router.get("/analytics/:shortId", handlegetAnalytics);


module.exports = router;