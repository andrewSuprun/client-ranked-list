import Button from 'react-bootstrap/Button'


export const DeleteName = (props) => {
  return (
    <div>
      <Button variant="danger" onClick={props.sendDeleteRequest}>
        Delete
      </Button>
    </div>
  )
}
