// Navigation Menu
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

const apiKey = "b5ca89d90178d9a31779036d2ce8d1de";

const currentWeatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=4.93&lon=6.26&units=metric&appid=${apiKey}`;

const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=4.93&lon=6.26&units=metric&appid=${apiKey}`;

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecast = document.querySelector("#forecast");


async function getCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        currentTemp.textContent = `${data.main.temp.toFixed(1)}°C`;
        weatherDesc.textContent = data.weather[0].description;

    } catch (error) {
        console.error(error);
    }
}

getCurrentWeather();

getForecast();

const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/members.json";


async function getSpotlights() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const members = await response.json();

        const featuredMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        featuredMembers.sort(() => Math.random() - 0.5);

        const selectedMembers = featuredMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            spotlightContainer.innerHTML += `
                <div class="spotlight-card">
                    <h3>${member.name}</h3>

                    <img src="images/${member.image}" alt="${member.name} logo">

                    <p><strong>Phone:</strong> ${member.phone}</p>

                    <p><strong>Address:</strong> ${member.address}</p>

                    <p>
                        <a href="${member.website}" target="_blank">
                            Visit Website
                        </a>
                    </p>

                    <p><strong>Membership:</strong>
                        ${member.membership === 3 ? "Gold" : "Silver"}
                    </p>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

getSpotlights();


async function getForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        forecast.innerHTML = "";

        const dailyForecast = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        dailyForecast.slice(0, 3).forEach(day => {
            const date = new Date(day.dt_txt);

            forecast.innerHTML += `
                <p>
                    <strong>${date.toLocaleDateString("en-US", { weekday: "long" })}:</strong>
                    ${day.main.temp.toFixed(1)}°C
                </p>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}