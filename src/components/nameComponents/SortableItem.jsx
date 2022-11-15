import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { DeleteName } from './DeleteName'
import { ModalEdit } from './ModalEdit'
import { useCallback, useState, useRef} from 'react'
import { API_URL } from '../../config'
import axios from 'axios'

const SortableItem = (props) => {
  const inputRef = useRef(null)
  const [isEdited, setEdited] = useState(false);

  const sendDeleteRequest = useCallback(async () => {
    await axios.delete(`${API_URL}names/${props.id}`)
    const deletedItem = props.names[props.rank - 1]
    props.changeNameFromState([...props.names.filter(item => item !== deletedItem)])
  }, [props])



  const sendEditRequest = useCallback(
    async () => {
      const input = inputRef.current.value
      const editedName = await putRequest(props.id, input)

      inputRef.current.value = ''
      props.changeNameFromState([...props.names, editedName
      ])
    },
    [props.id],
  )

  const putRequest = async (id, input) => {
    return await axios.put(`${API_URL}names/${id}`, {
      name: input,
    })
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
