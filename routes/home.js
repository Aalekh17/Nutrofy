const express=require('express');
const home=express.Router();
const Meal=require('../models/meal')
const Report=require('../models/report')

home.get('/',(req,res,next)=>{
  res.render('home',{pageTitle:'Nutrofy',currentPage:'Nutorfy'})
})
home.get('/dash', async (req, res, next) => {
  try {
    const reports = await Report.fetchAll((reports)=>{
      res.render('dash', { pageTitle: 'Dashboard', currentPage: 'Dashboard', reports: reports });

    });
    
  } catch (err) {
    next(err);
  }
})
home.get('/tips',(req,res,next)=>{
  res.render('fitnesstips',{pageTitle:'Fitness Tips',currentPage:'Fitness Tips'})
})
home.get('/meal',async(req,res,next)=>{
  try {
    const meal = await Meal.fetchAll((meals)=>{
      res.render('mealtrack',{pageTitle:'Track your Meal',currentPage:'Track your Meal',meals:meals})

    });
    
  } catch (err) {
    next(err);
  }
  
})
home.get('/workout',(req,res,next)=>{
  res.render('workout',{pageTitle:'Explore Workouts',currentPage:'Explore Workouts'})
})
home.get('/reportpost',(req,res,next)=>{
  res.render('submitreports',{pageTitle:'Post your Reports',currentPage:'Post your Reports'})
})
home.post('/postreport',(req,res,next)=>{
  const { steps, bp, sugar, heartrate} = req.body;

  
  
  const report = new Report(steps, bp, sugar, heartrate);
  report.save();

  res.redirect('/dash');
})
home.post('/postmeal',(req,res,next)=>{
  const { breakfast_food,breakfast_calories,lunch_food,lunch_calories,dinner_food,dinner_calories} = req.body;


  let total = 
  (Number(breakfast_calories) || 0) + 
  (Number(lunch_calories) || 0) + 
  (Number(dinner_calories) || 0);
  
  const meal = new Meal(breakfast_food,breakfast_calories,lunch_food,lunch_calories,dinner_food,dinner_calories,total);
  meal.save();

  res.redirect('/meal');
})
module.exports=home;