const router = require('express').Router();
const userRoutes = require('./userRoutes');
const requestRoutes = require('./requestRoutes');

router.use('/users', userRoutes);
router.use('/requests', requestRoutes);

module.exports = router;
