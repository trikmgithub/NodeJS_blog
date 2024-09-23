const coursesRouter = require('./courses');
const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // Routes

    app.use('/news', newsRouter);

    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
