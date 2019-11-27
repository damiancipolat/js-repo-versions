const process = require('process');

//On server internal error.
const onServerError = ()=>console.info('SERVER ERROR');

//On server start.
const onListen = (ip,port)=>{

  console.info('ᕦ(ò_óˇ)ᕤ - Report server');
  console.info(`Running on: ${ip}:${port}`);
  console.info('');
  console.info(`---> Open a browser on this url http://${ip}:${port} to see the dashboard.`);

}

//When the process receive kill signal.
const onProcessKill = server =>{
  
  console.info('Finishing server');
  server.close(()=>process.exit(0));

}

//When in the server happen a uncaugth exception.
const onException = err => console.info(err);

module.exports = {
  onListen,
  onProcessKill,
  onServerError,
  onException
};