import express from 'express';


 // app configuration
 const app = express();

 // middleware
 
 //endpoints
 app.get('/', (req, res) => {
     res.send('API is working');
 });

 app.get ('/hello', (req, res) => {
     res.send('Hello World!');
 })

 app.listen(4001, ()=> console.log('server started on port 4001')); 
