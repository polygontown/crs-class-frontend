import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useFetchContent } from "../../hooks/fetch.hook";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import { setContent, updateContent } from "../../helper/helper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditAddresses() {
    const address1 = useFetchContent("Office-address-1");
    const address2 = useFetchContent("Office-address-2");
    const isLoading = address1[0]?.isLoading && address2[0]?.isLoading;
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();

        let res1, res2;
        if (address1[0].apiData) {
            res1 = updateContent({
                cname: "Office-address-1",
                content: document.getElementById("office-address-1").value,
            });
        } else {
            res1 = setContent({
                cname: "Office-address-1",
                content: document.getElementById("office-address-1").value,
            });
        }

        if (address2[0].apiData) {
         res1 = updateContent({
             cname: "Office-address-2",
             content: document.getElementById("office-address-2").value,
         });
     } else {
         res1 = setContent({
             cname: "Office-address-2",
             content: document.getElementById("office-address-2").value,
         });
     }

        const res = Promise.all([res1, res2]);
        toast.promise(res, {
            loading: "Creating...",
            success: <b>Created successfully...!</b>,
            error: <b>Could not create!</b>,
        });
    };

    useEffect(() => {
        if (!isLoading) {
            document.getElementById("office-address-1").value = address1[0].apiData?.content;
            document.getElementById("office-address-2").value = address2[0].apiData?.content;
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
                        <h2>EDIT OFFICE ADDRESSES</h2>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="office-address-1" id="lb">
                            Technical Office:
                            </label>
                            <textarea id="office-address-1"></textarea>
                            <label htmlFor="office-address-2" id="lb">
                            Corporate Office:
                            </label>
                            <textarea id="office-address-2"></textarea>
                            <button type="submit">UPDATE</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}