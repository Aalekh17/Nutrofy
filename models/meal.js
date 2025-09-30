const fs=require("fs");
const path=require("path");
const rootdir=require("../utils/pathutils");
const mealdatapath=path.join(rootdir,"reportdata","meal.json");

module.exports=class Meal{
  constructor(breakfast_food,breakfast_calories,lunch_food,lunch_calories,dinner_food,dinner_calories,total){
    this.breakfast_food=breakfast_food;
    this.breakfast_calories=breakfast_calories;
    this.lunch_food=lunch_food;
    this.lunch_food=lunch_food;
    this.lunch_calories=lunch_calories;
    this.dinner_food=dinner_food;
    this.dinner_calories=dinner_calories;
    this.total=total;
  }

  save(){
    this.id=Math.random().toString();
    Meal.fetchAll((meals)=>{
      meals.push(this);
      
      fs.writeFile(mealdatapath,JSON.stringify(meals),(err)=>{
        console.log(err);
      });
    });
  }

  static fetchAll(callback){
    fs.readFile(mealdatapath,(err,data)=>{
      callback(!err?JSON.parse(data):[]);
  });

  
}

static findById(mealid,callback){
    this.fetchAll(meals=>{
      const mealfound=meals.find(meal=>meal.id===mealid);
      callback(mealfound);

    })
  }

  static deleteById(mealid,callback){
      this.fetchAll(meals=>{
        meals=meals.filter(meal=>meal.id!==mealid);
        fs.writeFile(mealdatapath,JSON.stringify(meals),callback);
        
  
      })
    }
}