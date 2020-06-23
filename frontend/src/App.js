import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import { SignUpform } from './components/SignUpform'
import { SignInform } from './components/SignInform'
import {  SecretMessage } from './components/SecretMessage'

// lib
import { Card } from './lib/Card'
import { Wrapper } from './lib/Wrapper'


export const App = () => {
  return (
    
    <BrowserRouter>
    <Switch>
    <Wrapper>
    <Route path="/" exact>
      <Card>
          <SignUpform />
      </Card>
      <Card>   
          <SignInform  /> 
      </Card>
    </Route>

    <Route path='/secretmessage'>
      <Card>
          <SecretMessage />
       </Card>
    </Route>
    </Wrapper>
    
    </Switch>
    </BrowserRouter>
  )
}


