# Gesture Tetris

Y4S2 Gesture-Based UI Development Project.

## Description

A Tetris-clone playable using hand gestures. Built with Vue.js and TensorFlow.js.

## Project Setup

First, please make sure you have [Node.js](https://nodejs.org/en/) installed on your system.

You should then run the following command to install the project's dependencies.

```sh
$ npm install
```

### Run a Development Server

```sh
$ npm run serve
```

You should then be able to open a local dev server at http://localhost:8080.

### Create a Production Build

```sh
$ npm run build
```

### Lint and Fix Files

```sh
$ npm run lint
```

### Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Heroku Deployment

The app is deployed to Heroku at [this](https://gestures-project.herokuapp.com) link. You can push to your own Heroku server by first installing the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and then running the following commands:

```sh
$ heroku login -i

$ heroku create

$ heroku buildpacks:add heroku/nodejs

$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static

$ git push heroku main
```
