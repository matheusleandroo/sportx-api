# SportX API

System for registering customers in a sports store.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

<h3>Prerequisites</h3>

<h4>NodeJS</h4>

You need to install NodeJS on your computer before you can use "**SportX API**". You can install NodeJS by following <a href="https://nodejs.org/en/download/package-manager/">these instructions</a>.

Once you have completed the installation process, try typing **```npm -v```** into your command line. You should get a response with the version of NodeJS.

<h4>Yarn</h4>

Once you have NodeJs instaled, you need to install Yarn. You can install Yarn by following <a href="https://yarnpkg.com/en/docs/getting-started">these instructions</a>.

After instalition, try typing **```yarn -v```** into your command line. You should get a response with the version of Yarn.

<h4>Docker</h4>

You need to install Docker on your computer before you can use "**SportX API**". You can install Docker by following <a href="https://www.docker.com/get-started">these instructions</a>.

Once you have completed the installation process, try typing **```docker -v```** into your command line. You should get a response with the version of Docker.

If you are using Linux distributions, is recommended following <a href="https://docs.docker.com/install/linux/linux-postinstall/">these instructions</a> to manage Docker as a non-root use.

<h4>PostgreSQL</h4>

You need to configure PostgreSQL on your computer before you can use "**SportX API**". You can configure PostgreSQL by following <a href="https://hub.docker.com/_/postgres">these instructions</a>.

<h4>REST API Client</h4>

Finally, you will need a rest api client to test "**SportX API**". Examples:

<ul>
  <li><a href="https://insomnia.rest/">Insomnia</a></li>
  <li><a href="https://www.getpostman.com/">Postman</a></li>
  <li><a href="https://install.advancedrestclient.com/install">Advanced REST Client</a></li>
</ul>

It is recommended to install the extension ESLint, Prettier, EditorConfig and edit the code editor' settings:
```
  "files.eol": "\n",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
```

## Deploy

After clone repository, go to folder and follow this steps:

- Create a **postgres** database;
- Create a file **`.env`** based on the file **`.env.example`**;
- Put your credentials inside **`.env`**;
- Run **`yarn`** to install dependencies;
- Run **`yarn sequelize db:migrate`** to creat the migrations;
- Run **`yarn dev`** to start application.

Now you can use your REST API Client to test "**SportX API**".

## Built With

<ul>
  <li>NodeJS</li>
</ul>

## Tools

<ul>
  <li>Docker</li>
  <li>PostgreSQL</li>
  <li>Sequelize</li>
  <li>Sucrase + Nodemon;</li>
  <li>ESLint + Prettier + EditorConfig;</li>
</ul>

## Authors

<ul>
  <li><a href="http://matheusleandro.com">Matheus Leandro</a></li>
</ul>

<h3>License</h3>

This project is licensed under the MIT License - see the <a href="https://github.com/matheusleandroo/reactjs-crud/blob/master/LICENSE">LICENSE.md</a> file for details.
