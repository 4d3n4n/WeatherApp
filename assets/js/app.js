'use strict';

import { fetchData, url } from "./api.js";
import * as module from "./module.js";


/**
 * Add event listener on multple elements
 * @param {NodeList} elements  Elements node array
 * @param {string} eventType Event Type e.g.: "click", "mouseover"
 * @param {Function} callBack Callback function
 */

const addEventOnElements = function (elements, eventType, callBack) {
    for (const element of elements) element.addEventListener(eventType, callBack);
}



/**
 * Toggle search in mobile devices
 */

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);



/**
 * Search integration
 */

const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;

const searchTimeoutDuration = 500;

searchField.addEventListener("input", function() {

    // searchTimeout ?? clearTimeout(searchTimeout);
    if (searchTimeout !== null) {
        clearTimeout(searchTimeout);
    }


    if (searchField.value.trim() === '') {
        // Gérer le cas où le champ de recherche est vide
        searchResult.classList.remove("active");
        searchResult.innerHTML = "";
        searchField.classList.remove("searching");
        return;
    } else {
        searchField.classList.add("searching");

        searchTimeout = setTimeout(() => {
            fetchData(url.geo(searchField.value), function (locations) {
                searchField.classList.remove("searching");
                searchResult.classList.add("active");
                searchResult.innerHTML = `
                    <ul class="view-list" data-search-list></ul>
                `;

                const /** {NodeList} | [] */ items = [];

                for (const { name, lat, lon, country, state } of locations) {
                    const searchItem = document.createElement("li");
                    searchItem.classList.add("view-item");

                    searchItem.innerHTML = `
                        <span class="m-icon">location_on</span>
                        <div>
                            <p class="item-title">${name}</p>
                            <p class="label-2 item-subtitle">${state || ""} ${country}</p>
                        </div>
                        <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler></a>
                    `;

                    searchResult.querySelector("[data-search-list]").appendChild(searchItem);
                    items.push(searchItem.querySelector("[data-search-toggler]"));
                }

                addEventOnElements(items, "click", function() {
                    toggleSearch();
                    searchResult.classList.remove("active");
                });
            });
        }, searchTimeoutDuration);
    }
});




const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");
const errorContent = document.querySelector("[data-error-content]");


