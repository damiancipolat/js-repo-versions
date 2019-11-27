const Table = require('cli-table');

const {
	decode64
} = require('./decoder.js');

const {
  getFile
} = require('../lib/api.js');

//GITLAB api, extract the content of a file.
const parseContent = async (projectId,rootFile,env)=>{
  
  //Fetch file from api.
  const fileContent = await getFile(projectId,rootFile,env); 
  
  const {
		content
	} = fileContent;
  
	if (content){
        
		//Base64 decode.
		const file = decode64(content);

		//Parse json.
		return JSON.parse(file);

	}

	return null;

};

//TABLE - array parser - parse version object.
const parseVersion = (verObj)=>verObj.map(e=>e.content||'X');

//TABLE - array parser.
const parseTable = (result, branches)=>{

  //Define constants.
  const nameWidth = 30;
  const colWidth  = 20;

  //Prepare columns.  
  const columns   = ['Projects'].concat(branches);
  const colWidths = [nameWidth].concat(branches.map(()=>colWidth));

  //Create table.
  const table = new Table({
    head: columns, 
    colWidths
  });

  //Parse result lines.
  result
    .map(e => [e.body.name].concat(parseVersion(e.body.versions)))
    .forEach(e => table.push(e));

  //Return the table with format.
  return table.toString();

}

module.exports = {
  parseContent,
  parseTable
};