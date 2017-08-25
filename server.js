const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/dist')));

app.use(session({
    secret: "MySecretsAreSecrets",
    resave: false,
    saveUninitialized: true
}));

require('./server/config/goose.js');
const route_setter = require('./server/config/routes.js');
route_setter(app);

app.listen(8000, () => {
    console.log("We are listening to PORT 8000!");
});
