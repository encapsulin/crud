import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditorQuill() {
    const [data, setData] = useState('');
    return <ReactQuill data={data} onChange={setData} />;
}