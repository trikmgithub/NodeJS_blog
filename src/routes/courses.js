const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create.bind(coursesController));
router.post('/store', coursesController.store.bind(coursesController));
router.get('/:id/edit', coursesController.edit.bind(coursesController));
router.put('/:id', coursesController.update.bind(coursesController));
router.patch('/:id/restore', coursesController.restore.bind(coursesController));
router.delete('/:id', coursesController.destroy.bind(coursesController));
router.delete(
    '/:id/force',
    coursesController.forceDestroy.bind(coursesController),
);
router.get('/:slug', coursesController.show.bind(coursesController));

module.exports = router;
