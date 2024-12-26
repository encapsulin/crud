// import { CKEditor, Enter, Essentials, Paragraph, HeadingEditing } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect } from 'react';

export default function MyEditor({ children, callbackModified, editable }) {
    console.log(editable)
    const CKEditor = editable ? require('@ckeditor/ckeditor5-react').CKEditor : null;
    const ClassicEditor = editable ? require('@ckeditor/ckeditor5-build-classic') : null;

    const [editorContent, setEditorContent] = useState(children);
    useEffect(() => {
        setEditorContent(children);
    }, [children]);  // Re-run effect when `initialContent` changes

    useEffect(() => { callbackModified(editorContent) }, [editorContent])

    // Handle content change
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();  // Get the HTML content
        setEditorContent(data);         // Store the content in state
        console.log("HTML Content:", data);

        // const plainText = editor.editing.view.document.getRoot().getChild(0).data;
        // console.log("Plain Text Content:", plainText);
    };

    return (
        <div className="App">
            {editable && CKEditor ? (
                <CKEditor
                    editor={ClassicEditor}
                    data={editorContent}
                    onChange={handleEditorChange}
                    config={{
                        enterMode: 20,
                    }}
                />

            ) : (
                <div dangerouslySetInnerHTML={{ __html: editorContent }} />)}
        </div>
    );
}
