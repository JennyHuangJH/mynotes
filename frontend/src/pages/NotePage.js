import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

const NotePage = () => {

  //   const obj = useParams()
  //   id = obj.id
  const { id } = useParams()
  const navigate = useNavigate()

  //   let myArr = useState(null)
  //   note = myArr[0]
  //   setNote = myArr[1]
  const [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [id])

  const getNote = async () => {
    if (id === 'new') {
      return
    }
    const response = await fetch(`/api/notes/${id}/`)
    const data = await response.json()
    setNote(data)
  }

  const createNote = async () => {
    await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

  }

  const updateNote = async () => {
    await fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

  }

  const deleteNote = async () => {
    await fetch(`/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    navigate('/')
  }

  const handleSubmit = async () => {
    if (id !== 'new' && note.body === '') {
      await deleteNote()
    } else if (id !== 'new') {
      await updateNote()
    } else if (id === 'new' && note.body !== '') {
      await createNote()
    }
    navigate('/')
  }

  const handleChange = (value) => {
    setNote(note => ({ ...note, 'body': value }))
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (<button onClick={deleteNote}>Delete</button>)
          : (<button onClick={handleSubmit}>Done</button>)}

      </div>
      <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body} />
    </div>
  )
}


export default NotePage

// router -> page(component)
// extract id from the route
// call the api with the id
// save returned json
// display json