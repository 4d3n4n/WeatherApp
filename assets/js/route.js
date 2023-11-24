'use strict';


import { updateWeather, error404 } from './app.js';
const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474" //London

const currentLocation = function() {
    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords;

        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });
}



/**
 * @param {string} query Searched query
 */
const searchedLocation = query => updateWeather(...query.split("&"));
// const searchedLocation = query => {
//     if (query.includes("&")) {
//         const [lat, lon] = query.split("&");
//         updateWeather(lat, lon);
//     }
// }
// updateWeather("lat=51.5073219", "lon=-0.1276474")

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);


const checkHash = function() {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function() {
    if (!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
});


// window.onhashchange = function() {
//     // Récupérer les nouvelles valeurs de latitude et longitude depuis l'URL
//     const params = new URLSearchParams(window.location.hash.substring(1));
//     const lat = params.get("lat");
//     const lon = params.get("lon");

//     // Mettre à jour l'affichage avec ces nouvelles valeurs
//     updateWeather(lat, lon); // Appelle la fonction d'affichage de la météo avec les nouvelles coordonnées
// };

