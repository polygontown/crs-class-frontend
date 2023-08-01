import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfViewerComponent from "./PdfViewerComponent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./style.scss";

export default function Test(props) {
    const [view, setView] = useState(false);
    console.log();
    useEffect(() => {
        axios.get(`https://crsclass.com/v1/api/api/get-documents?dname=files&doc=1&docId=${props.view._id}`)
            .then(res => {
                setView(res.data[0].document);
            })
            .catch(error => {
                console.log(error);
            })
    });
    return (
        <div className="pdf-container">
            <div className="top-bar">
                <button className="back-button" onClick={() => props.setView(false)}><ArrowBackIcon />Back</button>
            </div>
            <div className="pdf-body">
            {view && <PdfViewerComponent file={view} />}
            </div>
        </div>
    );
}