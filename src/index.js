import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAca6TiRAz2-a6gQSYO5XaElFZ_W0zdRFo",
  authDomain: "evernote-36c15.firebaseapp.com",
  databaseURL: "https://evernote-36c15.firebaseio.com",
  projectId: "evernote-36c15",
  storageBucket: "evernote-36c15.appspot.com",
  messagingSenderId: "537832983579",
  appId: "1:537832983579:web:9ca1e4d53d38bc7f863cbe",
  measurementId: "G-DCTPBCCWP8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
