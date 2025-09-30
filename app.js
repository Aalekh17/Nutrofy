const path=require('path');
const express=require('express');
const session=require('express-session');
const home=require('./routes/home');

const app=express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded()); 

app.use(home);



const PORT=3000;
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});