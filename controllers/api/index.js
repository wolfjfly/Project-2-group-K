const router = require('express').Router();
const userRoutes = require('./userRoutes');
const requestRoutes = require('./requesttRoutes');
const giveRoutes = require('./giveRoutes');

router.use('/users', userRoutes);
router.use('/requests', requestRoutes);
router.use('/gives', giveRoutes);

module.exports = router;