/**
 * Render all weather data in html page
 * 
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
export const updateWeather = function (lat, lon) {

    loading.style.display = "grid";
    container.style.overflowY = "hidden";
    container.classList.remove("fade-in");
    errorContent.style.display = "none";

    const currentWeatherSection = document.querySelector("[data-current-weather]");
    const highlightSection = document.querySelector("[data-highlights]");
    const hourlySection = document.querySelector("[data-hourly-forecast]");
    const forecastSection = document.querySelector("[data-5-day-forecast]");

    currentWeatherSection.innerHTML = "";
    highlightSection.innerHTML = "";
    hourlySection.innerHTML = "";
    forecastSection.innerHTML = "";

    if (window.location.hash === "#/current-location") {
        currentLocationBtn.setAttribute("disabled", "");
    } else {
        currentLocationBtn.removeAttribute("disabled");
    }


    /**
     * Current weather section
     */

    fetchData(url.currentWeather(lat, lon), function (currentWeather) {

        const {
            weather,
            dt: dateUnix,
            sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
            main: { temp, feels_like, pressure, humidity },
            visibility,
            timezone
        } = currentWeather
        const [{ description, icon }] = weather;

        const card = document.createElement("div");
        card.classList.add("card" , "card-lg", "current-weather-card");
        


        const body = document.querySelector("body");
        if (icon === "01d") {
            body.style.backgroundImage = "url('./assets/images/bg/01d.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "01n") {
            body.style.backgroundImage = "url('./assets/images/bg/01n.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "02d") {
            body.style.backgroundImage = "url('./assets/images/bg/02d.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "02n") {
            body.style.backgroundImage = "url('./assets/images/bg/02n.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "03d") {
            body.style.backgroundImage = "url('./assets/images/bg/03d.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "03n") {
            body.style.backgroundImage = "url('./assets/images/bg/03n.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "04d") {
            body.style.backgroundImage = "url('./assets/images/bg/04d.jpeg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "04n") {
            body.style.backgroundImage = "url('./assets/images/bg/04n.jpeg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "09d") {
            body.style.backgroundImage = "url('./assets/images/bg/09d.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "09n") {
            body.style.backgroundImage = "url('./assets/images/bg/09n.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "10d") {
            body.style.backgroundImage = "url('./assets/images/bg/10d.jpg')";
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "top";
        } else if (icon === "10n") {
            body.style.backgroundImage = "url('./assets/images/bg/10n.jpg')";
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";
        } else if (icon === "11d") {
            body.style.backgroundImage = "url('./assets/images/bg/11d.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "11n") {
            body.style.backgroundImage = "url('./assets/images/bg/11n.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "13d") {
            body.style.backgroundImage = "url('./assets/images/bg/13d.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "13n") {
            body.style.backgroundImage = "url('./assets/images/bg/13n.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "50d") {
            body.style.backgroundImage = "url('./assets/images/bg/50d.jpg')";
            body.style.backgroundSize = "cover";
        } else if (icon === "50n") {
            body.style.backgroundImage = "url('./assets/images/bg/50n.jpg')";
            body.style.backgroundSize = "cover";
        }

        console.log(icon);


        
        card.innerHTML = `
            <h2 class="title-2 card-title">Now</h2>
            <div class="wrapper">
                <p class="heading">${parseInt(temp)}°<sup>c</sup></p>
                <img src="./assets/images/weather_icons/${icon}.png" width="120" height="120" alt="${description}" class="weather-icon">
            </div>

            <p class="body-3">${description}</p>
            <ul class="meta-list">
                <li class="meta-item">
                    <span class="m-icon">calendar_today</span>
                    <p class="title-3 meta-text">${module.getDate(dateUnix, timezone)}</p>
                </li>
                
                <li class="meta-item">
                    <span class="m-icon">location_on</span>
                    <p class="title-3 meta-text" data-location></p>
                </li>
            </ul>
        `;

        fetchData(url.reverseGeo(lat, lon), function([{ name, country}]) {
            card.querySelector("[data-location]").innerHTML = `${name}, ${country}`;
        });

        currentWeatherSection.appendChild(card);


        /**
         * Today's highlights
         */
        fetchData(url.airPollution(lat, lon), function (airPollution) {

            const [{
                main: { aqi },
                components: { no2, o3, so2, pm2_5}
            }] = airPollution.list;

            const card = document.createElement("div");;
            card.classList.add("card", "card-lg");

            card.innerHTML = `
                <h2 class="title-2" id="highlights-label">Todays Highlights</h2>

                <div class="highlights-list">

                    <div class="card card-sm highlight-card one">
                        <h3 class="title-3">Air Quality Index</h3>
                        <div class="wrapper">
                            <span class="m-icon">air</span>
                            <ul class="card-list">

                                <li class="card-item">
                                    <p class="title-1">${pm2_5.toPrecision(3)}</p>
                                    <p class="label-1">PM<sub>2.5</sub></p>
                                </li>

                                <li class="card-item">
                                    <p class="title-1">${so2.toPrecision(3)}</p>
                                    <p class="label-1">SO<sub>2.5</sub></p>
                                </li>

                                <li class="card-item">
                                    <p class="title-1">${no2.toPrecision(3)}</p>
                                    <p class="label-1">NO<sub>2</sub></p>
                                </li>
                                
                                <li class="card-item">
                                    <p class="title-1">${o3.toPrecision(3)}</p>
                                    <p class="label-1">PM<sub>3</sub></p>
                                </li>
                            </ul>
                        </div>

                        <span class="badge aqi-${aqi} label-${aqi}" title="${module.aqiText[aqi].message}">
                            ${module.aqiText[aqi].level}
                        </span>
                    </div>

                    <div class="card card-sm highlight-card two">
                        <h3 class="title-3">Sunrise & Sunset</h3>
                        <div class="card-list">
                            <div class="card-item">
                                <span class="m-icon">clear_day</span>
                                <div>
                                    <p class="label-1">Sunrise</p>
                                    <p class="title-1">${module.getTime(sunriseUnixUTC, timezone)}</p>
                                </div>
                            </div>

                            <div class="card-item">
                                <span class="m-icon">clear_night</span>
                                <div>
                                    <p class="label-1">Sunset</p>
                                    <p class="title-1">${module.getTime(sunsetUnixUTC, timezone)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card card-sm highlight-card">
                        <h3 class="title-3">Humidity</h3>
                        <div class="wrapper">
                            <span class="m-icon">humidity_percentage</span>
                            <p class="title-1">${humidity}<sub>%</sub></p>
                        </div>
                    </div>

                    <div class="card card-sm highlight-card">
                        <h3 class="title-3">Pressure</h3>
                        <div class="wrapper">
                            <span class="m-icon">airwave</span>
                            <p class="title-1">${pressure}<sub>hPa</sub></p>
                        </div>
                    </div>

                    <div class="card card-sm highlight-card">
                        <h3 class="title-3">Visibility</h3>
                        <div class="wrapper">
                            <span class="m-icon">visibility</span>
                            <p class="title-1">${visibility}<sub>km</sub></p>
                        </div>
                    </div>

                    <div class="card card-sm highlight-card">
                        <h3 class="title-3">Feels like</h3>
                        <div class="wrapper">
                            <span class="m-icon">thermostat</span>
                            <p class="title-1">${parseInt(feels_like)}°<sup>c</sup></p>
                        </div>
                    </div>

                </div>
            `;

            highlightSection.appendChild(card);

        });


        /**
         * 24H forecast section
         */        

        fetchData(url.forecast(lat,lon), function (forecast) {
            
            const {
                list: forecastList,
                city: { timezone }
            } = forecast;

            hourlySection.innerHTML = `
                <h2 class="title-2">Today at</h2>

                <div class="slider-container">
                    <ul class="slider-list" data-temp></ul>

                    <!--DIRECITON WIND-->
                    <ul class="slider-list" data-wind></ul>
                </div>
            `;


            for (const [index, data] of forecastList.entries()) {

                if (index > 7) break;

                const {
                    dt: dateTimeUnix,
                    main: { temp },
                    weather,
                    wind: { deg: windDirection, speed: windSpeed }
                } = data
                const [{ icon, description }] = weather

                const tempLi = document.createElement("li");
                tempLi.classList.add("slider-item");

                tempLi.innerHTML = `
                    <div class="card card-sm slider-card">
                        <p class="body-3">${module.getHours(dateTimeUnix, timezone)}</p>
                        <img src="./assets/images/weather_icons/${icon}.png" width="48" height="48" loading="lazy" alt="${description}" class="weather-icon" title="${description}">
                        <p class="body-3">${parseInt(temp)}°</p>
                    </div>
                `;
                hourlySection.querySelector("[data-temp]").appendChild(tempLi);

                const windLi = document.createElement("li");
                windLi.classList.add("slider-item");

                windLi.innerHTML = `
                    <div class="card card-sm slider-card">
                        <p class="body-3">${module.getHours(dateTimeUnix, timezone)}</p>
                        <img src="./assets/images/weather_icons/direction.png" width="48" height="48"
                        loading="lazy" alt="direction" class="weather-icon" style="transform: rotate(${windDirection - 180}deg)">
                        <p class="body-3">${parseInt(module.mps_to_kmh(windSpeed))} km/h</p>
                    </div>
                `;
                hourlySection.querySelector("[data-wind]").appendChild(windLi);
            }

            /**
             * 5 day forecast section
             */

            forecastSection.innerHTML = `
                <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>

                <div class="card- card-lg forecast-card">
                    <ul data-forecast-list></ul>
                </div>
            `;

            for (let i = 7, len = forecastList.length; i < len; i += 8) {
                const {
                    main: { temp_max },
                    weather,
                    dt_txt
                } = forecastList[i];
                const [{ icon, description }] = weather
                const date = new Date(dt_txt);

                const li = document.createElement("li");
                li.classList.add("card-item");

                li.innerHTML = `
                    <div class="icon-wrapper">
                        <img src="./assets/images/weather_icons/${icon}.png" width="36" height="36" alt="${description}" class="weather-icon" title="${description}">
                        <span class="span">
                            <p class="title-2">${parseInt(temp_max)}°</p>
                        </span>
                    </div>

                    <p class="label-1">${date.getDate()} ${module.monthNames[date.getUTCMonth()]}</p>
                    <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
                `;
                forecastSection.querySelector("[data-forecast-list]").appendChild(li);
            }

            loading.style.display = "none";
            container.style.overflowY = "overlay";
            container.classList.add("fade-in");

        });
    });
}


export const error404 = () => errorContent.style.display = "flex";


