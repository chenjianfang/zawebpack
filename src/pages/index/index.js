import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css'
import Welcome from './src/welcome';

const RenderApp = process.env.NODE_ENV === 'development' ? hot(Welcome) : Welcome;


ReactDOM.render(
    <RenderApp />,
    document.querySelector('#app')
)


