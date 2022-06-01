import React from 'react'
import { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
const Notes = () => {
  const context = useContext(noteContext)
  const { Notes, getNotes, editNote } = context

  useEffect(() => {
    getNotes();
  }, [])
  

  const ref = useRef(null)
  const [notes, setnotes] = useState({id:"",title:"",description:"",tag:""})
  const updateNote = (notes) => {
    ref.current.click();
    setnotes(notes);

  }

 

  const handleclick = (e) => {
    e.preventDefault();
    console.log(notes.id);
    // console.log(id);
    editNote(notes._id,notes.title,notes.description,notes.tag);
  }
  const handlechange= (e) =>{
    setnotes({...notes,[e.target.name]:e.target.value})
  }


  return (
    <>
      <AddNote />

      <button ref={ref}  type="button" className=" d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div className='container my-3'>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp"  onChange={handlechange} />
                  <div id="emailHelp" className="form-text">Enter your title here</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" className="form-control" row="8" name="description" id="description"   onChange={handlechange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" className="form-control" row="8" name="tag" id="tag" onChange={handlechange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleclick} >Submit</button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <div className='container'>
        <h1>Your Notes</h1>
        <div className='row my-4'>
          {Notes.map((note) => {

            return (

              <NoteItem note={note} updateNote={updateNote} />
            )

          })
          }

        </div>
      </div>

    </>


  )
}

export default Notes