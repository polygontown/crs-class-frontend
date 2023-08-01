import React, { useEffect } from "react";


import "./style.scss";
import loading from "../assets/loading.gif";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Home(props) {
  const url = `/get-documents?image=1&limit=5`;
  const [{ isLoading, apiData }] = useFetchDoc(url);
  useEffect(() => {
    document.getElementsByClassName("App")[0].classList.add("App-scrl");
    const intarval = setInterval(() => {
      try {
        if (!isLoading && apiData) {
          let max = document.getElementById("homec-container")?.scrollLeftMax;
          let left = document.getElementById("homec-container")?.scrollLeft;
          let width = document.getElementById("homec-container")?.scrollWidth;
          if (left >= max) {
            document.getElementById("homec-container").scrollLeft = 0;
          } else {
            document.getElementById("homec-container").scrollLeft +=
              width / apiData.length;
          }
        }
      } catch (error) {
        clearInterval(intarval);
      }
    }, 4000);
  });
  return (
    <div className="home-container">
      {isLoading ? (
        <div className="homec">
          <div
            style={{
              display: "grid",
              height: "100%",
              width: "100%",
              placeItems: "center",
            }}
            className="loading-body"
          >
            <img
              style={{
                mixBlendMode: "color-burn",
              }}
              src={loading}
              alt="home"
            />
          </div>
        </div>
      ) : (
        <div className="homec" id="homec-container">
          {apiData?.map(
            (item, index) =>
              item.image && (
                <div key={index} className="image-container">
                  <img src={item?.image} alt="" />
                </div>
              )
          )}
        </div>
      )}
      <div className="cover">
        {/* <div className="buttons-container">
          <a
            href="https://crsclass-esims.floatsys.com/CRSClass/Account/Signin.aspx"
            target="_blank"
            rel="noreferrer"
          >
            <button style={style}>Certificate verification</button>
          </a>
          <a
            href="https://crsclass-esims.floatsys.com/crsclass/frmCreateSurveyRequest.aspx"
            target="_blank"
            rel="noreferrer"
          >
            <button style={style}>Classification request</button>
          </a>
        </div> */}
      </div>
    </div>
  );
}
