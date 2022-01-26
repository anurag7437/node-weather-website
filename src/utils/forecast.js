const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
    request(
        {
            url:
                "http://api.weatherstack.com/current?access_key=d7121e6d3101cd85b7024f8691ebc88d&query=" +
                latitude +
                "," +
                longitude +
                "&units=m",
            json: true,
        },
        function (error, response, { error: bodyError, current }) {
            if (error) {
                callback("Unable to connect to weather Service", undefined);
            } else if (bodyError) {
                callback("Unable to find the location", undefined);
            } else {
                callback(undefined, {
                    weather_description: current.weather_descriptions[0],
                    temperature: current.temperature,
                    feelslike: current.feelslike,
                });
            }
        }
    );
};
module.exports = forecast;
