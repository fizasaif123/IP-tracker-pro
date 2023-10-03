const form=document.querySelector("#searchForm");
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    geo();
    const searchTerm = form.elements.query.value;
    const APIKEY = "at_GYTJbtglwtAMUapZPNCUzL62kOVVP";
    const res = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${APIKEY}&ipAddress=${searchTerm}`);

    // Create a container div to hold the headings and values
    const container = document.createElement('div');

    // Create headings
    const ipHeading = document.createElement('h2');
    ipHeading.textContent = "IP ADDRESS";
    const locationHeading = document.createElement('h2');
    locationHeading.textContent = "LOCATION";
    const timezoneHeading = document.createElement('h2');
    timezoneHeading.textContent = "TIMEZONE";
    const ispHeading = document.createElement('h2');
    ispHeading.textContent = "ISP";

    // Create values
    const ipValue = document.createElement('p');
    ipValue.textContent = res.data.ip;
    const locationValue = document.createElement('p');
    locationValue.textContent = `${res.data.location.region}, ${res.data.location.country}`;
    const timezoneValue = document.createElement('p');
    timezoneValue.textContent = res.data.location.timezone;
    const ispValue = document.createElement('p');
    ispValue.textContent = res.data.isp;

    // Append headings and values to the container
    container.appendChild(ipHeading);
    container.appendChild(ipValue);
    container.appendChild(locationHeading);
    container.appendChild(locationValue);
    container.appendChild(timezoneHeading);
    container.appendChild(timezoneValue);
    container.appendChild(ispHeading);
    container.appendChild(ispValue);

    // Clear previous results if any
    const previousResults = document.getElementById('results');
    if (previousResults) {
        previousResults.remove();
    }

    // Append the container to the document
    container.id = 'results';
    document.body.appendChild(container);
});



  function geo() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>`;
  
        getLocation(lat, long);
      });
    }
  }