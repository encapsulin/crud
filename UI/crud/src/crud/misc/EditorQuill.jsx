import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const EditorQuill = ({ initialContent }) => {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);  // Re-run effect when `initialContent` changes


    const handleChange = (value) => {
        setContent(value);
    };

    return (
        <div>
            <ReactQuill value={content} onChange={handleChange} />
            <p>Editor Content: {content}</p>
        </div>
    );
};

export default EditorQuill;
