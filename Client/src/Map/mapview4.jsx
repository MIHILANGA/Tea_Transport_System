import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import customMarkerIcon from './car.png'; // Import your custom marker icon image

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyCxFh-6KQdS7XIjdXGwx8zBVCGfxEX1XpM",
  authDomain: "kdusc-tms.firebaseapp.com",
  projectId: "kdusc-tms",
  storageBucket: "kdusc-tms.appspot.com",
  messagingSenderId: "736907996857",
  appId: "1:736907996857:web:d408134ecb09918cdd7568",
  measurementId: "G-V65DMFCN3R"
};

const app = initializeApp(firebaseConfig);

function GoogleMapsLocation() {
  let map, infoWindow;
  let marker = null; // Single marker instance

  const [locations, setLocations] = useState([]); // State to hold location data

  useEffect(() => {
    const initMap = () => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
      });
      infoWindow = new window.google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const pos = {
              lat: latitude,
              lng: longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location');
            infoWindow.open(map);
            map.setCenter(pos);

            // Create a marker for the user's location if it doesn't exist
            if (!marker) {
              marker = new window.google.maps.Marker({
                position: pos,
                map: map,
                title: 'Live Location',
                icon: {
                  url: customMarkerIcon, // Use the custom icon
                  scaledSize: new window.google.maps.Size(50, 50), // Adjust the size as needed
                },
              });
            }

            // Watch for location changes and update the marker
            navigator.geolocation.watchPosition(
              (newPosition) => {
                const { latitude, longitude } = newPosition.coords;
                const newPos = new window.google.maps.LatLng(latitude, longitude);

                marker.setPosition(newPos);
                map.panTo(newPos);

                // Update the state if needed
                setLocations((prevLocations) => [...prevLocations, newPos]);
              },
              (error) => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      // Retrieve location data from Firebase Realtime Database for multiple locations
      const database = getDatabase(app); // Pass the Firebase app instance

      // Example database references for multiple locations
      const locationRefs = [
        ref(database, 'live_position4'),
      ];

      // Use the 'onValue' listener for each location reference
      locationRefs.forEach((locationRef) => {
        onValue(locationRef, (snapshot) => {
          const data = snapshot.val(); // Get the data from the snapshot
          if (data) {
            const { latitude, longitude } = data;
            const newPos = new window.google.maps.LatLng(latitude, longitude);

            // Update the position of the existing marker
            marker.setPosition(newPos);
            map.panTo(newPos);

            // Update the locations state with the new data
            setLocations((prevLocations) => [...prevLocations, newPos]);
          }
        });
      });
    };

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    // Check if the Google Maps API script is already loaded
    if (!window.google) {
      // If not, load it dynamically
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-TgmRlan5NTLnoNSOBie9j4XxXzHv200&callback=initMap';
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      // Define the initMap function as a global function
      window.initMap = initMap;
    } else {
      // If the Google Maps API script is already loaded, directly call initMap
      initMap();
    }
  }, []); // Remove 'locations' from the dependency array

  return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
}

export default GoogleMapsLocation;
