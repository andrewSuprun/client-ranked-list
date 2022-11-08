import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React from 'react'

const MyVerticallyCenteredModal = React.memo(function MyVerticallyCenteredModal(props) {
  console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change name {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input ref={props.inputRef} type="text" id="message" name="message" />

          <button onClick={props.sendEditRequest}>Change</button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
)

const ModalEdit = React.memo(function ModalEdit(props) {
  const [modalShow, setModalShow] = React.useState(false)
  console.log(props)

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Edit
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.id}
        name={props.name}
        sendEditRequest={props.sendEditRequest}
        inputRef={props.inputRef}
      />
    </>
  )
}
)

export {ModalEdit, MyVerticallyCenteredModal}