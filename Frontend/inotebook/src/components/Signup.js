import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [login, setlogin] = useState({name:"",email:"",password:""})
    const navigate = useNavigate();

    const handleclick = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/createuser`
        const response = await fetch(url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:login.name,email:login.email,password:login.password})
        }).then(token => { return token })
        console.log(login);
        const json = await  response.json();
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token', json.authtoken);
            navigate("/")
        }
        else
        console.log('enter a valid credentials')
    }
    const onchange = (e) => {
        setlogin({...login,[e.target.name]:e.target.value})
    }
  return (
    <>
     <div className='container my-5'>
                <form className='w-25 m-auto  '>
                <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" onChange={onchange} />
                        <div id="emailHelp" className="form-text">Enter your Name</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="text" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onchange} />
                        <div id="emailHelp" className="form-text">Enter your Email here</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" row="8" name="password" id="password" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" row="8" name="password" id="password" onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
                </form>
        </div>
    </>
  )
}

export default Signup