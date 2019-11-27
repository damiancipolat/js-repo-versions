const config = require('config');
const assert = require('assert');

const {
	runAll
} = require('../lib/parallel.js');

const {
  getProject,
	getFile,
	getProjectsAll,
	getProjectsUser,
  getProjectsGroup  
} = require('../lib/api.js');

const {
  parseContent
} = require('../lib/parser.js');

//CONFIGURATION data.
const branches = config.get('branches');

const {
	source,
	name
} = config.get('origin');

const ROOT_FILE = 'package.json';

//Fetch the file from each environment.
const fetchVersions = async (projectId)=>{

	//Make array of promises.
	const proms = branches.map(env => parseContent(projectId,ROOT_FILE,env));

	//Parallel process.
	const results = await runAll(proms);

	//Parse content.
	return results.map((resu,i) => ({
		env: branches[i],
		content : (resu.success&&resu.body&&resu.body.version)?resu.body.version:null
	}));

}

//Parse project data.
const parseProject = async (project)=>{

	const {
		id,
		description,
		name
	} = project;

	//Get content versions.
	const versionData = await fetchVersions(id);

	return {
		id,
		description,
		name,
		versions:versionData
	};

}

//Fetch data from the origin.
const fetchOrigin = async ()=>{

	let results = [];

	assert((source==='group')||(source==='user')||(source==='all'),'Bad source value');

	if (source==='group'){
		assert(source&&name,'Config error, origin and name is required');
		results = await getProjectsGroup(name);
	}

	if (source==='user'){
		assert(source&&name,'Config error, origin and name is required');
		results = await getProjectsUser(name);
	}		

	if (source==='all')
		results = await getProjectsAll();

	return results;

}

//Retrieve all the data from repository.
const fetchData = async ()=>{

  //Get the list of projects.
  const projects = await fetchOrigin();
	
	assert(projects&&!projects.message,'Results not found');

	//Get promise data.
	return runAll(projects.map(project => parseProject(project)));	

};

module.exports = {
  fetchData,
  parseProject,
  fetchVersions
};