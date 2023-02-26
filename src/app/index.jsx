import * as React from 'react';
import {createRoot} from 'react-dom/client';

function render() {

    const domNode = document.getElementById('root');
    const root = createRoot(domNode);
    root.render(<h1>Hello World!</h1>);
}

render();