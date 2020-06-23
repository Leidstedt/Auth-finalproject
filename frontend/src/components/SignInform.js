import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// lib
import { Article } from '../lib/FormStyle'
import { From } from '../lib/FormStyle'
import { Input } from '../lib/FormStyle'

export const SignInform = () => {
  
const [signInUser, setsignInUser] = useState({
  email: '',
  password: ''
})
const history = useHistory()
const [error, setError] = useState('')

const handleSubmit = event => {
event.preventDefault()


fetch("https://project-auth-ebba-elin.herokuapp.com/sessions",
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(signInUser)
  }
).then(res => {
  if (!res.ok) {
    throw new Error('Unable to sign in, please try again')
  }
  res.json().then(data => {
    if (data.notFound !== true) {
      localStorage.setItem('accessToken', data.accessToken)
      history.push('/SecretMessage')
    }
  })
})
.catch((err) => {
  setError(err.message)
})
.then(() => {
  setsignInUser({
    email: '',
    password: ''
  })
})
}

return (

    <Article>

      <From onSubmit={handleSubmit}>
     
      <h1>Sign in</h1>

      <Input
      type="email"
      placeholder="Email"
      required
      value={signInUser.email}
      onChange={event => setsignInUser({ ...signInUser, email: event.target.value })} 
      >
      </Input>
      <Input
      type="password"
      placeholder="Password"
      minlength="8"
      required
      value={signInUser.password}
      onChange={event => setsignInUser({ ...signInUser, password: event.target.value })} 
      >
      </Input>

      <Input type="submit" value="Sign in"></Input>
      {error && <p>{error}</p>}
      </From>
 
    

    </Article>

)
}



