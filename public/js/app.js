console.log("javascript loaded");

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
        fetch("http://localhost:3000/weather?address=" + location).then(
            (response) => {
                response.json().then((data) => {
                    if (data.error) {
                        messageTwo.textContent = `${data.error}`;
                    } else {
                        messageOne.textContent = `Temprature is ${data.temprature}
                        for ${data.location} and it is currently ${data.forecast}
                        `;
                    }
                });
            }
        );
    }
});
