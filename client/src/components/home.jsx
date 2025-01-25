import React from 'react'
import './home.css'
import { useEffect, useState } from 'react'

const Home = () => {
 const [evedata,setEvedata] = useState([]);
 const [evepdf,setEvepdf] = useState([]);
 const [upeve, setUpeve] = useState([]);
 const [exps,setExps] = useState([]);
 const [sneakpeaks, setSneakpeaks]  =useState([]);

//  const [deleve,setdeleve] = useState(false)
//  const [delexp,setdelexp] = useState(false)
//  const [delsneak,setdelsneak] = useState(false)
//  const [delupeve,setdelupeve] = useState(false)
//  const [delpdf,setdelpdf] = useState(false)
 
useEffect(()=>{
  getEvents();
  getExps();
  getSneaks();
  getUpeves();
  getevePdf()
},[])



const getEvents = async() =>{
    const data = await fetch('http://localhost:5001/events');
    const allevents = await data.json()
    setEvedata(allevents);
}

const getevePdf = async()=>{
    const data = await fetch('http://localhost:5001/eventpdf');
    const allpdfs = await data.json()
    setEvepdf(allpdfs);
}

const getUpeves = async()=>{
    const data = await fetch('http://localhost:5001/upevents');
    const allupeves = await data.json()
    setUpeve(allupeves);
}

const getExps = async()=>{
    const data = await fetch('http://localhost:5001/experience');
    const allExps = await data.json()
    setExps(allExps);
}

const getSneaks = async()=>{
    const data = await fetch('http://localhost:5001/sneakpeaks');
    const allsneaks = await data.json()
    setSneakpeaks(allsneaks);
}




const deleteeve = async(e)=>{

    const detail=   {name: e.target.closest('.alleventdisp').querySelector(".eventname").innerText}
      e.target.closest('.alleventdisp').style.opacity = "10%"
       await fetch ('http://localhost:5001/deleteevent',{method:'post',headers:{"Content-Type": "application/json" },body:JSON.stringify(detail)})
    //    setdeleve(deleve=> !deleve)
    }
    const deletepdf = async(e)=>{
       e.target.closest('.alleventdisp').style.opacity = "10%"
      const detail=   {name: e.target.closest('.alleventdisp').querySelector(".eventname").innerText}
      
         await fetch ('http://localhost:5001/deletepdf',{method:'post',headers:{"Content-Type": "application/json" },body:JSON.stringify(detail)})
        //  setdelpdf(delpdf=> !delpdf)
      }
    
      const deleteupeve = async(e)=>{
        e.target.closest('.alleventdisp').style.opacity = "10%"
        const detail=   {Title: e.target.closest('.alleventdisp').querySelector(".eventname").innerText}
        
           await fetch ('http://localhost:5001/deleteupevent',{method:'post',headers:{"Content-Type": "application/json" },body:JSON.stringify(detail)})
        //    setdelupeve(delupeve=> !delupeve)
        }
    
        const deletesneak = async(e)=>{
   e.target.closest('.alleventdisp').style.opacity = "10%"
          const detail=   {name: e.target.closest('.alleventdisp').querySelector(".eventname").innerText}
          
             await fetch ('http://localhost:5001/deletesneak',{method:'post',headers:{"Content-Type": "application/json" },body:JSON.stringify(detail)})
            //  setdelsneak(delsneak=> !delsneak)
          }
    
        const deleteexp = async(e)=>{
          e.target.closest('.alleventdisp').style.opacity = "10%"
          e.target.closest('.alleventdisp').querySelector('.delbtn').style.display = 'none'

          const detail=  
           {Name: e.target.closest('.alleventdisp').querySelector(".stuname").innerText,
            Exp: e.target.closest('.alleventdisp').querySelector(".eventname").innerText
          }
          
             await fetch ('http://localhost:5001/deleteexp',{method:'post',headers:{"Content-Type": "application/json" },body:JSON.stringify(detail)})
            //  setdelexp(delexp=> !delexp)
          }

          const submitted=(e)=>{
            e.closest('.events').querySelector('#eventsname').value = ''
            e.closest('.events').querySelector('#eventdes').value = ''
             e.closest('.events').querySelector('#eventpic').value = ''
          }

  return (
    <div className='all' style={{display:'flex'}}>

<div className="uploads">
    <h1 style={{margin:"1vw auto", textAlign: "center"}}>NSS ADMIN PAGE</h1>
<div className="events" id="events">
<h2>Events</h2>
    <form action="http://localhost:5001/uploadimg" method="post" encType="multipart/form-data">
        <input type="text" id="eventname" name="name" placeholder="Enter event name"/>
        <textarea type="text" id="eventdes"  name="event" placeholder="Enter event description"></textarea>
        <input type="file" id="eventpic" className="files" name="testImage" placeholder="Choose an image to display for the event"/>
        
        <button type="submit" id="submitevent" className='submitevent' onClick={submitted}>Upload</button>
    </form>
</div>

     <div className="events" id="pdf">
        <h2>Event pdf</h2>
   
    <form action="http://localhost:5001/uploadpdf" method="post" encType="multipart/form-data">
        <input type="text" id="eventpdfname" name="name" placeholder="Enter event name"/>
        <input type="file" className="files" id="eventpdf"  name="testpdf" placeholder="Choose an image to display for the event"/>
        <button id="submitpdf" type="submit" className='submitevent'>Upload</button>
    </form> 
</div>

<div className="events" id="upevents">
    <h2>Up coming Events</h2>


    <form action="http://localhost:5001/upevents" method="post" encType="multipart/form-data">
        <input type="text" name="name" id="upevename" placeholder="Enter event name"/>
        <input type="date" name="date" id="upevedate" placeholder="Enter event date"/>
        <textarea name="eventdes" id="upevedes" placeholder="Enter event description"></textarea>
        <input type="file" className="files" id="upeveimg" name="testImage1" placeholder="Choose an image to display for the event"/>
        <button type="submit" id="upevesubmit" className='submitevent'>Upload</button>
    </form>

</div>

<div className="events" id="sneakpeak">
    <h2>Sneak peaks</h2>


    <form action="http://localhost:5001/sneakupload" method="post" encType="multipart/form-data">
        <input type="text" name="name" id="upevename" placeholder="Enter event name"/>
        <input type="file" className="files" id="upeveimg" name="testImage2" placeholder="Choose an image to display for the event"/>
        <button type="submit" id="upevesubmit" className='submitevent'>Upload</button>
    </form>

</div>

</div>

<div className="display">
    <h1 style={{margin:"1vw auto", textAlign: "center"}}>All Data</h1>
   
    <div className="eventsdisp" id="eventsdisp">
        <h2>Events</h2>
      
      {evedata.length!=0? evedata.map(data=>{
         
         return(
            <div className="alleventdisp">
                <li className="eventname">{data.name}</li>
                <button className='delbtn' onClick={deleteeve}>Delete</button>
            </div>
         )
     
      }):<>
      <iframe src="https://lottie.host/embed/5ae433af-ace3-4694-9864-f3a4f4b98e49/BgorAxdjpq.lottie"></iframe>
      </>
       
    }

    </div>
    
    <div className="eventsdisp" id="pdfdisp">
        <h2>Event pdfs</h2>

      {
        evepdf.length!=0? evepdf.map(data=>{

          return(
            <div className="alleventdisp">
            <li className="eventname">{data.name}</li>
            <button className='delbtn' onClick={deletepdf}>Delete</button>
        </div>
          )

        }):<><iframe src="https://lottie.host/embed/5ae433af-ace3-4694-9864-f3a4f4b98e49/BgorAxdjpq.lottie"></iframe></>
      }

    </div>
  
    <div className="eventsdisp" id="upeve">
        <h2>Upcoming Events</h2>
        {upeve.length!=0? upeve.map(data=>{
         
         return(
            <div className="alleventdisp">
                <li className="eventname">{data.Title}</li>
                <button className='delbtn' onClick={deleteupeve}>Delete</button>
            </div>
         )
     
      }):<><iframe src="https://lottie.host/embed/5ae433af-ace3-4694-9864-f3a4f4b98e49/BgorAxdjpq.lottie"></iframe></>
       
    }

    </div>
 
    <div className="eventsdisp" id="experience">
        <h2>Experiences shared</h2>

        {exps.length!=0? exps.map(data=>{
         
         return(
            <div className="alleventdisp">
                <li className="eventname">{data.Exp.slice(0,45)+'...'}</li>
                <li className="stuname">{data.Name.slice(0,25)+'...'}</li>
                <button className='delbtn' onClick={deleteexp}>Delete</button>
            </div>
         )
     
      }):<><iframe src="https://lottie.host/embed/5ae433af-ace3-4694-9864-f3a4f4b98e49/BgorAxdjpq.lottie"></iframe></>
       
    }

    </div>

    <div className="eventsdisp" id="sneaks">
        <h2>Sneak Peaks</h2>

        {sneakpeaks.length!=0? sneakpeaks.map(data=>{
         
         return(
            <div className="alleventdisp">
                <li className="eventname">{data.name}</li>
                <button className='delbtn' onClick={deletesneak}>Delete</button>
            </div>
         )
     
      }):<><iframe src="https://lottie.host/embed/5ae433af-ace3-4694-9864-f3a4f4b98e49/BgorAxdjpq.lottie"></iframe></>
       
    }

    </div>
</div>


      
    </div>
  )
}

export default Home
