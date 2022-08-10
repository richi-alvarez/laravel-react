import React, { useEffect, useState } from 'react';

import employeeService from '../../services/Employee';

function Edit(props){

  const [ id, setId] = useState(null);
  const [ name, setName ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ address, setAdress ] = useState(null);
  const [ phone, setPhone ] = useState(null);
  const [ rol, setRol ] = useState(null);
  const [ listRol, setListRol ] = useState([]);

  useEffect(()=>{
    async function fetchDataEmployee(){
      let id = props.match.params.id;
      const res = await employeeService.get(id);
      if(res.succes){
        const data = res.data;
        console.log(data)
        setId(data.id)
        setName(data.name_lastname)
        setEmail(data.email)
        setCity(data.city)
        setAdress(data.direction)
        setPhone(data.phone)
        setRol(data.rol)

      }else{
        alert(res.message)
      }
    }
    fetchDataEmployee();

    async function fetchDataRol(){
      const res = await employeeService.listRole(); 
      setListRol(res.data)   
    }
    fetchDataRol();
    
  },[])

  const updateEmployee = async () => {
    const data = {
      id, name, email, city, address, phone, rol
    }
    const res = await employeeService.update(data);

    if(res.succes){
      alert(res.message)
    }else{
      alert(res.message)
    }
  }

  return (
    <div>
      <h4>Edit customer  </h4>
      <hr/>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName">Name</label>
          <input type="text" className="form-control" value={name}
          onChange={(event)=>setName(event.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" placeholder="you@example.com" 
           value={email}
           onChange={(event)=>setEmail(event.target.value)}
           />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
			    <label htmlFor="phone">City {city} </label>
			    <select id="inputState" className="form-control" 
            onChange={(event)=> setCity(event.target.value)}
             value={city}>
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
           value={address} onChange={(event)=>setAdress(event.target.value)}/>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="address">Phone </label>
          <input type="text" className="form-control" placeholder="123467890" 
           value={phone} onChange={(event)=>setPhone(event.target.value)}/>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
			    <label htmlFor="phone">Rol {rol} </label>
			    <select id="inputState" className="form-control" 
            onChange={(event)=> setRol(event.target.value)}
             value={rol}>
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
           onClick={()=>updateEmployee()}>Save</button>
        </div>
      </div>
    </div>
  )

}

export default Edit;
