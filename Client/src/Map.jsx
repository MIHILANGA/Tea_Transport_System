import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

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
  const markers = new Map(); // Maintain a mapping between Firebase references and markers

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
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      const database = getDatabase(app);

      const locationRefs = [
        ref(database, 'live_position0'),
        ref(database, 'live_position1'),
        ref(database, 'live_position2'),
        ref(database, 'live_position3'),
        ref(database, 'live_position4'),
        ref(database, 'live_position5'),
      ];

      locationRefs.forEach((locationRef, index) => {
        onValue(locationRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const { latitude, longitude } = data;
            const location = new window.google.maps.LatLng(latitude, longitude);

            if (markers.has(locationRef)) {
              // Update the existing marker position
              markers.get(locationRef).setPosition(location);
            } else {
              // Create a new marker if it doesn't exist
              const marker = new window.google.maps.Marker({
                position: location,
                map: map,
                title: 'Live Location',
              });
              markers.set(locationRef, marker);
            }
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

    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-TgmRlan5NTLnoNSOBie9j4XxXzHv200&callback=initMap';
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }
  }, []); // Remove 'locations' from the dependency array

  return <div id="map" style={{ width: '100%', height: '550px' }}></div>;
}

export default GoogleMapsLocation;
