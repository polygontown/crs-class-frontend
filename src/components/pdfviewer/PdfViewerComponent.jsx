import React from 'react'

import PDFViewer from 'pdf-viewer-reactjs'

const ExamplePDFViewer = (props) => {
    return (
        <PDFViewer
            document={{
                url: props.file,
            }}
        />
    )
}

export default ExamplePDFViewer