import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FileUpload from './components/file-upload/';
import run from './client';

import './styles/reset.css';
import './styles/common.css';
import './init-style.css';

function onLoad(e: React.FormEvent) {
    var fileReader = new FileReader();
    var file = (e.target as HTMLInputElement).files[0];

    fileReader.readAsText(file);
    fileReader.onload  = function() {
        var data = fileReader.result;
        run(JSON.parse(data));
    };
}

ReactDOM.render(
    <div className="bootstrap-upload">
        <FileUpload onChange={onLoad}>
            Select stats.json
        </FileUpload>
    </div>,
    document.getElementById('root')
);
