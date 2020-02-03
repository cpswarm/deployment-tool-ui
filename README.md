# CPSwarm Deployment UI
[![Build Status](https://travis-ci.com/cpswarm/deployment-tool-ui.svg?branch=master)](https://travis-ci.com/cpswarm/deployment-tool-ui)
[![Docker Pulls](https://img.shields.io/docker/pulls/linksmart/deployment-ui.svg)](https://hub.docker.com/r/linksmart/deployment-ui/tags)

This UI is compatible with [CPSwarm Deployment Tool](https://github.com/cpswarm/deployment-tool).

## Getting Started
<!-- Instruction to make the project up and running. -->

The project documentation is available on the [Wiki](https://github.com/cpswarm/deployment-tool-ui/wiki).

## Deployment
Refer to [these instructions](https://github.com/cpswarm/deployment-tool/wiki/Setting-up-the-Deployment-Manager) to run all the components. 

To only run the UI:
```
docker run -p 80:80 linksmart/deployment-ui
```

## Development
<!-- Developer instructions. -->


### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your tests
```
npm run test
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Contributing
Contributions are welcome. 

Please fork, make your changes, and submit a pull request. For major changes, please open an issue first and discuss it with the other authors.

## Affiliation
![CPSwarm](https://github.com/cpswarm/template/raw/master/cpswarm.png)  
This work is supported by the European Commission through the [CPSwarm H2020 project](https://cpswarm.eu) under grant no. 731946.
