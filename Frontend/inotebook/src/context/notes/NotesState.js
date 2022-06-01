import React,{useState} from "react";
import NoteContext from "./NoteContext"
// working 
// add notes
// fecth notes

const NoteState = (props) =>{
  const host='http://localhost:5000'

    
  const fetchurl = "http://localhost:5000/api/notes/fetchallnotes";
  const notes=[];
  const [Notes, setNotes] = useState(notes)
   const getNotes = async () => {
    //  API call
    const response = await fetch(fetchurl,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')

      },
    });
    const json =await  response.json();
    console.log(json);
    setNotes(json);
   }
   

    // add a note
    const addNote = async(title,description,tag) => {
        //Api call
        const url=`${host}/api/notes/addnotes`
        const response = await fetch(url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')

          },
          body: JSON.stringify({
            title,
            description,
            tag
          })
        });
        const json =await  response.json();
        console.log(json);
        window.location.reload(false);
    }
    // delete a note
    const deleteNote =async (id) => {
      //api call
      const url=`${host}/api/notes/deletenote/${id}`
      const response = await fetch(url,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')

        },
        
      });
      const json =await response.json();
      console.log(json);
      window.location.reload(false);
     
    } 

    // update a note
    const editNote = async (id,title,description,tag) => {
    // api call
    const url=`${host}/api/notes/updatenote/${id}`
    const response = await fetch(url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')

      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
      // code
      let newNotes = JSON.parse(JSON.stringify(notes)) 
      for(let index=0;index<newNotes.length;index++)
      {
        const element=newNotes[index];
        if(element._id===id)
        {
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag
          break;
        }

      }
      setNotes(newNotes);
      window.location.reload(false);
    }

    return (
        <NoteContext.Provider value={{Notes,getNotes,setNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState