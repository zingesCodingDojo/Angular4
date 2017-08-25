const goose = require('mongoose');
const fs = require('fs');
const path = require('path');
goose.Promise = global.Promise;
goose.connect('mongodb://localhost/BucketListCarlos', {useMongoClient: true});
const models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach( (file) => {
    if (file.indexOf('.js') >= 0) {
        require(models_path + '/' + file);
    }
});