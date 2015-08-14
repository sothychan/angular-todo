var fs = require('fs');

module.exports = function (app, mongoose, router) {

    fs.readdirSync(__dirname + './routes').forEach(function (file) {
        var name = file.substr(0, file.indexOf('.'));
        console.log ('Setting up route: ', name);
        require('./routes/' + name)(app, mongoose, router);
    });

    fs.readdirSync(__dirname + './models').forEach(function (file) {
        var name = file.substr(0, file.indexOf('.'));
        console.log('Setting up model: ', name);
        require('./models/' + name)(app, mongoose, router);
    });
}