import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/myStore';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {LoaderDots} from "@thumbtack/thumbprint-react";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <React.Suspense fallback={<LoaderDots/>}>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.Suspense>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
