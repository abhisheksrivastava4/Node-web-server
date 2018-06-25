var express = require('express');
var hbs = require('hbs');
fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
console.log(__dirname+'views/partials');
app.set('view engine','hbs');

hbs.registerHelper('screamIt',(text) => {
 return text;
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;    
fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    console.log('unable to open file');
});    
next();
});

app.get('/',(req, res)=>{
    res.render('Home.hbs',{
    PageTitle:'Home Page',   
    WelcomeMessage: 'My Web Site'
});
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        PageTitle: 'About Title'
    });
});

app.get('/projects',(req, res) => {
    res.render('projects.hbs',{
        PageTitle: 'Projects'
    });
});

app.get('/bad',(req, res) => {
    res.send({
        error: 'Unable to handle the request'
    });
});

app.listen(port,()=>{
    console.log(`server up on port ${port}`);
});