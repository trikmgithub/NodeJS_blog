const coursesRouter = require('./courses');
const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');

function route(app) {
    // Routes

    app.use('/stored/courses', meRouter);

    app.use('/me', meRouter);

    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
