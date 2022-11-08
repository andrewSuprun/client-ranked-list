import axios from 'axios'
import { useRef } from 'react'
import { API_URL } from '../../config'

export const AddName = (props) => {
  const inputRef = useRef(null)

  function handleClick() {
    console.log('value 👉️', inputRef.current.value)
    const addedName = inputRef.current.value
    const rank =  props.rank;
    console.log(rank, "raaaaank")
    postRequest(addedName, rank)
    inputRef.current.value = ''
    props.changeNamesState([...props.names,
       `${addedName},
        id ${77}` ])
    // setInterval(() => {
    //   window.location.reload();
    // }, 5000);
  }

  const postRequest = async (addedName, addedRank) => {
    console.log(addedName, addedRank)
    await axios.post(API_URL, {
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
