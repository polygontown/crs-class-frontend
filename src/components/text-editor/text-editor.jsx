import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import htmlToDraft from 'html-to-draftjs';

import "./style.scss";

export default function TextEditor(props) {
    const [state, setState] = useState({
        editorState: EditorState.createEmpty()
    });
    const [data, setData] = useState("");
    const onEditorStateChange = (editorState) => {
        setState({
            editorState,
        });
    };
    const { editorState } = state;
    useEffect(() => {
        setData(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        console.log(data);
    },[editorState,data]);
    return (
        <div className="text-editor">
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );
}