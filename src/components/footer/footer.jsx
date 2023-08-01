import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

import logo from "../../assets/logo.svg";

import "./footer.scss";

export default function Footer(props) {
    return (
        <div className="footer" style={{
            height: "60%",
            padding: 0,
            backgroundColor: "red"
        }}>
            <div className="top" style={{
                display: "flex",
                height: "50%",
                padding: "2rem",
                backgroundColor: "blue"
            }}>
                <div className="logo" style={{
                    height: "100%",
                    width: "30%",
                    borderRight: "2px solid gray"
                }}>
                    <div className="left">
                        <img src={logo} alt="logo" />
                        <div className="headding">
                            <span>CAPITAL REGISTER OF</span>
                            <span id="bold">SHIPPING</span>
                        </div>
                    </div>
                </div>
                <div className="sm" style={{
                    height: "100%",
                    width: "20%",
                    borderRight: "2px solid gray"
                }}>
                    <div className="s-media" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <a
                            href="https://www.facebook.com/crsclass"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookIcon sx={{ fontSize: "2.2rem", color: "#4267B2" }} />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/crsclass/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedInIcon sx={{ fontSize: "2.2rem", color: "#0077b5" }} />
                        </a>
                    </div>
                </div>
                <div className="links" style={{
                    height: "100%",
                    width: "50%"
                }}> links</div>
            </div>
            <div className="bottom" style={{
                display: "flex",
                height: "50%",
                padding: "2rem",
                backgroundColor: "green",
            }}>
                <div className="tandc" style={{
                    height: "100%",
                    width: "30%"
                }}>t and c</div>
                <div className="add" style={{
                    height: "100%",
                    width: "70%"
                }}>Addresses</div>
            </div>
        </div>
    );
}