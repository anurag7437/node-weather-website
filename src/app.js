const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "missing address" });
    }
    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(
            data.latitude,
            data.longitude,
            (foreCasterror, forecastData) => {
                if (error) {
                    return res.send({ foreCasterror });
                }
                res.send({
                    forecast: forecastData.weather_description,
                    location: data.location,
                    feelslike: forecastData.feelslike,
                    temprature: forecastData.temperature,
                });
            }
        );
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({ error: "missing search term" });
    }
    console.debug(req.query.search);
    res.send({ products: [] });
});

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Anurag",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Anurag",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "help",
        name: "Anurag",
        helpText: "asss",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Anurag",
        message: "Help page not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Anurag",
        message: "Page not Found",
    });
});

app.listen(port, () => {
    console.debug("Server is up on port " + port);
});
