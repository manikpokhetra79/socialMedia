const express = require('express');
const router = express.Router();

// root index for all api filex
router.use('/v1',require('./v1'));
//version 2 route
router.use('/v2',require('./v2'));
module.exports = router;