import { useGoogleApi  } from "gapi-script"
import { useState } from "react";

var scope = 'https://www.googleapis.com/auth/drive.file';
var discoveryURL = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const InitClient = () => {
    var [googleAuth, setGoogleAuth] = useState('')

    // gapi.load('client:auth2', () => {
    //     gapi.client.init({
    //         'apiKey': "AIzaSyCi4M8J0r8F_gHHYutGEfjM1P_ysffoOiQ,",
    //         "clientId": "924479061507-pes35pg1d87ksr0l1e1auhvfjj7uu7fr.apps.googleusercontent.com",
    //         "scope": scope,
    //         "discoveryDocs": [discoveryURL]
    //     }).then(() => {
    //         gapi.auth2.signin();
    //     });
    // })
}

export default InitClient
