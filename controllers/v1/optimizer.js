'use strict';
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',

    // Optional depending on the providers

    apiKey: "AIzaSyA66KwUrjxcFG5u0exynlJ45CrbrNe3hEc", // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);
const routeOptimizerQueryService =
    require('../../services/query/routeOptimizerQueryService.js');
const responseStatus = require('../model/responseStatus.js');

module.exports.routeOptimizer = async function(req, res) {

    const { departureTime, home, tasks } = req.body

    let temp = []

    for (let i = 0; i < tasks.length; i++) {
        const res = await geocoder.geocode(tasks[i].diachi)

        let task = {
            id: tasks[i].id,
            duration: 30,
            lat: res[0].latitude,
            lng: res[0].longitude
        }
        temp.push({...task })


    }


    let result = {
        departureTime,
        home,
        tasks: temp
    }

    routeOptimizerQueryService.getOptimizedRoute(result)
        .then(function(response) {
            const status = response.status === responseStatus.OK.status ? 200 : 400;
            res.status(status).json(response);
        });
};