const config = require('config');

const {
  fetchData
} = require('../service/gitlabService.js');

const {
  parseTable
} = require('../lib/parser.js');

const branches = config.get('branches');

const {
	host
} = config.get('access');

const {
	source,
	name
} = config.get('origin');

//Run the report in console mode.
const runCmd = async ()=>{
  
  console.log('* Fetching data from: '+host+'\n* Please wait... \n');
  
  //Retrieve projects info from the gitlab api.
  const result = await fetchData();

  if ((result==null)||(result.length===0)){

    console.log('Results not found in the repository.');
    return null;

  } else {

    console.log('"'+name+'", '+result.length+' projects found.');
    console.log('');

    //Parse format to output table.
    const strTable = parseTable(result, branches);

    //Stdout the string table.
    console.log(strTable);

  }

};

module.exports = {
    runCmd
};