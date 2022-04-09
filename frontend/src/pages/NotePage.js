import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import {Link} from 'react-router-dom'

const NotePage = () => {

//   const obj = useParams()
//   id = obj.id
const {id} = useParams()

//   let myArr = useState(null)
//   note = myArr[0]
//   setNote = myArr[1]
const [note, setNote] = useState(null)
const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    setTimeout(getNote, 1000)
  }, [id])
  
  const getNote = async() => {
    const response = await fetch(`/api/notes/${id}/`)
    const data = await response.json()
    setNote(data)
    setLoading(false)
  }

  return (
    <div className="note">
      <div className="note-header">
          <h3>
            <Link to="/">
              <ArrowLeft />
            </Link> 
          </h3>
      </div>
      {loading ? "Loading..." : <textarea defaultValue={note?.body} />}
    </div>
  )
}


export default NotePage

// router -> page(component)
// extract id from the route
// call the api with the id
// save returned json
// display json