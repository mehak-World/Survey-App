import React, {useState} from 'react'
import axios from 'axios';
import {setAuthHeader} from '../utils/BackendUtils';

const Login = () => {
    const [isSignUpForm, setIsSignUpForm] = useState(true);

    const handleSwitch = () => {
        setIsSignUpForm(!isSignUpForm);
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function requestLogin(e) {
      e.preventDefault()
      axios.post('http://localhost:8080/login', {
        'login': username,
        'password': password
        /*
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'login': username, 'password': password})
        */
          
      }).then(response => {
        console.log(response)
        if (response.status == 200) {
            return response.data;

        } else {
            return null;
        }
      }).then(data => {
        console.log(data)
        if (data !== null) {
            setAuthHeader(data["token"]);
        } else {
            setAuthHeader(null);
        }
      })
      return
    }

  return (
    <div>
        <form className = "w-50 mx-auto" style = {{marginTop: "5%"}} onSubmit={requestLogin}>
            <h4>{isSignUpForm ? "Create account" : "Login"}</h4>
            <br />
        {isSignUpForm && <div class="mb-3">
  <label for="email" class="form-label">Email address</label>
  <input type="email" class="form-control" id="email" placeholder="name@example.com" name = "email" />
</div>}
<div class="mb-3">
  <label for="username" class="form-label" >{isSignUpForm ? "Username": "Username or email"}</label>
  <input type="text" class="form-control" id="username" name = "username" onChange={(e) => setUsername(e.target.value)}/>
</div>

<div class="mb-3">
  <label for="password" class="form-label">Password</label>
  <input type="password" class="form-control" id="password" name = "password" onChange={(e) => setPassword(e.target.value)}/>
</div>
    
    <button class = "btn btn-primary">{isSignUpForm ? "Create account" : "Login"}</button>
<br />
<br />
    <p><small>{isSignUpForm ? "If account already exists, " : "If you are a new user, "} <span style = {{color: "blue", cursor: "pointer"}} onClick = {handleSwitch}>{isSignUpForm ? "Login" : "Signup"}</span> here</small></p>
        </form>
    </div>
  )
}

export default Login
