
const express = require ('express');
const cors = require('cors')
const bodyParser = require ('body-parser')
const events = require('./mongoose.js')
const upevents = require ('./mongoose.js')
const experience = require ('./mongoose.js')
const image = require('./mongoose.js')
const pdf = require ('./mongoose.js')
const sneakpeak = require ('./mongoose.js')
const multer = require('multer')

const app = express()

app.use(cors());
app.use(bodyParser.json());


const port = 5001;
app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})


const Storage = multer.diskStorage({
    destination:function(req,file,cb){
     return cb(null,'./uploads')
    },
    filename:(req, file, cb)=>{
      cb(null,`${file.originalname}`);
    }
  })

  // uploades using multer

  const upload = multer({
    Storage
  }).single('testImage')
  
  
  const upload1 = multer({
    Storage
  }).single('testpdf')
  
  
  const upeventupload =  multer({
    Storage
  }).single("testImage1")
  
  const sneakupload =  multer({
    Storage
  }).single("testImage2")


  // Upload image events..
  app.post('/uploadimg' ,async(req,res)=>{
    upload(req,res,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        const newImage =  new  image.image({
          name: req.body.name,
          event:req.body.event,
          image:{
            data: req.file.buffer,
            contentType:'image/png'
          }
        })
        newImage.save()
        .then(()=>{res.redirect('http://localhost:5173/')})
        .catch(err=>{console.log(err)})
        
       }
    })
  
  })

  // upload pdfs
  app.post('/uploadpdf' ,(req,res)=>{
    upload1(req,res,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        const newPdf = new pdf.pdf({
          name: req.body.name,
          pdf:{
            data: req.file.buffer,
            contentType:'pdf'
          }
        })
        newPdf.save()
        .then(()=>{res.redirect('http://localhost:5173/')})
        .catch(err=>{console.log(err)})
       }
    })
  
  })

  // upload upcoming events

  app.post('/upevents' ,(req,res)=>{
    // console.log(req.body.Image)
    upeventupload(req,res,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        const newUpevent = new upevents.upevents({
          Event: req.body.eventdes,
          Title:req.body.name,
          Image:{
             data: req.file.buffer,
            contentType:'image/png'
          },
          Date:req.body.date
        })
        newUpevent.save()
        .then(()=>{res.redirect('http://localhost:5173/')})
        .catch(err=>{console.log(err)})
       }
    })  
  })

  //upload sneakpeaks
  app.post('/sneakupload' ,async(req,res)=>{
    sneakupload(req,res,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        const newsneak=  new  sneakpeak.sneakpeak({
          name: req.body.name,
          image:{
            data: req.file.buffer,
            contentType:'image/png'
          }
        })
        newsneak.save()
        .then(()=>{res.redirect('http://localhost:5173/')})
        .catch(err=>{console.log(err)})
        
       }
    })
  
  })

  
  // Functions on getting and also deleting several events and posts...
  
app.get('/events', async(req,res)=>{
  
    const event = await image.image.find();
    
    res.send(event)
  })
  app.get('/eventpdf', async(req,res)=>{
    const eventpdf = await pdf.pdf.find();
    
    res.send(eventpdf)
  })
  
  app.get('/upevents', async(req,res)=>{
    const upevent = await upevents.upevents.find();
    res.send(upevent)
  })
  
  app.get('/sneakpeaks', async(req,res)=>{
    const sneakpeak = await events.sneakpeak.find()
    res.send(sneakpeak)
  })
  
  
  app.get('/experience', async(req,res)=>{
    const exp = await experience.experience.find();
    res.send(exp)
  })
  
  app.post("/experience", async(req,res)=>{
    const exp = {
      Name:req.body.Name,
      Batch:req.body.Batch,
      Exp: req.body.Exp
    }
  
    await experience.experience.insertMany(exp)
  })
  
  app.post('/deleteevent',async(req,res)=>{
   const event = {name:req.body.name}
    const allevents = await image.image.findOne(event);
    if(allevents){
     await image.image.deleteOne(allevents)
     
     console.log("deleted")
    }
  

  })
  
  app.post('/deletepdf',async(req,res)=>{
    const event = {name:req.body.name}
     const allevents = await pdf.pdf.findOne(event);
     if(allevents){
      await pdf.pdf.deleteOne(allevents)
      
      console.log("deleted")
     }
  
   })
  
   app.post('/deleteupevent',async(req,res)=>{
    const event = {Title:req.body.Title}
     const allevents = await upevents.upevents.findOne(event);
     if(allevents){
      await upevents.upevents.deleteOne(allevents)
      
      console.log("deleted")
     }

   })
  
   app.post('/deletesneak',async(req,res)=>{
    const event = {name:req.body.name}
     const allevents = await sneakpeak.sneakpeak.findOne(event);
     if(allevents){
      await sneakpeak.sneakpeak.deleteOne(allevents)
      
      console.log("deleted")
     }

   })
  
   app.post('/deleteexp',async(req,res)=>{
    const event = {
        Name:req.body.Name,
        Exp:req.body.Exp 
    }
     const allevents = await experience.experience.findOne({Name:event.Name, Exp:event.Exp});
     if(allevents){
      await experience.experience.deleteOne(allevents)
      
      console.log("deleted")
     }

   })