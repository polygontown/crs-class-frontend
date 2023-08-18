import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { useFetchContent } from "../../hooks/fetch.hook";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";

export default function Privacypolicy(props) {
    const navigate = useNavigate();
    const [{ isLoading, apiData }] = useFetchContent("About-des");
    return (
        <>
            <button onClick={() => navigate(-1)} className="universal-back-button">
                <ArrowBackIcon sx={{ fontSize: "1rem" }} />
                Back
            </button>
            <div className="menu-bar">
                <div className="logo">
                    <img src={logo} alt="logo" style={{ backgroundColor: "white" }} />
                    <div className="headding" style={{ color: "white" }}>
                        <span>CAPITAL REGISTER OF</span>
                        <span id="bold">SHIPPING</span>
                    </div>
                </div>
            </div>
            <div className="privacy-policy">
                {isLoading ? (
                    <div style={{ padding: 0 }} className="loading">
                        <div className="loading-body">
                            <img src={loading} alt="view" />
                        </div>
                    </div>
                ) : (
                    <div className="pp-border">
                        <div className="pp-body">
                            <h2>Privacy policy</h2>
                            {apiData?.content}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}