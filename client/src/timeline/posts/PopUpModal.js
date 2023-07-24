import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import CreatePost from './CreatePost'

function PopUpModal({open,onClose, handleCreatePost }) {
  return (
    <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CreatePost/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={onClose}>
                Close
            </Button>
            {/* <Button variant='primary' onClick={onClose}>
                Save Changes
            </Button> */}
        </Modal.Footer>
    </Modal>
  )
}

export default PopUpModal