const config = require('config');

const {
  GET
} = require('./request.js');

//Get access data.
const {
  host,
  token
} = config.get('access');

//GITLAB-API request, get FILE from a repository.
const getFile = (projectId,fileName,env) => GET(`${host}/projects/${projectId}/repository/files/${fileName}?ref=${env}`,token);

//GITLAB-API request, retrieve info from a specific project by his Id.
const getProject = (id) => GET(`${host}/projects/${id}/`,token);

//GITLAB-API request, get projects from a group.
const getProjectsGroup = (groupId) => GET(`${host}/groups/${groupId}/projects`,token);

//GITLAB api, get projects from an user.
const getProjectsUser = (userId) => GET(`${host}/users/${userId}/projects`,token);

//GITLAB api, get all the projects.
const getProjectsAll = (userId) => GET(`${host}/projects`,token);

module.exports = {
  getProject,
  getFile,
  getProjectsGroup,
  getProjectsUser,
  getProjectsAll
};