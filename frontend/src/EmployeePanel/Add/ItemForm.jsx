import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';


export default function ItemForm(props)
   {
   const handleClick=(e)=>
   {
      e.preventDefault();
      if(Object.keys(props.value).length===0)
      {
      const fd=new FormData();
      var input=document.getElementById("item_data").value
      fd.append('item',input)
      axios.post("http://127.0.0.1:8000/api/add_data/item",fd).catch((error)=>{
         if(error.status!==200)
         {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
         })
         }
      
      }).then((response)=>{
         console.log(response)
         if(response)
         {
            Swal.fire({
               icon: 'success',
               title: response.data.message,
               showConfirmButton: false,
               timer: 1500
         })
         setTimeout(()=>{window.location.reload()},[1000])
         }
      })
   }
   else
   {
      
      const fd22=new FormData();
      fd22.append('id',props.value.id)
      fd22.append('value',document.getElementById("Upd_data").value)
      // console.log(document.getElementById("Upd_data").value)
      axios.post("http://127.0.0.1:8000/api/update_Item_data",fd22).catch((error)=>{
         if(error.status!==200)
         {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
         })
         }
      
      }).then((response)=>{
         if(response)
         {
            Swal.fire({
               icon: 'success',
               title: response.data,
               showConfirmButton: false,
               timer: 1500
         })
         setTimeout(()=>{window.location.reload()},[1000])
         }
      })
      
   }
   }
return (
   <>
   <form onSubmit={handleClick}>
   <div className='container'>
   <div className='card'>
   <div className='card-body'>
      <div className='row'>
         <div className='col'>
            {
            Object.keys(props.value).length===0?<input className='form-control'
               id='item_data' defaultValue=""  name='item_data' placeholder='Enter item name'/>
            :<input className='form-control'
            id='Upd_data' defaultValue={props.value.item} name='Upd_data' placeholder='Enter item name'/>
            }
            
         </div>
         </div>
      </div>
      <div className='card-footer'>
         <button type='submit' className='btn btn-primary'>Submit</button>
      </div>
   </div>
   </div>
   </form>
   </>
)
}
