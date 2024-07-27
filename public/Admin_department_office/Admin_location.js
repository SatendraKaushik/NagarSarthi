
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const coordinates = [pos.coords.latitude, pos.coords.longitude];
                fetchLocationDetails(coordinates);
            },
            error => console.error('Error getting location:', error)
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function fetchLocationDetails(coordinates) {
    // Replace 'YOUR_OPENCAGE_API_KEY' with your actual OpenCage API key
    const apiKey = 'dbf5cac2f04c479c8c514f6567eedef3';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${coordinates[0]}+${coordinates[1]}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.results[0].components.city;
            const country = data.results[0].components.country;
            const locationText = document.getElementById('location-text');
            locationText.textContent = `Your current location: ${city}, ${country}`;
       
        })
        .catch(error => console.error('Error fetching location details:', error));
}

window.addEventListener('load', getLocation);
