const fs=require("fs");
const path=require("path");
const rootdir=require("../utils/pathutils");
const reportsdatapath=path.join(rootdir,"reportdata","reports.json");

module.exports=class Report{
  constructor(steps,bp,sugar,heartrate){
    this.steps=steps;
    this.bp=bp;
    this.sugar=sugar;
    this.heartrate=heartrate;
  }

  save(){
    this.id=Math.random().toString();
    Report.fetchAll((reports)=>{
      reports.push(this);
      
      fs.writeFile(reportsdatapath,JSON.stringify(reports),(err)=>{
        console.log(err);
      });
    });
  }

  static fetchAll(callback){
    fs.readFile(reportsdatapath,(err,data)=>{
      callback(!err?JSON.parse(data):[]);
  });

  
}

static findById(reportid,callback){
    this.fetchAll(reports=>{
      const reportfound=courses.find(report=>report.id===reportid);
      callback(reportfound);

    })
  }

  static deleteById(reportid,callback){
      this.fetchAll(reports=>{
        reports=reports.filter(report=>report.id!==reportid);
        fs.writeFile(reportsdatapath,JSON.stringify(reports),callback);
        
  
      })
    }
}