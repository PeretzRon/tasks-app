require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require("./api/routes");
const db = require("./services/db");
const logger = require('rp.libs.logger');
const accessLog = require('rp.libs.logger/accessLog/index');
const sessionID = require('rp.libs.logger/sessionID/index');
const createTracer = require('rp.libs.logger/tracer/index');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(cookieParser());
app.use(sessionID);
app.use(createTracer);
app.use(accessLog())
const router = routes();
app.use('', router);


db.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(4001, '0.0.0.0', () => {
            logger.info('Server is running on port 4001 :)', {});
        });
    }
});


