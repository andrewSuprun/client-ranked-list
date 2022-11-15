import axios from 'axios'
import { useRef } from 'react'
import { API_URL } from '../../config'

export const AddName = (props) => {
  const inputRef = useRef(null)

  async function handleClick() {
    const addedName = inputRef.current.value
    const item = await postRequest(addedName, props.rank)
    const nameForClient = { name: addedName, id: item.data.id, rank: props.rank }
    inputRef.current.value = ''
    const State = [ ...props.names, nameForClient]
    props.changeNamesState(State)
  }

  const postRequest = async (addedName, addedRank) => {
    return await axios.post(API_URL, {
      name: addedName,
      rank: addedRank,
    })
  }


  return (
    <div>
      <input ref={inputRef} type="text" id="message" name="message" />

      <button onClick={handleClick}>Add name</button>
    </div>
  )
}
