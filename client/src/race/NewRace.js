import React, {Component} from 'react'
import {Modal,Form, Card, Button,FormGroup, Accordion, FormLabel, FormControl} from "react-bootstrap"
import {create} from './api-race.js'
import auth from '../auth/auth-helper.js'
import {validateInputLength, validateDate, validateTime, validateRank} from '../lib/form-validation'


class NewRace extends Component {
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

    this.setState({user: auth.isAuthenticated().user})
  }

clickAddRace = () => {
  const race = {

    race_name: this.state.race_name || undefined,
    series: this.state.series || undefined,
    race_date: this.state.race_date || undefined,
    location: this.state.location || undefined,
    time: this.state.time || undefined,
    rank: this.state.rank || undefined,
    category: this.state.category || undefined
    
  }

    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, race).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
        console.log(data.error)
      } else {
        this.setState({series: '',race_name: '',race_date: '',location:'',category:'',time:'',rank:'',show:true})

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
    this.setState({ show: false });
    this.props.reloadRaces(this.props.userId)
  }  

  render() {

    return (<div className="NewRace modal-container">
      <Card id="addRace">
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Add Race
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <div>
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
                <FormGroup >
                  <FormLabel>Location</FormLabel>
                  <FormControl
                  isValid={validateInputLength(this.state.location,4)==='success'}
                  isInvalid={validateInputLength(this.state.location,4)==='error'}
                  value={this.state.location}
                  onChange={this.handleChange("location")}                  
                  name="location" />
                </FormGroup>
                <FormGroup >
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
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickAddRace} className="">Add Race</Button>
        </Card.Footer>
        </div>

      </Accordion.Collapse>
      </Card>

      <Modal show={this.state.show} onHide={this.handleClose} container={this} >
        <Modal.Header closeButton>
         <Modal.Title>Add Race</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>New race successfully created.</h4>
        </Modal.Body>
        <Modal.Footer>

            <Button bsStyle = "primary" onClick={this.handleClose}>
              Ok
            </Button>

        </Modal.Footer>
      </Modal>

  </div>)
  }
}

export default NewRace
