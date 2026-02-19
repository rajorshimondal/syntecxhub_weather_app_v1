const apiKey = "63896b3e151a72aff587fbea00c095d1";
const cityInput = document.querySelector(".city");
const check = document.getElementById("check");


//for the data that i recive
const weatherResult = document.getElementById("weather-result");
const displayCity = document.getElementById("display-city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const update = document.getElementById("update");
const error = document.getElementById("error");





check.addEventListener("click", () => {
    const city = (cityInput?.value ?? "").trim();

    if (city) {
        clearError();
        getWeather(city);
    } else {
        showError("Please mention the city name.");
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        check.click();
    }
});

function renderWeather(data) {
    displayCity.textContent = `${data.name}, ${data.sys?.country ?? ""}`.trim();
    temp.textContent = Math.round(data.main?.temp ?? 0);
    description.textContent = data.weather?.[0]?.description ?? "";
    humidity.textContent = data.main?.humidity ?? 0;
    wind.textContent = data.wind?.speed ?? 0;
    update.textContent = new Date().toLocaleString();
    weatherResult.style.display = "block";
    error.style.display = "none";
}




function showError(message) {
    error.textContent = message;
    error.style.display = "block";
}

function clearError() {
    error.textContent = "";
    error.style.display = "none";
}

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                city
            )}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        renderWeather(data);
    } catch (err) {
        console.error("Failed to fetch weather data:", err);
        showError("Unable to load weather data. Please try again in a moment.");
    }
}
