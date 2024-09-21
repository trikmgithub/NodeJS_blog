const Course = require('../models/Course');

class SiteController {
    //[GET] /Site

    async index(req, res) {
        try {
            const courses = await Course.find({});
            res.json(courses);
        } catch (error) {
            res.status(400).json({ error: 'message' });
        }
    }

    //[GET] /search/:slug

    search(req, res) {
        try {
            res.render('search');
        } catch (error) {
            res.status(400).json({ error: 'message' });
        }
    }
}

module.exports = new SiteController();
