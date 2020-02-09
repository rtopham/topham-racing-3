import React, {Component} from 'react'
import {Modal,Form, Card, Button,FormGroup, FormLabel, FormControl} from "react-bootstrap"
import {update} from './api-race.js'
import auth from '../auth/auth-helper.js'
import {read} from './../user/api-user.js' 
import DeleteRace from './DeleteRace'
import {validateInputLength, validateDate, validateTime, validateRank} from '../lib/form-validation'
import "./Race.css"


class EditRace extends Component {
state = {
    series: '',
    race_name: '',
    race_date: '',
    location: '',
    category: '',
    time: '',
    rank: '',
    show: false,
    error:''
  }


componentDidMount = () => {
  const jwt = auth.isAuthenticated()
  read({
    userId: this.props.race.postedBy._id
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {

this.setState({series: this.props.race.series, race_name: this.props.race.race_name, race_date:this.props.race.race_date.substring(0,10),location:this.props.race.location||'',category:this.props.race.category, time:this.props.race.time,rank:this.props.race.rank,show:false})

    }
  })
}

clickUpdateRace = () => {
  const jwt = auth.isAuthenticated()
  const race = {

    race_name: this.state.race_name,
    series: this.state.series,
    race_date: this.state.race_date,
    location: this.state.location,
    time: this.state.time,
    rank: this.state.rank,
    category: this.state.category
    
  }
  update({
    raceId: this.props.race._id
  }, {
    t: jwt.token
  }, race).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
      console.log(data.error)
    } else {

this.setState({show:true})

    }
  })
}


  validateForm() {
    return (
      validateInputLength(this.state.series,2)==='success'&&
      validateInputLength(this.state.race_name,4)==='success'&&
      validateDate(this.state.race_date)==='success'&&
      validateInputLength(this.state.location,4)==='success'&&
      validateInputLength(this.state.category,3)==='success'&&
      validateTime(this.state.time)==='success'&&
      validateRank(this.state.rank)==='success'

    );
  }  

  handleChange = name => event => {
    const value = event.target.value
    this.setState({ [name]: value })
  }

  handleClose = () => {
    this.setState({show: false });
    this.props.reloadRaces(this.props.race.postedBy._id)
//    this.props.closeRaceCard()
  }  

  render() {

//    console.log(this.props.race._id)

    return (<div className="modal-container">
      <Card id="addRace">
 
        <Card.Body>
        <Form>
                <FormGroup>
                  <FormLabel>Series</FormLabel>
                  <FormControl
                  isValid={validateInputLength(this.state.series,2)==='success'}
                  isInvalid={validateInputLength(this.state.series,2)==='error'}
                  value={this.state.series}
                  onChange={this.handleChange("series")}
                  name="series" autoFocus />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Race Name</FormLabel>
                  <FormControl
                  isValid={validateInputLength(this.state.race_name,4)==='success'}
                  isInvalid={validateInputLength(this.state.race_name,4)==='error'}
                  value={this.state.race_name}
                  onChange={this.handleChange("race_name")}                  
                  name="race_name" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Date</FormLabel>
                  <FormControl
                  isValid={validateDate(this.state.race_date)==='success'}
                  isInvalid={validateDate(this.state.race_date)==='error'}
                  placeholder="YYYY-MM-DD"
                  value={this.state.race_date}
                  onChange={this.handleChange("race_date")}                  
                  name="race_date" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Location</FormLabel>
                  <FormControl
                  isValid={validateInputLength(this.state.location,4)==='success'}
                  isInvalid={validateInputLength(this.state.location,4)==='error'} 
                  value={this.state.location}
                  onChange={this.handleChange("location")}                  
                  name="location" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Category</FormLabel>
                  <FormControl
                  isValid={validateInputLength(this.state.category,3)==='success'}
                  isInvalid={validateInputLength(this.state.category,3)==='error'}
                  value={this.state.category}
                  onChange={this.handleChange("category")}                  
                  name="category" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Time</FormLabel>
                  <FormControl
                  isValid={validateTime(this.state.time)==='success'}
                  isInvalid={validateTime(this.state.time)==='error'}
                  placeholder="HH:MM:SS"
                  value={this.state.time}
                  onChange={this.handleChange("time")}                  
                  name="time" />
                </FormGroup>              
                <FormGroup>
                  <FormLabel>Rank</FormLabel>
                  <FormControl
                  isValid={validateRank(this.state.rank)==='success'}
                  isInvalid={validateRank(this.state.rank)==='error'}
                  value={this.state.rank}
                  onChange={this.handleChange("rank")}                  
                  name="rank" />
                </FormGroup>
    
              </Form>
      </Card.Body>
      <Card.Footer>
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickUpdateRace} className="">Save Changes</Button>
        <DeleteRace userId={this.props.race.postedBy._id} raceId={this.props.race._id} closeRaceCard={this.props.closeRaceCard} reloadRaces={this.props.reloadRaces}/>

        </Card.Footer>

      </Card>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
         <Modal.Title>Add Race</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Race successfully updated.</h4>
        </Modal.Body>
        <Modal.Footer>

            <Button variant = "primary" onClick={this.handleClose}>
              Ok
            </Button>

        </Modal.Footer>
      </Modal>

  </div>)
  }
}

export default EditRace
