import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "./test.scss";

export default function Test() {
    return (
        <main style={{ height: "100svh", width: "100vw" }}>
            <MapContainer center={[9.648073, 76.322920]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
                />
                <Marker position={[9.648073, 76.322920]}>
                    <Popup>
                        Popup
                    </Popup>
                </Marker>
            </MapContainer>
        </main>
    );
}