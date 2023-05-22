import React, { useState, useEffect } from 'react'
import List from './List'
import Form from './Form'
import Alert from './Alert'

const App = () => {
  const getLocalStorage = () => {
    let list = localStorage.getItem('list')
    if (list) {
      list = JSON.parse(localStorage.getItem('list'))
      return list
    } else {
      return []
    }
  }

  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleName = (data) => {
    setName(data)
  }

  const handleSubmit = () => {
    if (!name) {
      setAlert({ show: true, msg: 'Please Enter Value', type: 'danger' })
    } else if (name && isEditing) {
      const newList = list.map((item) => {
        if (item.id === editID) {
          return { title: name, id: editID }
        }
        return item
      })
      setList(newList)
      setAlert({ show: true, msg: 'Value Changed', type: 'success' })
      setName('')
      setEditID(null)
      setIsEditing(false)
    } else {
      let lastId = null
      if (list.length) {
        lastId = list[list.length - 1].id + 1
      } else {
        lastId = 1
      }
      setList([...list, { title: name, id: lastId }])
      setAlert({ show: true, msg: 'Item Added To The List', type: 'success' })
      setName('')
    }
  }

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
    setAlert({ show: true, msg: 'Item Removed', type: 'danger' })
  }

  const editItem = (id) => {
    const { title } = list.find((item) => item.id === id)
    setName(title)
    setIsEditing(true)
    setEditID(id)
  }

  const removeAll = () => {
    setList([])
    setAlert({ show: true, msg: 'Empty List', type: 'danger' })
  }

  const removeAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <>
      <section className='section-center'>
        {alert.show && (
          <Alert {...alert} removeAlert={removeAlert} list={list} />
        )}

        <h3>grocery bud</h3>

        <Form
          name={name}
          handleName={handleName}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />

        {list.length ? (
          <>
            <List list={list} removeItem={removeItem} editItem={editItem} />
            <input
              className='remove-all-btn'
              type='button'
              value='Clear Items'
              onClick={removeAll}
            />
          </>
        ) : (
          false
        )}
      </section>
    </>
  )
}

export default App
