const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.show.bind(newsController));
router.get('/', newsController.index.bind(newsController));

module.exports = router;
