import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useFetchContent } from "../../hooks/fetch.hook";
import { convertToBase64 } from "../../helper/convert";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import { setContent, updateContent } from "../../helper/helper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditTOU(props) {
    const [img, setImg] = useState(null);
    const headding = useFetchContent("tou-headding");
    const description = useFetchContent("tou-des");
    const abtImg = useFetchContent("tou-img");

    const navigate = useNavigate();

    const isLoading = abtImg[0]?.isLoading;
    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setImg(base64);
    };
    const submitHandler = (e) => {
        e.preventDefault();

        let res1, res2, res3;
        if (headding[0].apiData) {
            res1 = updateContent({
                cname: "About-headding",
                content: document.getElementById("title").value,
            });
        } else {
            res1 = setContent({
                cname: "About-headding",
                content: document.getElementById("title").value,
            });
        }
        if (description[0].apiData) {
            res2 = updateContent({
                cname: "About-des",
                content: document.getElementById("des").value,
            });
        } else {
            res2 = setContent({
                cname: "About-des",
                content: document.getElementById("des").value,
            });
        }

        if (abtImg[0].apiData) {
            res3 = updateContent({
                cname: "About-img",
                content: img || (abtImg && abtImg[0]?.apiData?.content) || "",
            });
        } else {
            res3 = setContent({
                cname: "About-img",
                content: img || (abtImg && abtImg[0]?.apiData?.content) || "",
            });
        }

        const res = Promise.all([res1, res2, res3]);
        toast.promise(res, {
            loading: "Creating...",
            success: <b>Created successfully...!</b>,
            error: <b>Could not create!</b>,
        });
    };

    useEffect(() => {
        if (!isLoading) {
            document.getElementById("title").value = headding[0].apiData?.content;
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
                        <h2>EDIT ABOUT</h2>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="about-image" id="ll" style={{ display: "none" }}>
                                <img
                                    src={img || (abtImg && abtImg[0]?.apiData?.content) || logo}
                                    alt=""
                                />
                            </label>
                            <input onChange={onUpload} type="file" id="about-image" />
                            <label htmlFor="title" id="lb">
                                ABOUT TITLE:
                            </label>
                            <input type="text" id="title" />
                            <label htmlFor="des" id="lb">
                                ABOUT DESCRIPTION:
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