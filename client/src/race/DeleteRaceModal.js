import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class DeleteRaceModal extends Component {
  
  render() {

    return (

<div>
  <Modal show={true} container={this.props.container}>
    <Modal.Header>
      <Modal.Title>Delete Race</Modal.Title>
    </Modal.Header>

    <Modal.Body>Confirm to delete this race.</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.handleRequestClose}>Cancel</Button>
      <Button variant="primary" onClick={this.props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal>
</div>


    )

  }
}

export default DeleteRaceModal
