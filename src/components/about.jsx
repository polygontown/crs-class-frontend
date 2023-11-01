import React from "react";
import { useFetchContent } from "../hooks/fetch.hook";

import "./style.scss";

export default function About(props) {
  const title = useFetchContent("About-headding");
  const des = useFetchContent("About-des");
  const vision = useFetchContent("vision-des");
  const mission = useFetchContent("mission-des");
  // const style = styleConverter(apiData?.props);
  const style = {
    height: "100%",
    width: "100%",
    borderRadius: "1rem",
    backgroundColor: "#4444dd",
    color: "white",
  };
  return (
    <div className="about" style={{ flexDirection: "column", gap: "0.5rem " }}>
      {/* <div className="left">
        <img src={(img && img[0]?.apiData?.content) || background} alt="about-img" />
      </div>*/}
      <div className="buttons-container" style={{
        display: "flex",
        width: "100%",
        height: "3rem",
        justifyContent: "space-around"
      }}>
        <a
          href="https://crsclass-esims.floatsys.com/CRSClass/Account/Signin.aspx"
          target="_blank"
          rel="noreferrer"
          style={{
            width: "10rem",
          }}
        >
          <button style={style}>Certificate verification</button>
        </a>
        <a
          href="https://crsclass-esims.floatsys.com/crsclass/frmCreateSurveyRequest.aspx"
          target="_blank"
          rel="noreferrer"
          style={{
            width: "10rem",
          }}
        >
          <button style={style}>Classification request</button>
        </a>
      </div>

      <div className="righ">
        <h1 style={{
          fontWeight: "bold"
        }}>
          {title && title[0]?.apiData?.content}
        </h1>
        <p>
          {des && des[0]?.apiData?.content}
        </p>
      </div>
      <div className="vis-mis">
        <div className="vis" style={{
          backgroundColor: "#ffffffdd",
          borderRadius: "1rem",
          padding: "0.5rem",
          boxShadow: "0 0 10px black",
          color: "black"
        }}>
          <h2 style={{
            fontWeight: "bold"
          }}>Our Vision</h2>
          <p dangerouslySetInnerHTML={{ __html: vision[0]?.apiData?.content }}></p>
        </div>
        <div className="mis" style={{
          backgroundColor: "#ffffffdd",
          borderRadius: "1rem",
          padding: "0.5rem",
          boxShadow: "0 0 10px black",
          color: "black"
        }}>
          <h2 style={{
            fontWeight: "bold"
          }}>Our Mission</h2>
          <p dangerouslySetInnerHTML={{ __html: mission[0]?.apiData?.content }}></p>
        </div>
      </div>
    </div>
  );
}