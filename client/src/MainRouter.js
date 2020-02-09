import React, {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Home from './core/Home'
import Stats from './stats/Stats'
import Strava from './strava/Strava'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Dashboard from './user/Dashboard'
import PrivateRoute from './auth/PrivateRoute'
import PasswordResetRequest from './auth/PasswordResetRequest'
import ResetPassword from './auth/ResetPassword'
import Contact from './admin/Contact'
import Menu from './core/Menu'
import Footer from './core/Footer'

const PageError=()=>{
  return(
  <div className='centerthis error'>Page Not Found.</div>
  )
}

class MainRouter extends Component {

  render() {
    return (<div>
     <Menu/>
      <Switch>
        <Redirect exact from="/" to="/races/5bd91a027b59b61efe06ae3d" />
        <Redirect exact from="/stats" to="/stats/5bd91a027b59b61efe06ae3d" />
        <Redirect exact from="/strava" to="/strava/5bd91a027b59b61efe06ae3d" />
        <Route path="/stats/:userId" component={Stats}/>
        <Route path="/strava/:userId" component={Strava}/>
        <Route path="/races/:userId" component={Home}/>
        <Route exact path="/" component={Home}/>
{/*         <Route path="/users" component={Users}/> */}
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/password-reset-request" component={PasswordResetRequest}/>
        <Route path="/reset-password/:token" component={ResetPassword}/>
        {/* <PrivateRoute path="/user/edit/:userId" component={EditProfile}/> */}
        <PrivateRoute path="/user/dashboard/:userId" component={Dashboard} />
        {/* <Route path="/user/:userId" component={Profile}/> */}
        <Route component={PageError}/>

      </Switch>
      <Footer />
    </div>)
  }
}

export default MainRouter
