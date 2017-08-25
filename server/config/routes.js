const users = require('../controllers/users.js');
const path = require('path');

module.exports = function(app) {
    app.post('/login', users.login);

    app.get('/logout', users.logout);

    app.get('/get_user', users.get_user);

    app.post('/create', users.create);

    app.post('/getDisplay', users.getDisplay);

    app.post('/check', users.check);

    app.post('/uncheck', users.uncheck);

    app.post('/tag', users.tag);

    app.get('/getAll', users.getAll);

    // Final obligatory route.
    app.all('*', (req, res, next) => {
        res.sendfile(path.resolve("./public/dist/index.html"));
    });
};