import React, { useEffect, useState } from 'react';

import employeeService from '../../services/Employee';

import { Link } from 'react-router-dom';

function List(){

  const [ ListEmployee, setListEmployee ] = useState([]);
  
  const [ name, setName ] = useState(null);
  useEffect(()=>{
    async function fetchDataEmployee(){
      let name = document.getElementById("info");
      if(name.innerHTML.length >1){
        setName(name.innerHTML)
      }else{
        setName("Name")
      }
      
      const res = await employeeService.ListEmployee();
      setListEmployee(res.data)
    }
    fetchDataEmployee();
    
  },[])


  const onClickDelete = async (i, id) => {
    var yes = confirm("Are you sure to delete this item?");
    if(yes === true){
      const res = await employeeService.delete(id);
      if(res.succes){
        const newList = ListEmployee
        newList.splice(i,1);
        setListEmployee(newList);
      }else{
        alert(res.message)
      }

    }
  }

  return (
    <section>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">{name}</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            ListEmployee.map((item,i)=>{
              return(
            <tr>
              <th scope="row">{i}</th>
              <td>{item.name_lastname}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>{item.direction}</td>
              <td>{item.phone}</td>
              <td>
                <Link to={"/employee/edit/"+item.id} className="btn btn-light"> Edit </Link>
                <a href="#" className="btn btn-danger" onClick={()=>onClickDelete(i,item.id)}> Delete </a>
              </td>
            </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  )
}

export default List;
