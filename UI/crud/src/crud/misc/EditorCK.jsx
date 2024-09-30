import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

export default function EditorCK() {
    const [editorContent, setEditorContent] = useState('');

    // Handle content change
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();  // Get the HTML content
        setEditorContent(data);         // Store the content in state
        console.log("HTML Content:", data);

        // If you want plain text:
        const plainText = editor.editing.view.document.getRoot().getChild(0).data;
        console.log("Plain Text Content:", plainText);
    };

    return (
        <div className="App">
            <CKEditor
                editor={ClassicEditor}
                data="<p>Type something here!</p>"
                onChange={handleEditorChange}
                config={{
                    enterMode: 2, // CKEDITOR.ENTER_BR (inserts <br> on Enter)
                    //shiftEnterMode: 1, // CKEDITOR.ENTER_P (default, creates <p> on Shift+Enter)
                }}
            />
            {/* Display HTML Content */}
            <h3>Editor Content:</h3>
            <div>{editorContent}</div>
        </div>
    );
}
