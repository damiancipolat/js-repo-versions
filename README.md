## What is it?
This tool was created so that we can handle different javascript project repositories in a gitlab repository. The idea of this project is that we can see from a single view, the different versions that we work on our projects. With this tool we can improve the administration and passage of versions.


## How to use?
This tool was created so that we can handle different javascript project repositories in a gitlab repository.

- There are two ways to use this tool, by **command line** and running a **webs server**.

#### Command line:
You can use this tool to have a fast view of the differents versions of the projects in a console, ideal for developers or architects.

Run this commands:
```sh
#Install and link 
$ npm install && npm link

#Run
$ repo-versions

#Output

* Fetching data from: https://gitlab.damiancipolat.com/api/v4
* Please wait... 

"ms-projects", 11 projects found.

┌──────────────────────────────┬────────────────────┬────────────────────┬────────────────────┐
│ Projects                     │ develop            │ staging            │ prod               │
├──────────────────────────────┼────────────────────┼────────────────────┼────────────────────┤
│ ms-config                    │ X                  │ X                  │ X                  │
├──────────────────────────────┼────────────────────┼────────────────────┼────────────────────┤
│ ms-api                       │ 2.0.6              │ 2.0.6              │ 2.0.6              │
├──────────────────────────────┼────────────────────┼────────────────────┼────────────────────┤
│ ms-processor                 │ X                  │ 1.0.0              │ 1.0.0              │
└──────────────────────────────┴────────────────────┴────────────────────┴────────────────────┘

```
To see the **HELP** section:

```sh
[damiancipolat@localhost js-repo-versions]$ repo-versions -h
Usage: repo-versions [options]

Options:
  -w, --web          Start a webserver to show the report dashboard.
  -p, --port [port]  Define webserver listen port.
  -i, --ip   [ip]    Define webserver listen ip address.
  -h, --help         output usage information
```


#### Web server:
You can use this tool to have a more beauty view of the versions, maybe to use in a meeting.

<img src="https://github.com/damiancipolat/js-repo-versions/blob/master/doc/web.png?raw=true" width="900px"/>

Run this commands:
```sh
#Install and link 
$ npm install && npm link

#Run
$ repo-versions --web --ip 127.0.0.1 --port 8080

#Output

ᕦ(ò_óˇ)ᕤ - Report server
Running on: 127.0.0.1:8080

---> Open a browser on this url http://127.0.0.1:8080 to see the dashboard.

```

## Projects structure:
We are using projects with this scaffolding:

```sh
project-1/
├──package.json
├──...
project-2/
├──package.json
├──...
project-3/
├──package.json
├──...

```

An example of the package.json:

```json
{
  "name": "js-report-of-versions",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "web": "node index.js --web"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cli-table": "^0.3.1",
    "commander": "^4.0.1",
    "config": "^3.2.4",
    "express": "^4.17.1",
    "node-fetch": "^2.6.0"
  }
}
```

We sugges that you have different branches example: **develop, stage, production** and have differents environment for each branch.

## Configuration:
The tool use a configuration file located in the path **/config/default.json** with this format:

```json
{
  "access":{
    "host":  "https://gitlab.xxxxxxxx.dev/api/v4",
    "token": "aaaaaaaaaaaaaaaaaaaa"
  },  
  "branches":[ "develop","staging","prod"],
  "origin":{
    "source":"group",
    "name":"the-face"
  }
}
```

#### Sections:

1. **Access**: In this section we set the host and the access-token. Use this link to get it. https://docs.gitlab.com/ee/api/README.html#personal-access-tokens
2. **Branches**: We put in array the list of branches of out environments.
3. **Origin**: In this part we define the origin in "source" the options are "group" , "user", "all".
    * Group: Are the projects from a specific group, example the-matrix/ms-api, in this case set the value in "name" field.
    * User: Are the projects from a specific user, in this case set the value in "name" field.
    * All: Are all the visible projects from this token, is'nt necessary to use the "name" field.   
