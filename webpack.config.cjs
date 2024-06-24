const path = require("path");

module.exports = {
    entry: "./resources/js/agoraLogic.js",
    output: {
        filename: "bundledAgoraLogic.js",
        path: path.resolve(__dirname, "./public/dist"),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./public"),
        },
        compress: true,
        port: 9000,
    },
};
