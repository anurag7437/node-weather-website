const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    messageTwo.textContent = "";
    messageOne.textContent = "";
    const location = search.value;
    if (location !== undefined) {
        fetch("/weather?address=" + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageTwo.textContent = `${data.error}`;
                } else {
                    messageOne.textContent = `It is currently ${data.temprature} degrees in
                        ${data.location} with ${data.forecast} skies with wind speeds of ${data.windSpeed} Km/hr and a humidity of
                        ${data.humidity}%
                        `;
                }
            });
        });
    }
});
