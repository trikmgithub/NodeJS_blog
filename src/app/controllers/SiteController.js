const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET] /Site

    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
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
