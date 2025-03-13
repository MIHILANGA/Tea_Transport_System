import React, { useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import image from './van.png';

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
  let map, infoWindow, marker;

  useEffect(() => {
    const initMap = () => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
      });
      infoWindow = new window.google.maps.InfoWindow();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            const pos = {
              lat: latitude,
              lng: longitude,
            };

            map.setCenter(pos);

            const customMarkerIcon = {
              url: image,
              scaledSize: new window.google.maps.Size(33, 32),
            };

            marker = new window.google.maps.Marker({
              position: pos,
              map: map,
              icon: customMarkerIcon,
            });

            const database = getDatabase(app);
            const livePositionRef = ref(database, 'live_position1');

            // Initially, set the user's location in Firebase
            set(livePositionRef, { latitude, longitude });

            // Start watching the user's location and updating Firebase as they move
            navigator.geolocation.watchPosition(
              (position) => {
                const { latitude, longitude } = position.coords;

                const newPos = {
                  lat: latitude,
                  lng: longitude,
                };

                map.setCenter(newPos);
                marker.setPosition(newPos);

                // Update the user's location in Firebase
                set(livePositionRef, { latitude, longitude });
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
        handleLocationError(false, infoWindow, map.getCenter());
      }
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
  }, []);

  return <div id="map" style={{ width: '100%', height: '800px' }}></div>;
}

export default GoogleMapsLocation;
