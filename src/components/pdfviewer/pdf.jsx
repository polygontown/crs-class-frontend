import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./style.scss";

export default function Test(props) {
    const [view, setView] = useState(false);
    useEffect(() => {
        axios.get(`https://crsclass.com/v1/api/api/get-documents?dname=files&doc=1&docId=${props.view._id}`)
            .then(res => {
                setView(res.data[0].document);
            })
            .catch(error => {
                console.log(error);
            })
    });
    if (view) {
        var byteCharacters = atob(view.split("base64,")[1]);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], { type: 'application/pdf;base64' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        props.setView(false);
    }
    // view && window.open(encodeURI(view));
    return (
        <div className="pdf-container">
            <div className="top-bar">
                <button className="back-button" onClick={() => props.setView(false)}><ArrowBackIcon />Back</button>
            </div>
            <div className="pdf-body">
                <h2>Loading...</h2>
            </div>
        </div>
    );
}