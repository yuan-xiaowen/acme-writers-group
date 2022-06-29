const express = require('express')
const app = express()
const path = require('path')
const {faker} = require('@faker-js/faker')
const {Story,User,db} = require('./db.js')


function randomUser() {
  return {
    name: faker.name.findName(),
    bio: faker.lorem.paragraph(1)
  }
}

function randomStory() {
    return {
        title:faker.random.words(),
        body:faker.lorem.paragraph(5),
        favorite:faker.datatype.boolean(),
        userId:Math.ceil(Math.random()*10)
    }
}

const seedData = async()=>{
    await db.sync({force: true})
    await Promise.all(
        Array.from({length:10}).map(element=>User.create(randomUser()))
        )
    await Promise.all(
        Array.from({length:30}).map(element=>Story.create(randomStory()))
    )
}

seedData()

app.use(express.json())
app.use('/assets', express.static('assets'))
app.use('/dist', express.static('dist'))

app.get('/api/users',async(req,res,next)=>{
    try{
      res.send(await User.findAll())
    }catch(err){
        next(err)
    }
})

app.get('/api/users/:id',async(req,res,next)=>{
    try{
      res.send(await User.findByPk(req.params.id))
    }catch(err){
        next(err)
    }
})

app.get('/api/stories',async(req,res,next)=>{
    try{
      res.send(await Story.findAll())
    }catch(err){
        next(err)
    }
})

app.get('/api/users/:id/stories/',async(req,res,next)=>{
    try{
      res.send(await Story.findAll({
        where:{
            userId:req.params.id
        },
        order:[
            ['id', 'ASC'],
        ]
      }))
    }catch(err){
        next(err)
    }
})

app.post('/api/users',async(req,res,next)=>{
    try{
      res.status(201).send(await User.create(req.body))
    }catch(err){
        next(err)
    }
})

app.post('/api/users/:id/stories',async(req,res,next)=>{
    try{
      res.status(201).send(await Story.create(req.body))
    }catch(err){
        next(err)
    }
})

app.delete('/api/users/:id/stories',async(req,res,next)=>{
    try{
      const item = await Story.findByPk(req.params.id)
      await item.destroy()
      res.status(204).send()
    }catch(err){
        next(err)
    }
})

app.delete('/api/users/:id/',async(req,res,next)=>{
    try{
      const item = await User.findByPk(req.params.id)
      await item.destroy()
      res.status(204).send()
    }catch(err){
        next(err)
    }
})

app.get('/api/stories/:id',async(req,res,next)=>{
  const story = await Story.findByPk(req.params.id)
  try{
    if (story.favorite===true){
       await Story.update({favorite:false},{where:{id:req.params.id}})
    }else{
       await Story.update({favorite:true},{where:{id:req.params.id}})
    }
    res.send()
  }catch(err){
    next(err)
  }
})

app.get('/',(req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,'index.html'))
    }catch(err){
        next(err)
    }
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`App is listening at port:${port}`)
})




