import React from 'react'
import SortableItem from './SortableItem'
import { SortableContainer } from 'react-sortable-hoc'


const SortableList = (props) => {
  return (
    <ul className="wrapper">
      {props.items.map((value, index, array) => {
        return <SortableItem
        key={`item-${index}`}
        index={index}
        name={value.name}
        rank={ index + 1}
        id={value.id}
        changeNameFromState={props.changeNameState}
        names={props.names}
      />
      }
      )}
    </ul>
  )
}

export default SortableContainer(SortableList)
