import React, {Component} from 'react'
import {Card, Form, FormGroup, Accordion, FormControl, FormLabel, Button, ButtonGroup} from "react-bootstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamation} from '@fortawesome/free-solid-svg-icons'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import "./Users.css";
import {validateEmail, validateInputLength, validatePassword, validateConfirmPassword} from '../lib/form-validation'
import UploadPhoto from './UploadPhoto'

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      photo:null,
      photoUrl:null,
      confirmPassword: '',
      strava_athlete_id:'',
      strava_token:'',
      strava_token_expires_at:0,
      strava_refresh_token:'',
      redirectToProfile: false,
      changesMade:false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    this.userData= new FormData()
    const jwt = auth.isAuthenticated()
    read({
      userId: this.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        const photoUrl = `/api/users/photo/${data._id}?${new Date().getTime()}`
        
        this.setState({name: data.name, email: data.email, strava_athlete_id:data.strava_athlete_id,strava_token:data.strava_token,strava_token_expires_at:data.strava_token_expires_at, strava_refresh_token:data.strava_refresh_token, photo:data.photo, photoUrl})
        
      }
    })
  }

  changePhotoState=(photo,file)=>{
    this.setState({photo,changesMade:true})
    this.userData.set('photo', file)
    
  }

deletePhoto=()=>{

  this.setState({photo:null, photoUrl:null, changesMade:true})
  this.userData.set('photo', '')
}

  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    this.userData.set('name',     this.state.name)
    this.userData.set('email',    this.state.email)
    this.userData.set('password', this.state.password)
    this.userData.set('strava_athlete_id',this.state.strava_athlete_id)
    this.userData.set('strava_token',this.state.strava_token)
    this.userData.set('strava_token_expires_at',this.state.strava_token_expires_at)
    this.userData.set('strava_refresh_token',this.state.strava_refresh_token)

    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, this.userData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
        console.log(data.error)
      } else {
        this.setState({'userId': data._id})
      }
    })
  }

  validateStravaId(id){
    const regex = /^[0-9]{1,20}$/
    if(regex.test(id)) return 'success'; else if (id.length>0) return 'error'
   }

  validateForm() {
    return (
      validateInputLength(this.state.name,2)==='success'&&
      validateEmail(this.state.email)==='success'&&
      this.validateStravaId(this.state.strava_athlete_id)==='success'&&
      validatePassword(this.state.password)==='success'&&
      validateConfirmPassword(this.state.password,this.state.confirmPassword)==='success'&&
      validateInputLength(this.state.strava_token,20)==='success'&&
      validateInputLength(this.state.strava_refresh_token,20)==='success'
    )
  }  


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value, changesMade:true
    });
  }

  render() {
//    if (this.state.redirectToProfile) {
//      return (<Redirect to={'/user/' + this.state.userId}/>)
//    }
    return (
      <div>
      <Card>
        <Card.Header><ButtonGroup size="m">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Edit Profile
          </Accordion.Toggle>
          </ButtonGroup>

         </Card.Header>
         <Accordion.Collapse eventKey="0">
           <div>
         <Card.Body>
      <Form>
      <FormGroup controlId="name" >
          <FormLabel>Name</FormLabel>
          <FormControl
            autoFocus
            isValid={validateInputLength(this.state.name,2)==='success'}
            isInvalid={validateInputLength(this.state.name,2)==='error'}
            type="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" >
          <FormLabel>Email</FormLabel>
          <FormControl
            isValid={validateEmail(this.state.email)==='success'}
            isInvalid={validateEmail(this.state.email)==='error'}
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="strava_athlete_id">
        <FormLabel>Strava Athlete Id</FormLabel>
        <FormControl
        isValid={this.validateStravaId(this.state.strava_athlete_id)==='success'}
        isInvalid={this.validateStravaId(this.state.strava_athlete_id)==='error'}
        value={this.state.strava_athlete_id}
        onChange={this.handleChange}                  
        name="strava_athlete_id" />
        </FormGroup>
                <FormGroup controlId="strava_token">
                  <FormLabel>Strava Token</FormLabel>
                  <FormControl
                  isValid={validateInputLength(this.state.strava_token,20)==='success'}
                  isInvalid={validateInputLength(this.state.strava_token,20)==='error'}
                  value={this.state.strava_token}
                  onChange={this.handleChange}                  
                  name="strava_token" />
                </FormGroup>
                <FormGroup>
                <FormLabel>Strava Token Expires At</FormLabel>
                <FormControl
        isValid={validateInputLength(this.state.strava_token_expires_at,2)==='success'}
        isInvalid={validateInputLength(this.state.strava_token_expires_at,2)==='error'}
        value={this.state.strava_token_expires_at}
        onChange={this.handleChange}                  
        name="strava_token_expires_at"/>
        </FormGroup>
                <FormGroup controlId="strava_refresh_token">
                  <FormLabel>Strava Refresh Token</FormLabel>
                  <FormControl
                  isValid={validateInputLength(this.state.strava_refresh_token,20)==='success'}
                  isInvalid={validateInputLength(this.state.strava_refresh_token,20)==='error'}
                  value={this.state.strava_refresh_token}
                  onChange={this.handleChange}                  
                  name="strava_refresh_token" />
                </FormGroup>
        <FormGroup controlId="password" >
          <FormLabel>Password</FormLabel>
          <FormControl
            isValid={validatePassword(this.state.password)==='success'}
            isInvalid={validatePassword(this.state.password)==='error'}          
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" >
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            isValid={validatePassword(this.state.confirmPassword)==='success'&&validateConfirmPassword(this.state.password,this.state.confirmPassword)==='success'}
            isInvalid={validatePassword(this.state.confirmPassword)==='error'|validateConfirmPassword(this.state.password,this.state.confirmPassword)==='error'}          
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        </Form>
        <UploadPhoto changePhotoState={this.changePhotoState} changesMade={this.state.changesMade} photo={this.state.photo} photoUrl={this.state.photoUrl} deletePhoto={this.deletePhoto}/>
        </Card.Body>

        <Card.Footer>
        <Accordion.Toggle as={Button} eventKey="0"
        
          
          
          disabled={!this.validateForm()}
          onClick={this.clickSubmit}>Submit
          </Accordion.Toggle>
          {this.state.changesMade&&<span className="text-danger upload-photo-error">
          <FontAwesomeIcon icon={faExclamation}/> Enter your password and click "Submit" to save changes.</span>}
          </Card.Footer>

          </div>
        </Accordion.Collapse>
      </Card>
      </div>
    )
  }
}


export default EditProfile
