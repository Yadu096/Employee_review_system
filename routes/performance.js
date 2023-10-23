const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performance_controller');

router.get('/add-for-review', performanceController.addForReview);
router.get('/review-page/:id', performanceController.reviewPage);
router.post('/create-review', performanceController.createReview);
router.get('/update-page/:id', performanceController.updatePage);
router.post('/update-review/:id', performanceController.updateReview);

module.exports = router;