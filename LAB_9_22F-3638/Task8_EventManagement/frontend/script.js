const apiUrl = "http://localhost:3000/api";

let map, marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.3753, lng: 69.3451 }, // Pakistan's default location
    zoom: 5
  });

  map.addListener("click", (event) => {
    const { lat, lng } = event.latLng.toJSON();
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lng;

    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({ position: event.latLng, map });
  });
}

document.getElementById("eventForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const eventData = {
    eventName: document.getElementById("eventName").value,
    organizerName: document.getElementById("organizerName").value,
    eventDate: document.getElementById("eventDate").value,
    latitude: document.getElementById("latitude").value,
    longitude: document.getElementById("longitude").value,
  };

  if (!eventData.latitude || !eventData.longitude) {
    document.getElementById("alertContainer").innerHTML =
      '<div class="alert alert-danger">Please select a location on the map.</div>';
    return;
  }

  const response = await fetch(`${apiUrl}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById("alertContainer").innerHTML =
      `<div class="alert alert-success">Event Registered! ID: ${data.eventId}</div>`;
  } else {
    document.getElementById("alertContainer").innerHTML =
      `<div class="alert alert-danger">Error: ${data.error}</div>`;
  }
});
