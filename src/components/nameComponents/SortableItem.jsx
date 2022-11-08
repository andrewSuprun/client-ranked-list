import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { DeleteName } from './DeleteName'
import { ModalEdit } from './ModalEdit'
import { useCallback, useState, useRef} from 'react'
import { API_URL } from '../../config'
import axios from 'axios'

const SortableItem = (props) => {
  const [isDeleted, setDeleted] = useState(false)
  const inputRef = useRef(null)
  const [isEdited, setEdited] = useState(false);

  const sendDeleteRequest = useCallback(async () => {
    console.log(props.id)
    if (isDeleted) return

    console.log(`${API_URL}names/${props.id}`)
    await axios.delete(`${API_URL}names/${props.id}`)
    console.log('here')
    setDeleted(true)
  }, [props.id, isDeleted])

  


  const sendEditRequest = useCallback(
    async () => {
      console.log('value 👉️', inputRef.current.value)
      const input = inputRef.current.value
      putRequest(props.id, input)
      .then(setEdited(true))
      inputRef.current.value = ''
    },
    [props.id],
  )

  const putRequest = async (id, input) => {
    await axios.put(`${API_URL}names/${id}`, {
      name: input,
    })
  }

  const getOneName = async (id, input) => {
    await axios.get(`${API_URL}names/${id}`)
  }

  if (isDeleted) {
    return <></>
  }
  if (isEdited) {
    return (
      <li>
        <div>
        {"pipka"}{[props.rank]}
        </div>
      </li>
    )
  }
    return (
      <li>
        <div>
          {props.rank} {props.name}
          <DeleteName id={props.id} sendDeleteRequest={sendDeleteRequest} />
        </div>
        <ModalEdit id={props.id} name={props.name} inputRef={inputRef} sendEditRequest={sendEditRequest}/>
      </li>
    )
  }



export default SortableElement(SortableItem)
