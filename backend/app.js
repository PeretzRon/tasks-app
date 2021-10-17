require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require("./utils/db");
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require("./api/routes");

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

app.use(tasksRouter);
const router = routes();
app.use('', router);


db.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(4001, '0.0.0.0', () => {
            console.log('Server is running on port 4001');
        });
    }
});


