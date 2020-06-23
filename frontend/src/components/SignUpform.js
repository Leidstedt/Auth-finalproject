import React, { useState  } from 'react'

import { Article } from '../lib/FormStyle'
import { From } from '../lib/FormStyle'
import { Input } from '../lib/FormStyle'




export const SignUpform = () => {
  
  
  const [signUpUser, setsignUpUser] = useState({
      name: '',
      email: '',
      password: ''
  })

  const [error, setError] = useState('')

  // not so good :/ 
  /*const handleRestart = () => {
    window.location.reload(false);
  }*/

  const handleSubmit = event => {
    event.preventDefault()
    
    fetch("https://project-auth-ebba-elin.herokuapp.com/users",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(signUpUser)
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error('Unable to sign up, please try again')
      }
      res.json()
    })
      .catch((err) => {
        setError(err.message)
      })
      .then(() => {
        setsignUpUser({
          name: '',
          email: '',
          password: ''
        })
      })
  }

    return (

        <Article>

          <From onSubmit={handleSubmit}>
         
          <h1>Sign up here</h1>

          <Input
          type="text"
          placeholder="Name"
          required
          value={signUpUser.name}
          onChange={event => setsignUpUser({ ...signUpUser, name: event.target.value })} 
          > 
          </Input>
          <Input
          type="email"
          placeholder="Email"
          required
          value={signUpUser.email}
          onChange={event => setsignUpUser({ ...signUpUser, email: event.target.value })} 
          >
          </Input>
          <Input
          type="password"
          placeholder="Password"
          minlength="8"
          required
          value={signUpUser.password}
          onChange={event => setsignUpUser({ ...signUpUser, password: event.target.value })} 
          >
          </Input>

          <Input type="submit" value="Sign up" onClick={handleSubmit}></Input>
          {error && {error}}
          
          </From>
     

        </Article>


   
)}
