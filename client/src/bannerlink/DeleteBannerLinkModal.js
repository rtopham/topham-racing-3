import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class DeleteBannerLinkModal extends Component {
  
  render() {

    return (

<div>
  <Modal show={true}>
    <Modal.Header>
      <Modal.Title>Delete Banner</Modal.Title>
    </Modal.Header>

    <Modal.Body>Confirm to delete this banner.</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.handleRequestClose}>Cancel</Button>
      <Button onClick={this.props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal>
</div>


    )

  }
}

export default DeleteBannerLinkModal
