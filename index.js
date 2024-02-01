const apiKey = "at_qkspm12320VfkMgfmd8KfASE0twpl";
const form = document.getElementById("form");
const input = document.getElementById("input");
const ipa = document.getElementById("ipa");
const location1 = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

let lat = 4.597475;
let lng = -74.074455

var map = L.map('map').setView([lat + 0.0005, lng -0.0005], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var iconn = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
})

const marker = L.marker([lat, lng], {icon: iconn}).addTo(map);

L.control.zoom({ position: 'bottomright'}).addTo(map);

async function fetchData() {
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${input.value}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

function render(data) {
    ipa.textContent = data.ip;
    location1.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    timezone.textContent = `UTC${data.location.timezone}`;
    isp.textContent = data.isp;
    map.setView([data.location.lat + 0.0005, data.location.lng - 0.0005]);
    marker.setLatLng([data.location.lat, data.location.lng]);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    fetchData().then(data => render(data))
})

