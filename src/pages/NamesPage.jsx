import React, { useEffect, useState, useCallback } from 'react';
import { usePageError } from '../hooks/usePageError.js';
import { nameService } from '../services/nameService.js';
import { arrayMoveImmutable } from 'array-move'
import SortableList from '../components/nameComponents/SortableList'
import { AddName } from '../components/nameComponents/AddName'

export const NamesPage = () => {
  const [error, setError] = usePageError('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    nameService.getAll()
      .then(array => setNames(array.map((el) => `${el.name}, id ${el.id}`)))
      .catch(error => {
        setError(error.message)
      })
  }, [setError, setNames])

  // const updateAll = useCallback(
  //   ({ oldIndex, newIndex }) => {
      
  //   },
  //   [],
  // )

  console.log('rerender in namespage')

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setNames((prevItem) => arrayMoveImmutable(prevItem, oldIndex, newIndex))
  }

  return (
    <div className="content">
      <h1 className="title">Names</h1>
    <AddName rank={names.length + 1} changeNamesState={setNames} names={names}/>
      <ul>
      <div >
      <SortableList className ={'wrapper'} items={names} onSortEnd={onSortEnd} />
    </div>
      </ul>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
