const express = require('express');
const router = express.Router();
const empDetailsController = require('../controllers/emp_details_controller');

router.get('/:id', empDetailsController.empDetailsPage);
router.get('/remove-emp/:id', empDetailsController.removeEmployee);
router.get('/make-admin/:id', empDetailsController.makeAdmin);
router.get('/update-emp-page/:id', empDetailsController.updatePage);
router.post('/update-emp/:id', empDetailsController.updateEmployee);
router.get('/review-assign-page/:id', empDetailsController.reviewAssignPage);

module.exports = router;