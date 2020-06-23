import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Image } from '../lib/SecretMessageStyle'
import { SecretMessageContainer } from '../lib/SecretMessageStyle'




export const SecretMessage = () => {
  const url = "https://project-auth-ebba-elin.herokuapp.com/secretmessage"
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    history.push('/')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')


    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': accessToken }
    })
      .then(res => {
        if (!res.ok) {
          throw error('Access denied')
        }
        res.json()
      })
      .catch(err => {
        setError(err.message)
      })
  })

  if (localStorage.getItem('accessToken')) {

  return (

      <section>
          <SecretMessageContainer>
            <h3>Can you read the secret message?</h3>
            <Image />
            <input onClick={handleSignOut} type="submit" value="Sign out"></input>
           </SecretMessageContainer>
           
      </section>
  )
}

}