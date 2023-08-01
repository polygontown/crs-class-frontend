import React from 'react'

import PDFViewer from 'pdf-viewer-reactjs'

const ExamplePDFViewer = (props) => {
    console.log(props.file.split("base64,")[1]);
    return (
        <PDFViewer
            document={{
                // url: props.file,
                base64: props.file.split("base64,")[1],
            }}
            hideNavbar
            scale={1}
            page={1}
        />
    )
}

export default ExamplePDFViewer