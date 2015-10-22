# generator-mithril-webpack [![npm version](https://badge.fury.io/js/generator-mithril-webpack.svg)](https://badge.fury.io/js/generator-mithril-webpack) [![Build Status](https://secure.travis-ci.org/cnatis/generator-mithril-webpack.png?branch=master)](https://travis-ci.org/cnatis/generator-mithril-webpack) [![Coverage Status](https://coveralls.io/repos/cnatis/generator-mithril-webpack/badge.svg?branch=master&service=github)](https://coveralls.io/github/cnatis/generator-mithril-webpack?branch=master) [![Join the chat at https://gitter.im/cnatis/generator-mithril-webpack](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cnatis/generator-mithril-webpack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> [Yeoman](http://yeoman.io) generator

## Current Version Information V0.0.2
This project is still in its infancy and is only suggested for playing with the technology until a stable version is released.

[Mithril Webpack Generator Google Group](https://groups.google.com/forum/#!forum/yeoman-mithril-webpack-generator)

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-mithril-webpack from npm, run:

```bash
npm install -g generator-mithril-webpack
```

Finally, initiate the generator:

```bash
yo mithril-webpack
```

### Mithril WebPack Generator Features

This generator will provide the following features to your new application. Optional features are marked accordingly and the user will be prompted to decide if they would like to include them.

#### WebPack

WebPack is the included bundling package for this generator. WebPack will bundle all required files as well as pre-proccess files from SASS to CSS. WebPack is very extensible and too learn more please visit [the WebPack website](https://webpack.github.io/).

#### SASS

This generator comes packed with a SASS pre-processor. SASS brings many powerful features to CSS which you can read about [on the SASS website](http://sass-lang.com/)

#### Bootstrap [OPTIONAL]

You have the choice to include Bootstrap in your application when you first generate the folder structure. Your application will include Bootstrap SASS which will let you pick and choose the features you wish to use in your web application.

#### jQuery [OPTIONAL]

You also have the choice to include jQuery into your project. jQuery is required for Bootstrap and will be installed if you select to include Bootstrap into your application.

#### Git [OPTIONAL]

Users will be prompted if they would like the generator to initialize a Git repo for their project. If they choose yes, their project will be initialized with a Git repo and an initial commit already made.

### Mithril WebPack Generator Usage
#### Base App Generator

```bash
yo mithril-webpack
```

This generator will create the base application structure for use with this CLI tool.

#### Component Generator

```bash
yo mithril-webpack:component <componentName>
```

This generator will create a component for you using the current directory as the project.

##### Arguments:
componentName

The name of the component will determine the folder name used to hold the components files.

#### Model Generator

```bash
yo mithril-webpack:model <modelName>
```

This generator will create a model file for you using the current directory as the project.

##### Arguments:
modelName

The name of the model will determine the file name of the model

##### Options:
--baseUrl

The base url used for all model requests.

#### Route Generator

```bash
yo mithril-webpack:route <newRoute>
```

This generator will create a view and add it to the applications routes.

##### Arguments:
newRoute

The route url for this view. For example "/profile/new".

##### Options:
--default

Passing the default flag will set this route as the default route at url "/"

## License

MIT
