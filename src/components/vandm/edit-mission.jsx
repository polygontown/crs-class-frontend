import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useFetchContent } from "../../hooks/fetch.hook";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import { setContent, updateContent } from "../../helper/helper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditMission(props) {
    const description = useFetchContent("mission-des");

    const navigate = useNavigate();

    const isLoading = description[0]?.isLoading;
    const submitHandler = (e) => {
        e.preventDefault();

        let res2;
        if (description[0].apiData) {
            res2 = updateContent({
                cname: "mission-des",
                content: document.getElementById("des").value,
            });
        } else {
            res2 = setContent({
                cname: "mission-des",
                content: document.getElementById("des").value,
            });
        }


        const res = Promise.all([res2]);
        toast.promise(res, {
            loading: "Creating...",
            success: <b>Created successfully...!</b>,
            error: <b>Could not create!</b>,
        });
        res.then(() => {
            navigate(-1);
        });
    };

    useEffect(() => {
        if (!isLoading) {
            document.getElementById("des").value = description[0].apiData?.content;
        }
    });
    return (
        <>
            <button onClick={() => navigate(-1)} className="universal-back-button">
                <ArrowBackIcon sx={{ fontSize: "1rem" }} />
                Back
            </button>
            <div className="menu-bar">
                <div className="logo">
                    <img src={logo} alt="logo" style={{ backgroundColor: "white" }} />
                    <div className="headding" style={{
                        color: "white"
                    }}>
                        <span>CAPITAL REGISTER OF</span>
                        <span id="bold">SHIPPING</span>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="edit-webpage">
                {isLoading ? (
                    <div style={{ padding: 0 }} className="loading">
                        <div className="loading-body">
                            <img src={loading} alt="view" />
                        </div>
                    </div>
                ) : (
                    <div className="inner">
                        <h2>EDIT PRIVACY POLICY</h2>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="des" id="lb">
                                PRIVACY POLICY:
                            </label>
                            <textarea id="des"></textarea>
                            <button type="submit">UPDATE</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}