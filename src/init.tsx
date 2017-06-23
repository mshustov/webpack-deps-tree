import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FileUpload from './components/file-upload/';
import Button from './components/button/';

import run from './client';

import './styles/reset.css';
import './styles/common.css';
import './init-style.css';

const exampleStats = require('../examples/sound-redux/stats.json');

function onLoad(e: React.FormEvent) {
    var fileReader = new FileReader();
    var file = (e.target as HTMLInputElement).files[0];

    fileReader.readAsText(file);
    fileReader.onload  = function() {
        var data = fileReader.result;
        run(JSON.parse(data));
    };
}

function runWithExample() {
    run(exampleStats);
}

ReactDOM.render(
    <div className="init-upload">
        <FileUpload onChange={onLoad}>
            Select stats.json
        </FileUpload>
        <div>
            <Button onClick={runWithExample}>
                Or use example
            </Button>
        </div>
    </div>
    ,
    document.getElementById('root')
);
