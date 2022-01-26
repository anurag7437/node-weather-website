const request = require("postman-request");
const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURI(address) +
        ".json?access_token=pk.eyJ1IjoiYW51cmFnNzQzNyIsImEiOiJja3lsZ25menAwNjQzMm5vNHZjNG84bzBoIn0.b2OVoTnZZAAy2u0Y_cGVUw&limit=1";
    const json = true;
    request(
        {
            url,
            json,
        },
        (error, response, { features }) => {
            if (error) {
                callback("Unable to connect to mapbox", undefined);
            } else if (features.length === 0) {
                callback("no place found", undefined);
            } else {
                callback(undefined, {
                    latitude: features[0].center[1],
                    longitude: features[0].center[0],
                    location: features[0].place_name,
                });
            }
        }
    );
};
module.exports = geocode;
