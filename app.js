const express = require('express');
const Joi = require('joi')

app = express()

app.use(express.json())



PORT = process.env.PORT || 4000


const myBikes = [
    {'id':1,'name':"Daytona 675R"},
    {'id':2,'name':"BMW S1000RR"},
    {'id':3,'name':"BMW GS1250A"},
]

const validate = data =>{
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    return  schema.validate(data)
}

app.get("/",(req,res)=>{
    res.send("Welcome to my bikes API")
})

app.get("/api/bikes/",(req,res)=>{
    res.status(200).send(myBikes)
})

app.get("/api/bikes/:id",(req, res)=>{
    const id = req.params.id
    const bike = myBikes.find(b=>b.id === parseInt(id))
    if(!bike) return res.send("Invalid BIKE ID")
    res.send(bike)
})


app.post("/api/bikes/",(req, res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const bike = {
        id : myBikes.length +1,
        name : req.body.name
    }
    myBikes.push(bike)
    res.send(bike)
})

app.put("/api/bikes/:id",(req, res)=>{
    // check if the given id is valid
    const id = req.params.id
    const bike = myBikes.find(b=>b.id === parseInt(id))
    if(!bike) return res.send("Invalid BIKE ID")

    // if id exists then check for incoming data and validate it
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    bike.name = req.body.name

    res.send(bike)
})


app.delete("/api/bikes/:id",(req, res)=>{
    const id = req.params.id
    const bike = myBikes.find(b=>b.id === parseInt(id))

    const index = myBikes.indexOf(bike)
    myBikes.splice(index,1)
    res.status(204).send(bike)
})


app.listen(PORT,()=>{
    console.log(`Server started listing at port ${PORT}`)
})