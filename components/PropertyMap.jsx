"use client";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
import "mapbox-gl/dist/mapbox-gl.css";
const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        //check geocode results
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        // console.log(lat, lng);
        setLat(lat);
        setLng(lng);
        setViewPort({
          ...viewPort,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.error(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No Location Data Found!</div>;

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: viewPort.zoom,
          width: viewPort.width,
          height: viewPort.height,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={lat} longitude={lng} anchor="bottom">
          <Image src={pin} alt="property pin" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
