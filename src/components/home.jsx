import React, { useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import "./style.scss";
import loading from "../assets/loading.gif";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Home(props) {
  const url = `/get-documents?image=1&limit=5`;
  const [{ isLoading, apiData }] = useFetchDoc(url);
  const scrollHandler = (direction = 1) => {
    try {
      if (!isLoading && apiData) {
        let max = document.getElementById("homec-container")?.scrollLeftMax;
        let left = document.getElementById("homec-container")?.scrollLeft;
        let width = document.getElementById("homec-container")?.scrollWidth;
        if (left >= max) {
          document.getElementById("homec-container").scrollLeft = 0;
        } else {
          document.getElementById("homec-container").scrollLeft +=
            (width / apiData.length) * direction;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    document.getElementsByClassName("App")[0].classList.add("App-scrl");
    let interval = setInterval(scrollHandler, 4000);

    return () => {
      clearInterval(interval);
    }
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
                  <div className="left-btn" onClick={() => scrollHandler(-1)}>
                    <ArrowBackIosIcon sx={{
                      fontSize: "4rem",
                      color: "white"
                    }}/>
                  </div>
                  <img src={item?.image} alt="" />
                  <div className="right-btn" onClick={() => scrollHandler()}>
                    <ArrowForwardIosIcon sx={{
                      fontSize: "4rem",
                      color: "white"
                    }}/>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
