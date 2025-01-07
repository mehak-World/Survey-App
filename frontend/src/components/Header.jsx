import React from 'react'

const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Survey Builder App</a>
   
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Create Survey</a>
        </li>
        
      </ul>
     
     <div>
        <button className = "btn btn-primary" style = {{marginRight: "10px"}}>Signup</button>

        <button className = "btn btn-primary">Login</button>
     </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header
