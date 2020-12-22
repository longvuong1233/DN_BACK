'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');
const logger = require("morgan")
const app = express();
const mysql = require("./database/index")

const cors = require("cors")



require('dotenv').config();

const Response = require('./controllers/model/response.js');
const responseStatus = require('./controllers/model/responseStatus.js');

const routerV1 = require('./routes/v1/router.js');
const donhang = require("./routes/donhang")


app.use(bodyParser.json());
app.use(logger("dev"))
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', routerV1);
app.use("/donhang", donhang)

//routes 


app.get("/", (req, res, next) => {
    res.send("chuong ngu")
});
// Handle validation errors
app.use(function(err, req, res, next) {
    const apiResponse = new Response(
        responseStatus.INVALID_REQUEST.status,
        responseStatus.INVALID_REQUEST.statusText,
        err.errors
    );

    res.status(400).json(apiResponse);
});

const server = app.listen(3000, '127.0.0.1', function() {

    const host = server.address().address;
    const port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

});
mysql.connect((err) => {
    if (err) throw err.stack
    console.log("KET NOI DATABASE")
})

module.exports = server;