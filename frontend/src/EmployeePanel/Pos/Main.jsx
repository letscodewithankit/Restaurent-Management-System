import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../Employee.css';
import Navbar from '../Navbar';




export default function Main() {
const [data,setData]=useState([]);
const [ItemData,setItemData]=useState([])
const [SubItem,setSubItem]=useState()
const [Amount,setAmount]=useState(0)



    useEffect(()=>{
    axios("http://127.0.0.1:8000/api/get_data_item").then((response)=>{
    setData(response.data)
    })
  },[])

  var count=1;


  const ChangeSubItem=(re)=>{
    setSubItem(re);
  }

  const handleBill=(responseOfBillData,value)=>
  {
    const RenderTableData=()=>
      {
      const arr=(Object.assign(responseOfBillData,{quantity:1}))
      setAmount(Amount+responseOfBillData.rate)
      setItemData(ItemData.concat(Object.assign(arr,{amount:arr.quantity*arr.rate})))
      }
    
      var Getter="false";
      for(let i=0;i<ItemData.length;i++)
      {
        if(ItemData[i].id===responseOfBillData.id)
        {
          Getter="true";
          if(value===2&&ItemData[i].quantity!==1)
          {
            ItemData[i].quantity=ItemData[i].quantity-1
            setAmount(Amount-ItemData[i].rate)
          }
          if(value===1||value===undefined)
          {
            ItemData[i].quantity=ItemData[i].quantity+1
            setAmount(Amount+ItemData[i].rate)
          }
          ItemData[i].amount=ItemData[i].quantity*ItemData[i].rate
        }
        
      }

      if(Getter==="false")
      {
        RenderTableData()
        }
      else
      {
        setItemData(ItemData.concat())
      }
    }

  const  handleSubmitForm=async(e)=>
  {
    e.preventDefault();
    
    const data=[{'ItemData':ItemData},{'Total_amount':Amount}];

    await axios.post('http://127.0.0.1:8000/api/add_data/bill',data).catch((error)=>{console.log(error)}).then
    ((response)=>{
      if(response.status===200)
      {
        setItemData([]);
        setAmount(0);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
      })
      }
    })
  }
    
    
return (
    <>
    <Navbar/>
    <div className='container-fluid p-3'>
    <div className='row'>
      <div className='col-sm-2 p-2 border rounded' style={{maxHeight:"450px"}}>
      <>
      <ul className="list-group">
        {data.map((response)=>
        <li type='button' key={response.id} onClick={()=>{ChangeSubItem(response)}} className='list-group-item'>{response.item}</li>)}
      </ul>
      </>
      </div>
      <div style={{marginLeft:'0.3%',maxHeight:"450px"}}  className='col-sm-5 p-1 border rounded'>
      {
        (SubItem!=null)?SubItem.sub_item_data.map((response)=>
        <div type="button" key={response.id}  className="card"
        style={{minWidth:"120px",maxWidth:"140px",maxHeight:"80px !important" ,position:"relative",display:"inline-block",verticalAlign:"middle",marginTop:"1%",marginLeft:"1%"}}>
        <div onClick={()=>{handleBill(response)}}>
        <img  style={{minHeight:"80px",maxHeight:"80px"}} src={"http://localhost:8000/uploads/"+response.image} className="card-img-top" alt="pic" />
        </div>
        <div style={{padding:"0 5px 0 5px"}}>
        <span style={{fontFamily:"Serif",fontWeight:"bold"}} className="card-title">{response.sub_item}</span><br/>
        <span style={{fontFamily:"Serif"}}> <span>&#8377;</span> {response.rate}</span>
        <img onClick={()=>{}} style={{float:"right",width:"20px"}} alt='pic' src={'./icons/icons8-add-image-60.png'}/>
        </div>
        </div>
      ):SubItem
          }
          </div>
      <div className='col'>
      <>
      <div className="card" style={{minHeight:"450px"}}>
        <div className="card-header">
        <span>#T/3/1</span>
        </div>
        <div className="card-body">
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <table id='table' className='table table-sm table-responsive table-striped'>
        <thead style={{position:"sticky"}}>
        <tr>
          <th>S.no</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {
          ItemData.map
          ((re)=>
          <tr key={re.id}>
            <td>{count++}</td>
            <td>{re.sub_item}</td>
            <td><div style={{display:"flex"}}><button onClick={()=>handleBill(re,1)}  className='btn btn-light'>+</button>
            <input style={{width:"50px"}} onChange={()=>{}} className='form-control' value={re.quantity}/>
            <button onClick={()=>handleBill(re,2)} className='btn btn-light'>-</button></div></td>
            <td >{re.rate}</td>
            <td>{re.amount}</td>
            </tr>
            )
        }
      </tbody>
      </table>
      </div>
      </div>
      <div style={{backgroundColor:"silver"}} className='container-fluid'>
        <span>Total =</span>
        <span style={{float:"right"}}>
          {
            Amount
          }
          
        </span>
        </div>
      <div className="card-footer">
      <img alt='pic' type='button' onClick={()=>{setItemData([]);setAmount(0)}} style={{float:"left",width:"38px"}} src={'./icons/delete_6861362.png'}/>
        <button type='submit' onClick={(e)=>{handleSubmitForm(e)}} style={{float:"right"}} className='btn btn-primary'>Print & Save</button>
      </div>
      </div>
      </>
      </div>
    </div>
    </div>
    
    </>
    
)
}
