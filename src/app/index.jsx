import * as React from 'react';
import {createRoot} from 'react-dom/client';
import App from "./App";

function render() {
    const domNode = document.getElementById('root');
    const root = createRoot(domNode);
    root.render(<App/>);
}

render();