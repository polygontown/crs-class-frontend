import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "./style.scss";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Contact(props) {
  const [{ apiData }] = useFetchDoc("/get-documents?dname=contacts");
  let poses = [];
  if (apiData) {
    poses = apiData?.map((item) => ({
      pos: [
        item.document.split(";lat:")[1].split(";lon:")[0],
        item.document.split(";lon:")[1].split(";")[0],
      ],
      phone: item.document.split(";ph:")[1].split(";mail:")[0],
      email: item.document.split(";mail:")[1].split(";lat:")[0],
      add: item.title //document.split("add:")[1].split(";ph")[0]
    }));
  }
  const position = [20, 20];
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor:   [12, 41]
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  return (
    <div className="contact">
      <h1>CONTACT US</h1>
      <div className="map">
        <div className="map-container">
          <MapContainer
            center={position}
            zoom={2.6}
            scrollWheelZoom={false}
          >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
             />
            {poses?.map((position, index) => (
              <Marker key={index} position={position.pos}>
                <Popup>
                  <h4 style={{ textDecoration: "underline" }}>
                    {position.add}
                  </h4>
                  <div className="ph crd">
                    <h6>Phone: </h6>
                    <a href={`tel:${position.phone}`} target="_blank" rel="noreferrer">
                      {position.phone}
                    </a>
                  </div>
                  <div className="mail crd">
                    <h6>Email: </h6>
                    <a href={`mailto:${position.email}`} target="_blank" rel="noreferrer">
                      {position.email}
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      {/* <div className="adds">
        {apiData?.map((item, index) => (
          <div key={index} className="add-container">
            <h5 className="title">
              {item.title}
            </h5>
            <h5 className="rest">Address:</h5>
            <div style={{
              wordWrap: "break-word",
              fontSize: "80%"
            }}>
              {item.document.split("add:")[1].split(";ph:")[0]}
            </div>
            <div className="ph-mail">
              <div className="ph">
                <h5>Phone:</h5>
                <div>
                <a href={`tel:${item.document.split(";ph:")[1].split(";mail:")[0]}`} target="_blank" rel="noreferrer">
                  {item.document.split(";ph:")[1].split(";mail:")[0]}
                  </a>
                </div>
              </div>
              <div className="mail">
                <h5>Email</h5>
                <div>
                <a href={`mailto:${item.document.split(";mail:")[1].split(";lat:")[0]}`} target="_blank" rel="noreferrer">
                  {item.document.split(";mail:")[1].split(";lat:")[0]}
                </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}


//

//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png