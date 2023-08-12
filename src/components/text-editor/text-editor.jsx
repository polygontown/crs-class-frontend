import React, { useState, useEffect, useMemo } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import htmlToDraft from 'html-to-draftjs';

import "./style.scss";

export default function TextEditor(props) {
    console.log(props.data);
    const [state, setState] = useState({
        editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML("")
            )
        ),
    });
    // const [data, setData] = useState("");
    const onEditorStateChange = (editorState) => {
        setState({
            editorState,
        });
    };
    const { editorState } = state;
    useEffect(() => {
        props.setData(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        // console.log(htmlToDraft(data));
    }, [editorState, props, props.data]);
    useMemo(() => {
        setState({
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(props.initial)
                )
            ),
        });
    },[props.initial]);
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