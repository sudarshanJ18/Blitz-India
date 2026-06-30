import React, { useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange, modules, formats }) => {
    const quillRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-quill').then((module) => {
                const ReactQuill = module.default;

                if (!editorRef.current && quillRef.current) {
                    const QuillComponent = () => (
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={onChange}
                            modules={modules}
                            formats={formats}
                            style={{ height: '400px', marginBottom: '50px' }}
                        />
                    );

                    
                    if (React.version.startsWith('18')) {
                        import('react-dom/client').then((ReactDOM) => {
                            const root = ReactDOM.createRoot(quillRef.current);
                            root.render(<QuillComponent />);
                            editorRef.current = root;
                        });
                    }
                }
            });
        }

        return () => {
            if (editorRef.current && editorRef.current.unmount) {
                editorRef.current.unmount();
            }
        };
    }, []);

    return <div ref={quillRef} className="quill-wrapper" />;
};

export default QuillEditor;
