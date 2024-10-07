import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default function WYSIWYG() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    // Handle keyboard shortcuts for bold, italics, etc.
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    return (
        <div style={{ border: '1px solid black', padding: '10px' }}>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                placeholder="Write something..."
            />
        </div>
    );
}