import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

import logo from "../../assets/logo.svg";

import "./footer.scss";

export default function Footer(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const scroll = (e) => {
        if (location.pathname !== "/") navigate("/");
        setTimeout(() => {
            if (window.innerWidth < 750)
                document.getElementById("nav").style.transform = "translateY(-100%)";
            const sh = document.getElementsByClassName("App")[0].scrollHeight;
            props.setScroll((sh / 7) * e + 20);
        }, 100);
    };
    return (
        <div className="footer">
            <div className="top">
                <div className="logo">
                    <div className="left">
                        <img src={logo} alt="logo" />
                        <div className="headding">
                            <span>CAPITAL REGISTER OF</span>
                            <span id="bold">SHIPPING</span>
                        </div>
                    </div>
                </div>
                <div className="sm">
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
                <div className="links">
                    <div onClick={() => scroll(1)} className="navItem">
                        ABOUT
                    </div>
                    <div onClick={() => scroll(2)} className="navItem">
                        SERVICES
                    </div>
                    <div onClick={() => scroll(3)} className="navItem">
                        BLOGS
                    </div>
                    <div onClick={() => scroll(4)} className="navItem">
                        PUBLICATIONS
                    </div>
                    <div onClick={() => scroll(5)} className="navItem">
                        CAREER
                    </div>
                    <div onClick={() => scroll(6)} className="lastnitem">
                        CONTACT
                    </div>
                </div>
            </div>
            <div className="bottom" style={{
                display: "flex",
                height: "50%",
                padding: "2rem"
            }}>
                <div className="tandc">
                    <div>Terms of use</div>
                    <div className="last">Privacy policy</div>
                </div>
                <div className="add">
                    <div>
                        Technical Office:A5,Heavenly Plaza
                        Civil Line Road,vazhakkala,Kochi
                        Ernakulam,Kerala,India 682030
                    </div>
                    <div>
                        Corporate Office:
                        25087 Westheimer Parkway
                        Katy,Texas 77494,USA
                    </div>
                </div>
            </div>
        </div>
    );
}