const {createLogger, transports, format} = require('winston');
const path = require('path');
const winston = require("winston");

const customFormat = format.printf((info) => {
    return `${info.timestamp}  ${info.level} ${info.label} - ${info.message}`;
});

const getLabel = function (callingModule) {
    return callingModule.filename.split(path.sep).pop();
};

const consoleLogger = (callingModule) => {
    return {
        format: format.combine(
            format.label({
                label: getLabel(callingModule)
            }),
            format.timestamp({
                format: "YY-MM-DD HH:MM:SS:SSS"
            }),
            format(info => {
                info.level = info.level.toUpperCase().padEnd(6);
                return info;
            })(),
            format.colorize(),
            customFormat
        )
    };
};

const fileLogger = {
    filename: 'app.log',
    format: format.combine(
        format.label({
            label: '[LOGGER]'
        }),
        format.timestamp({
            format: "YY-MM-DD HH:MM:SS:SSS"
        }),
        format(info => {
            info.level = info.level.toUpperCase().padEnd(7);
            return info;
        })(),
        customFormat
    )
};


module.exports = function (callingModule) {
    return createLogger({
        level: 'silly',
        transports: [new winston.transports.Console(consoleLogger(callingModule))]
    });
};

//
// const logger = createLogger({
//     level: 'silly',
//     transports: [new transports.Console(consoleLogger), new transports.File(fileLogger)]
// });
//
// module.exports = logger;

