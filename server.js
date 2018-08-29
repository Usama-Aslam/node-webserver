const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

var app=express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partial');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('UpperCase',(text)=>{
    return text.toUpperCase() 
})
app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
    var log= new Date().toString() +" "+req.url; 
    console.log(log)
    fs.appendFile('server.log',log+'\n',err=>{
       if(err)
        console.log("error",err)
    })
    next()
})
app.use((req,res,next)=>{
    res.render('maintainance.hbs',{
        titleAbout:'maintainance is underProcess'
    })
})
/* app.get('/',(req,res)=>{
    res.send({
        name:'Usama',
        age:25
    })
}) */

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        titleAbout:'home',
        welcomeMessage:'Welcome to HomePage janann',
    })
})

app.get('/about',(req,res)=>{
    // res.send('<h1>about page</h1>') to get any response from server
    res.render('about.hbs',{
        titleAbout:'about'
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        error:'this is error'
    })
})

app.listen(3000,()=>{
    console.log('server is running')
})