/**
 * Main file with structure questions and logic.
 */

const Generator = require('yeoman-generator');
const fs = require('fs');
const dotenv = require('dotenv');
const CONFIG = require('./config');

// Set config docenv by file.
dotenv.config();

/**
 * @class App
 *
 * @description Class that contains all logic for received and
 *              create seed application.
 *
 * @author Jose J. Pérez Rivas | JoseJPR
 */
module.exports = class App extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    /**
     * Calling the super constructor is important so our
     * generator is correctly set up
     */
    super(args, opts);

    // Generate config variable.
    this.configStart;
    this.configNpm;
    this.configApp;
    this.configCrud;

    // Clear terminal.
    process.stdout.write('\x1b[2J');
  }

  /**
   * @function prompting
   *
   * @description This function show all prompts that the user need.
   *
   * @author Jose J. Pérez Rivas | JoseJPR
   */
  async prompting() {
    // Message welcome.
    this.log(CONFIG.STRINGS.welcome);

    // Answer to user if continue or not.
    this.configStart = await this.prompt(CONFIG.PROMPTS.configStart);

    // If the user select "No" we stop this process.
    if (this.configStart.start === false) {
      process.exit(0);
    }

    // Message start step.
    this.log(CONFIG.STRINGS.stepConfigNpm);

    // Config basic data of NPM project.
    this.configNpm = await this.prompt(CONFIG.PROMPTS.configNpm);

    // Message NodeJS step.
    this.log(CONFIG.STRINGS.stepConfigApp);

    // Config NodeJS Server
    this.configApp = await this.prompt(CONFIG.PROMPTS.configApp);

    // Message CRUD step.
    this.log(CONFIG.STRINGS.stepConfigCrud);

    // Config CRUD
    this.configCrud = await this.prompt(CONFIG.PROMPTS.configCrud);
  }

  /**
   * @function writing
   *
   * @description This function work for create and copy all files.
   *
   * @author Jose J. Pérez Rivas | JoseJPR
   */
  async writing() {
    /**
     * Create package.json file
     */

    // Set Project Main config
    CONFIG.PACKAGE.name = this.configNpm.name.match(/[A-Z][a-z]+|[0-9]+/g).join('-').toLowerCase();
    CONFIG.PACKAGE.version = this.configNpm.version;
    CONFIG.PACKAGE.description = this.configNpm.description;
    CONFIG.PACKAGE.author = this.configNpm.author;
    CONFIG.PACKAGE.license = this.configNpm.license;

    // Add a script for each environment
    if (this.configApp.environments && this.configApp.environments.length > 0) {
      this.configApp.environments.forEach((e) => {
        CONFIG.PACKAGE.scripts[`start:${e.toLowerCase()}`] = `cp env/.env.${e.toLowerCase()} .env && node .`;
      });
    }

    // Set Server Library
    switch (this.configApp.server) {
      case 'Express':
        CONFIG.PACKAGE.dependencies.express = CONFIG.VERSIONS.express;
        CONFIG.PACKAGE.devDependencies['@types/express'] = CONFIG.VERSIONS['@types/express'];
        break;
      case 'Fastify':
        CONFIG.PACKAGE.dependencies.fastify = CONFIG.VERSIONS.fastify;
        break;
      case 'Polka':
        CONFIG.PACKAGE.dependencies.polka = CONFIG.VERSIONS.polka;
        CONFIG.PACKAGE.dependencies['body-parser'] = CONFIG.VERSIONS['body-parser'];
        break;
      case 'Koa':
        CONFIG.PACKAGE.dependencies.koa = CONFIG.VERSIONS.koa;
        CONFIG.PACKAGE.dependencies['koa-router'] = CONFIG.VERSIONS['koa-router'];
        CONFIG.PACKAGE.dependencies['koa-body'] = CONFIG.VERSIONS['koa-body'];
        CONFIG.PACKAGE.dependencies['koa-logger'] = CONFIG.VERSIONS['koa-logger'];
        CONFIG.PACKAGE.devDependencies['@types/koa'] = CONFIG.VERSIONS['@types/koa'];
        CONFIG.PACKAGE.devDependencies['@types/koa-router'] = CONFIG.VERSIONS['@types/koa-router'];
        CONFIG.PACKAGE.devDependencies['@types/koa-logger'] = CONFIG.VERSIONS['@types/koa-logger'];
        break;
      default:
        CONFIG.PACKAGE.dependencies.fastify = CONFIG.VERSIONS.fastify;
        break;
    }

    // Copy TypeScript config file
    this.fs.copyTpl(
      this.templatePath('typescript/tsconfig.json'),
      this.destinationPath('tsconfig.json'),
    );

    // Copy ESLint config file
    this.fs.copyTpl(
      this.templatePath('eslint/.eslintrc.json'),
      this.destinationPath('.eslintrc.json'),
    );
    this.fs.copyTpl(
      this.templatePath('eslint/.eslintignore'),
      this.destinationPath('.eslintignore'),
    );

    // Add Jest config to package.json
    const jestconfig = fs.readFileSync(`${__dirname}/templates/jest/jestconfig.json`);
    CONFIG.PACKAGE.jest = JSON.parse(Buffer.from(jestconfig).toString());

    // Add Nodemon config to package.json
    const nodemonconfig = fs.readFileSync(`${__dirname}/templates/nodemon/nodemonconfig.json`);
    CONFIG.PACKAGE.nodemonConfig = JSON.parse(Buffer.from(nodemonconfig).toString());

    // Add PouchDB config to package.json
    if (this.configCrud.pouchdb) {
      CONFIG.PACKAGE.dependencies.pouchdb = CONFIG.VERSIONS.pouchdb;
      CONFIG.PACKAGE.devDependencies['@types/pouchdb'] = CONFIG.VERSIONS['@types/pouchdb'];
      CONFIG.PACKAGE.scripts['create:seed'] = 'cp env/.env.local .env && tsc && node ./dist/seed.js';
      this.fs.copyTpl(
        this.templatePath('src/common/seed/seed.ts'),
        this.destinationPath('src/seed.ts'),
      );
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), CONFIG.PACKAGE);

    /**
     * Create env file
     */

    // Copy ENV file with custom ip address and port.
    this.fs.copyTpl(
      this.templatePath('env/.env'),
      this.destinationPath('env/.env.local'),
      {
        host: this.configApp.host,
        port: this.configApp.port,
        dbName: this.configCrud.pouchdb ? `db-${this.configNpm.name.match(/[A-Z][a-z]+|[0-9]+/g).join('-').toLowerCase()}` : '',
      },
    );

    // Add a env files for each environment
    if (this.configApp.environments && this.configApp.environments.length > 0) {
      this.configApp.environments.forEach((e) => {
        this.fs.copyTpl(
          this.templatePath('env/.env'),
          this.destinationPath(`env/.env.${e.toLowerCase()}`),
          {
            host: this.configApp.host,
            port: this.configApp.port,
            dbName: this.configCrud.pouchdb ? `db-${this.configNpm.name.match(/[A-Z][a-z]+|[0-9]+/g).join('-').toLowerCase()}` : '',
          },
        );
      });
    }

    /**
     * Create doc folder
     */

    // Copy Config DOC folder with QAC and other README.md files.
    this.fs.copyTpl(
      this.templatePath('doc/'),
      this.destinationPath('doc/'),
    );

    /**
     * Create main application folder with custom server library
     */

    // Copy common files.
    this.fs.copyTpl(
      this.templatePath('src/common/endpoints/root.ts'),
      this.destinationPath('src/config/endpoints/root.ts'),
    );
    this.fs.copyTpl(
      this.templatePath('src/common/types/object.ts'),
      this.destinationPath('src/types/object.ts'),
    );
    this.fs.copyTpl(
      this.templatePath('src/common/__tests__/root.spec.ts'),
      this.destinationPath('src/__tests__/root.spec.ts'),
    );
    // Copy main folder for selected server library.
    this.fs.copyTpl(
      this.templatePath(`src/${this.configApp.server.toLowerCase()}/index.ts`),
      this.destinationPath('src/index.ts'),
    );
    this.fs.copyTpl(
      this.templatePath(`src/${this.configApp.server.toLowerCase()}/controllers/root.ts`),
      this.destinationPath('src/controllers/root.ts'),
    );
    this.fs.copyTpl(
      this.templatePath(`src/${this.configApp.server.toLowerCase()}/routes/root.ts`),
      this.destinationPath('src/routes/root.ts'),
    );
    this.fs.copyTpl(
      this.templatePath(`src/${this.configApp.server.toLowerCase()}/services/root.ts`),
      this.destinationPath('src/services/root.ts'),
    );

    let environments = '';
    if (this.configApp.environments && this.configApp.environments.length > 0) {
      this.configApp.environments.forEach((e) => {
        environments += `* .env.${e.toLowerCase()}\n`;
      });
    }
    this.fs.copyTpl(
      this.templatePath('readme/README.md'),
      this.destinationPath('README.md'),
      {
        name: this.configNpm.name,
        server: this.configApp.server,
        seed: this.configCrud.pouchdb ? CONFIG.STRINGS.seed : '',
        environments,
      },
    );
    fs.mkdirSync(this.destinationPath('assets/'));
    fs.copyFileSync(
      this.templatePath(`assets/banner-${this.configApp.server.toLowerCase()}.jpg`),
      this.destinationPath('assets/banner.jpg'),
    );
    // Copy common files and lib with pouchdb wrapper, and article crud example.
    if (this.configCrud.pouchdb) {
      this.fs.copyTpl(
        this.templatePath('src/common/endpoints/articles.ts'),
        this.destinationPath('src/config/endpoints/articles.ts'),
      );
      this.fs.copyTpl(
        this.templatePath('src/common/libs/pouchdb.ts'),
        this.destinationPath('src/libs/pouchdb.ts'),
      );
      this.fs.copyTpl(
        this.templatePath('src/common/__tests__/articles.spec.ts'),
        this.destinationPath('src/__tests__/articles.spec.ts'),
      );
      this.fs.copyTpl(
        this.templatePath('src/common/__mocks__/articles.ts'),
        this.destinationPath('src/__mocks__/articles.ts'),
      );
      this.fs.copyTpl(
        this.templatePath(`src/${this.configApp.server.toLowerCase()}/controllers/articles.ts`),
        this.destinationPath('src/controllers/articles.ts'),
      );
      this.fs.copyTpl(
        this.templatePath(`src/${this.configApp.server.toLowerCase()}/routes/articles.ts`),
        this.destinationPath('src/routes/articles.ts'),
      );
      this.fs.copyTpl(
        this.templatePath(`src/${this.configApp.server.toLowerCase()}/services/articles.ts`),
        this.destinationPath('src/services/articles.ts'),
      );
    }
  }

  /**
   * @function install
   *
   * @description This function install all dependences into new project.
   *
   * @author Jose J. Pérez Rivas | JoseJPR
   */
  async install() {
    this.npmInstall();
  }
};
