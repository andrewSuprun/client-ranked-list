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
        name={value}
        rank={ index + 1}
        id={value.split(',')[1].split(' ')[2]}
      />
      }
      )}
    </ul>
  )
}

export default SortableContainer(SortableList)
