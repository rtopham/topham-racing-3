import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-race.js'
import DeleteRaceModal from './DeleteRaceModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

class DeleteRace extends Component {

  state = {
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  deleteRace = () => {

    const jwt = auth.isAuthenticated()
    remove({
      raceId: this.props.raceId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({open: false})
        this.props.reloadRaces(this.props.userId)
//        this.props.closeRaceCard()
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
  
    if (this.state.open){
      return <DeleteRaceModal container={this.props.container} handleRequestClose={this.handleRequestClose} handleDelete={this.deleteRace}/>
    }
    else return (
     
      <Button variant="link" className="float-right" size="small" onClick={this.clickButton}>
         <FontAwesomeIcon icon={faTrash}/>
      </Button>
      
    )

  }
}

export default DeleteRace
