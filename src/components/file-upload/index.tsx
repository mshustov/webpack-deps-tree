import * as React from 'react';
import './file-upload-style.css';

interface FileUploadProps {
    onChange: (e: React.FormEvent) => void;
    // workaround from https://github.com/Microsoft/TypeScript/issues/13618
    children?: React.ReactNode;
}

const FileUpload: React.SFC<FileUploadProps> = props => {
    return (
        <label className="file-upload">
            <input
                className="file-upload__element"
                type="file"
                accept="application/json"
                onChange={props.onChange}
            />
            {props.children}
        </label>
    );
};

export default FileUpload;
