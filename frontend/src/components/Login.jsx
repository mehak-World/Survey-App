import React, {useState} from 'react'

const Login = () => {
    const [isSignUpForm, setIsSignUpForm] = useState(true);

    const handleSwitch = () => {
        setIsSignUpForm(!isSignUpForm);
    }

  return (
    <div>
        <form className = "w-50 mx-auto" style = {{marginTop: "5%"}}>
            <h4>{isSignUpForm ? "Create account" : "Login"}</h4>
            <br />
        {isSignUpForm && <div class="mb-3">
  <label for="email" class="form-label">Email address</label>
  <input type="email" class="form-control" id="email" placeholder="name@example.com" name = "email" />
</div>}
<div class="mb-3">
  <label for="username" class="form-label">{isSignUpForm ? "Username": "Username or email"}</label>
  <input type="text" class="form-control" id="username" name = "username"/>
</div>

<div class="mb-3">
  <label for="password" class="form-label">Password</label>
  <input type="password" class="form-control" id="password" name = "password"/>
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
