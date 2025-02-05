import React, {useState} from 'react'
import axios from 'axios';
import {getAuthToken} from '../utils/BackendUtils';
import { serverUrl } from '../utils/BackendUtils';
import { data } from 'react-router-dom';

const GetForm = () => {

    async function requestGreeting() {
        axios.get('http://localhost:8080/user/greet', {
            headers: {
                'Authorization': getAuthToken(),
                //'Green' : 'Eggs and ham'
            }
        })
        .then(response => {
            console.log(response);
        });
    }

    function getForm() {
        axios.get(serverUrl + "user/get_form_by_id/677f058631549c0f4378ed4c", {
            headers: {
                'Authorization': getAuthToken(),
                //'Green' : 'Eggs and ham'
            }
        })//"/get_form_by_id/677f058631549c0f4378ed4c")
        .then(response => {
            console.log(response);
            return response.data;
        })
        .then(data => {
            console.log(data);
        })
    }

    return(
        <button onClick={getForm}></button>
    );
}

export default GetForm