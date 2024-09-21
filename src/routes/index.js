const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // Routes

    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
