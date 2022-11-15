import React from 'react';
import { arrayMoveImmutable } from 'array-move'
import SortableList from '../components/nameComponents/SortableList'
import { AddName } from '../components/nameComponents/AddName'

export const NamesPage = (props) => {

  const onSortEnd = ({ oldIndex, newIndex }) => {
    props.changeNamesState((prevItem) => arrayMoveImmutable(prevItem, oldIndex, newIndex))
  }

  return (
    <div className="content">
      <h1 className="title">Names</h1>
    <AddName rank={props.names.length + 1} changeNamesState={props.changeNamesState} names={props.names}/>
      <ul>
      <div >
      <SortableList className ={'wrapper'} items={props.names} onSortEnd={onSortEnd} changeNameState={props.changeNamesState} names={props.names}/>
    </div>
      </ul>
    </div>
  );
};
