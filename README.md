# js-versions-projects

### What is it?
This tool was created so that we can handle different javascript project repositories in a gitlab repository.

### How to use?
This tool was created so that we can handle different javascript project repositories in a gitlab repository.

- There are two ways to use this tool, by command line and running a webserver.

#### Command line:
```sh
#Install and link 
npm install && npm link

#Run
repo-versions

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

#### Web server:
```sh
#Install and link 
npm install && npm link

#Run
repo-versions --web --ip 127.0.0.1 --port 8080

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
