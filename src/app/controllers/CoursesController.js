const Course = require('../models/Course');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class CoursesController {
    //[GET] /courses

    index(req, res) {
        res.render('courses');
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // res.json(req.body);
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                // Nếu lưu thành công, chuyển hướng đến trang chính
                res.redirect('/');
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error(error); // Log lỗi để kiểm tra
                res.status(500).json({ error: 'Failed to create course' }); // Trả về lỗi nếu có
            });
    }
}

module.exports = new CoursesController();
