//Include api modules.
const http    = require('http');
const express = require('express');
const config  = require('config');
const path    = require("path");
const fs      = require('fs');
const events  = require('../events.js');

const {
  fetchData
} = require('../service/gitlabService.js');

//REPORT - Controller.
const reportController = async (req,res,next)=>{

  try {

    const result = await fetchData();
    res.status(200).json(result);

  } catch(err){
    res.status(500).json({Error:'Error processiong'});
  }
  
}
//Server controller.
const webController = (req,res)=>{

  try{

    res.sendFile(path.join(__dirname, '../www', req.params[0]));
    
  } catch(err){
    res.status(500).json({error:err});
  }  

}

//Write configuration web files.
const writeConfig = (ip,port)=>{

  const configJs = 'const webConfig = {ip:"'+ip+'",port:"'+port+'"};';
  fs.writeFileSync("./www/config.js", configJs);

}

//Start server.
const runServer = (ip,port)=>{

  //Start Express-js.
  const app    = express();
  const server = http.createServer(app);

  //Write static config.
  writeConfig(ip,port);

  app.use(express.static("public"));

  //Bind route - api.
  app.get('/report',reportController);

  //Bind route - web
  app.get(/^(.+)$/,webController);

  //Start listen mode.
  app.listen(port,ip,() => events.onListen(ip,port));

  //Define server "special" event to handle situations.
  server.on('error',   events.onServerError);
  process.on('SIGINT', ()=>events.onProcessKill(server));
  process.on('SIGTERM',()=>events.onProcessKill(server));
  process.on('unhandledRejection', events.onException);
  process.on('uncaughtException',  (err)=>events.onException(err));

};

module.exports = {
  runServer
};