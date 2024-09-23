const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create.bind(coursesController));
router.post('/store', coursesController.store.bind(coursesController));
router.get('/:slug', coursesController.show.bind(coursesController));

module.exports = router;
