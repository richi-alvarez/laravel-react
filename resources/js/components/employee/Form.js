import React, { useEffect, useState } from 'react';
import employeeService from '../../services/Employee';

function Form(){

  const [ name, setName ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ address, setAdress ] = useState(null);
  const [ phone, setPhone ] = useState(null);
  const [ rol, setRol ] = useState(null);

  const [ listRol, setListRol ] = useState([]);
        
    useEffect(()=>{
      async function fetchDataRol(){
        const res = await employeeService.listRole(); 
        setListRol(res.data)   
      }
      fetchDataRol();
    },[])

    const saveEmployee = async () => {
      const data = {
        name, email, city, address, phone, rol
      }
      const res = await employeeService.save(data);
      if(res.success){
        alert(res.message)
      }else{
        alert(res.message)
      }
    }

  return(
    <div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName">Name employee</label>
          <input type="text" className="form-control" placeholder="Name"
           onChange={(event)=>setName(event.target.value)}/>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" placeholder="you@example.com"
           onChange={(event)=>setEmail(event.target.value)}/>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
			    <label htmlFor="phone">City {city} </label>
			    <select id="inputState" className="form-control" 
            onChange={(event)=> setCity(event.target.value)}>
             <option selected>Choose...</option>
             <option value="New York">New York</option>
             <option value="London">London</option>
             <option value="Madrid">Madrid</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" placeholder="1234 Main St" 
           onChange={(event)=>setAdress(event.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="phone">Phone </label>
          <input type="text" className="form-control" placeholder="123467890"
           onChange={(event)=>setPhone(event.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
			    <label htmlFor="phone">Rol {rol} </label>
			    <select id="inputState" className="form-control" 
            onChange={(event)=> setRol(event.target.value)}>
             <option selected>Choose...</option>
             {
                 listRol.map((itemselect)=>{
                     return(
                         <option value={itemselect.rol_id}>{itemselect.rol_name}</option>
                     )
                 })
             }
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <button className="btn btn-primary btn-block" type="submit"
            onClick={()=>saveEmployee()}
          >Save</button>
        </div>
      </div>
    </div>
  )
}

export default Form;
