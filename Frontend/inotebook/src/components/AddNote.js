import React from 'react'
import noteContext from '../context/notes/NoteContext'
import { useContext,useState } from 'react'

const AddNote = () => {
  const context = useContext(noteContext)
  const {addNote} = context

  const [notes, setnotes] = useState({title:"",description:"",tag:""})

  const handleclick = (e) => {
    e.preventDefault();
    console.log(notes)
    addNote(notes.title,notes.description,notes.tag);
  }
  const onchange = (e) =>{
    setnotes({...notes,[e.target.name]:e.target.value})
  }
  return (
    <div className="container">
      <h1>Add a note</h1>

          <form>
          <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control"name="title" id="title" aria-describedby="emailHelp" onChange={onchange}/>
          <div id="emailHelp" className="form-text">Enter your title here</div>
          </div>
          <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input type="text" className="form-control" row="8" name="description" id="description" onChange={onchange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
          <input type="text" className="form-control" row="8" name="tag" id="tag" onChange={onchange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
          </form>
    </div>
  )
}

export default AddNote