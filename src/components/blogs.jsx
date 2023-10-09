import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./style.scss";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Blogs(props) {
  const [{ apiData }] = useFetchDoc("/get-documents?dname=blogs&limit=4&doc=0");
  const navigate = useNavigate();
  return (
    <div className="services">
      <h2>BLOGS</h2>
      <div className="box">
        {apiData?.map((item, index) => (
          <div key={index} className="service">
            <div className="top">
              <img src={item.image} alt="Service cover" />
            </div>
            <div className="bottom">
              <div className="one">
                <h3>{item.title}</h3>
                <p>{item.date}</p>
              </div>
              <div className="two">
                <button
                 onClick={() => navigate(`/view-user/blogs/${item._id}`)}
                  type="button"
                  className="learn-more"
                  >
                    Read more <ArrowForwardIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div onClick={() => navigate("/blogs")} className="more" style={{
        display: "flex",
        height: "3rem",
        width: "8rem",
        marginTop: "1rem",
        borderRadius: "0.5rem",
        color: "black",
        boxShadow: "0 0 10px black",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffffcc"
      }}>
        {"more"}
      </div>
    </div>
  );
}
