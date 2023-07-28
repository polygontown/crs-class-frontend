import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfViewerComponent from "./PdfViewerComponent";

export default function Test(props) {
    const [view,setView] = useState(false);
    useEffect(() => {
        axios.get(`https://crsclass.com/v1/api/api/get-documents?dname=files&doc=1&docId=64c0a51490f760d0fb95874c`)
        .then(res => {
            setView(res.data[0].document);
        })
        .catch(error => {
            console.log(error);
        })
    });
    return(
    <div style={{ height: "90%", backgroundColor: "blue" }}>
            { view ? <PdfViewerComponent file={view} /> : <button onClick={() => setView(true)}>View</button>}
        </div>
    );
}