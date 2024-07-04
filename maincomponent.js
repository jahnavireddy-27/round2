import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { Accordion ,Card,Button} from 'react-bootstrap';
export default function MainComponent (){
    const url=""
    //url of json server running celebrities json data
    const [username,setUsername]=useState("");
    const[allusers,setAllUsers]=useState([]);
    axios.fetch(url).then((posRes)=>{
        const allData=Object.entries(posRes.data);//json to array
        setAllUsers(allData);
    })
    const [data,setData]=useState({});

       //  format of data returned   data={
	// 	"id": 1,
	// 	"first": "Aidan",
	// 	"last": "Wang",
	// 	"dob": "1973-10-16",
	// 	"gender": "male",
	// 	"email": "aidan.wang@example.com",
	// 	"picture": "https://randomuser.me/api/portraits/med/men/93.jpg",
	// 	"country": "New Zealand",
	// 	"description": "This character description generator will generate a fairly random description of a belonging to Aidan Wang. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details of Aidan Wang."
	// }
    useEffect(()=>{
        axios.get(url+`{obj.first}`).then(
            (PosRes)=>{
                const data=PosRes.data;
 

            },(errRes)=>{
                console.log("error in fetching data")
            }
        )

    },[])

   const handleClick=(item)=>{
        const obj ={
            "first":{username}
        }
        axios.get(url,obj).then((PosRes)=>{
            console.log(posRes.data)
        })

    }     

    const edituser=(item)={
        axios.post(url,item).then((posRes)=>{
            console.log("data edit succesful");
        },()=>{

        }

        )
    }

    const deleteuser=(item)={
        axios.delete(url,item.id).then((posRes)=>{
            console.log(posRes.data)

        },(errRes)=>{
            console.log("error i updating info");

        })
    }
    return (
       <div>
        <Accordian defaultActiveKey='0'>
        {allusers.map((item)=>(
            <Card>
            <Card.Header>
        <Accordion.Toggle as={Button}>  
        <label>{item.first}</label>  
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse>
            <Card.Body>  
            <label className='form-control'>Age</label>
                                <input className='form-control' type="text">{item.dob}</input>

                                <label className='form-control'>Gender</label>
                                <select>
                                    <option value="Male" selected ></option>
                                    <option value="Female"></option>
                                    <option value="Rather not say"></option>
                                </select>


                                <label className='form-control'>Country</label>
                                <textarea>{item.country}</textarea>

                                <label className='form-control'>Description</label>
                                <textarea>{item.description}</textarea>

                                {/* button for edit and delete  w cn use font awesome icons */}
                                
                                <button className='fav fav' onClick={()=>{edituser(item)}}>edit</button>
                                <button className='fav fav' onClick={()=>{deleteuser(item)}}>delete</button>
                               
                               </Card.Body>
                               </Accordion.Collapse>
                               </Card>
        ))}
        </Accordion>
            

            
            <input name="username" placeholder="search" className="form-control" onChange={(e)=>{
                setUsername(e.target.value)
            }}></input>
            <button onClick={handleClick}>search</button>
               
            </div>     

         
    
    );
}