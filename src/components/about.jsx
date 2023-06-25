import React from "react";
import { useFetchContent } from "../hooks/fetch.hook";

import "./style.scss";

export default function About(props) {
  const title = useFetchContent("About-headding");
  const des = useFetchContent("About-des");
  // const style = styleConverter(apiData?.props);
  return (
    <div className="about">
      {/* <div className="left">
        <img src={(img && img[0]?.apiData?.content) || background} alt="about-img" />
      </div>*/}
      <div className="righ">
        <h1>
          {title && title[0]?.apiData?.content}
        </h1>
        <p>
          {des && des[0]?.apiData?.content}
        </p>
      </div>
    </div>
  );
}