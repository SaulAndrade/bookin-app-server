import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import { AuthContextProvider } from './context/auth-context';
import { FeedbackContextProvider } from './context/feedback-context';
import { InfoContextProvider } from './context/info-context'

import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <AuthContextProvider>
            <FeedbackContextProvider>
                <InfoContextProvider>
                    <App />
                </InfoContextProvider>
            </FeedbackContextProvider>
        </AuthContextProvider>
    </BrowserRouter>,
document.getElementById('root')
);
