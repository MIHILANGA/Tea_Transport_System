import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import customMarkerIcon from './bus.png';

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
  let marker = null;

  const [locations, setLocations] = useState([]);

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

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location');
            infoWindow.open(map);
            map.setCenter(pos);

            if (!marker) {
              marker = new window.google.maps.Marker({
                position: pos,
                map: map,
                title: 'Live Location',
                icon: {
                  url: customMarkerIcon,
                  scaledSize: new window.google.maps.Size(50, 50),
                },
              });
            }

            navigator.geolocation.watchPosition(
              (newPosition) => {
                const { latitude, longitude } = newPosition.coords;
                const newPos = new window.google.maps.LatLng(latitude, longitude);

                marker.setPosition(newPos);
                map.panTo(newPos);

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
        handleLocationError(false, infoWindow, map.getCenter());
      }

      const database = getDatabase(app);

      const locationRefs = [ref(database, 'live_position0')];

      locationRefs.forEach((locationRef) => {
        onValue(locationRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const { latitude, longitude } = data;
            const newPos = new window.google.maps.LatLng(latitude, longitude);

            marker.setPosition(newPos);
            map.panTo(newPos);

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
    if (window.google) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, []); 

  return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
}

export default GoogleMapsLocation;
