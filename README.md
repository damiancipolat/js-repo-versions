# js-versions-projects

###- What is it?
This tool was created so that we can handle different javascript project repositories in a gitlab repository.

###- How to use?
This tool was created so that we can handle different javascript project repositories in a gitlab repository.

###- Projects structure:
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
