// RegistrationPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

// import "./Registraion.scss";


function RegistrationPage() {
  const history=useNavigate();

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [topicname,setTopicName]=useState('')

  async function submit(e){
      e.preventDefault();

      try{

          await axios.post("http://localhost:5000/RegistrationPage",{
              name,email,topicname,password,
          })
          .then(res=>{
              if(res.data==="exist"){
                  alert("User already exists")
              }
              else if(res.data==="notexist"){
                  history("/",{state:{id:email}})
              }
          })
          // .catch(e=>{
          //     alert("wrong details")
          //     console.log(e);
          // })

      }
      catch(e){
          console.log(e);

      }

  }

  return (
    <div
    style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        margin: '100px'
      }}
      >
      <div
        style={{
          maxWidth: '400px',
          padding: '40px',
          border: '1px solid #ccc',
          borderRadius: '10px',
        }}
      >
        
     
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
      Registration Page</h2>
      <form onClick={submit}>
        

        <div style={{ marginBottom: '10px' }}>
            <input
              required
              autoComplete="off"
              type="text"
              placeholder="Enter Name"
              name="name"
              style={{
                width: '100%',
                padding: '8px',
                
              }}
              onChange={(e) => { setName(e.target.value) }}
            />
          </div>



        <div style={{ marginBottom: '10px' }}>
            <input
              required
              autoComplete="off"
              type="email"
              placeholder="Enter Email"
              name="email"
              style={{
                width: '100%',
                padding: '8px',
                
              }}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>


        <div style={{ marginBottom: '10px' }}>
            <input
              required
              autoComplete="off"
              type="text"
              placeholder="Enter Topic Name"
              name="topicname"
              style={{
                width: '100%',
                padding: '8px',
                
              }}
              onChange={(e) => { setTopicName(e.target.value) }}
            />
          </div>

       

        <div style={{ marginBottom: '10px' }}>
            <input
              required
              autoComplete="off"
              type="password"
              placeholder="Enter Password"
              name="password"
              style={{
                width: '100%',
                padding: '8px',
                
              }}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

        <div>
        <button
            type="submit"
            style={{
              fontWeight: 'bold',
              width: '100%',
              padding: '8px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
           Register
          </button>
        </div>
      </form>
      </div>
     
    </div>

    
  );
};

export default RegistrationPage;
