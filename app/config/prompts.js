module.exports = {
  configStart: [
    {
      type: 'confirm',
      name: 'start',
      message: '🚀 Do you want to continue?',
      default: true,
      store: true
    },
  ],
  configNpm: [
    {
      type: 'input',
      name: 'name',
      message: 'The Project Name',
      default: 'NodeJS Application',
      store: true
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version (default: 1.0.0)',
      default: '1.0.0',
      store: true
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      default: '',
      store: true
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: '',
      store: true
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      default: 'ISC',
      store: true
    }
  ],
  configApp: [
    {
      type: 'list',
      name: 'server',
      message: 'Select the library that you want to add to your project? (default: Fastify)',
      choices: [
        'Express',
        'Fastify',
        'Polka',
        'Koa'
      ],
      default: 'Fastify',
      required: true,
      store: true
    },
    {
      type: 'input',
      name: 'host',
      message: 'Write IP Address to assign to the local environment web server? (default: 127.0.0.1)',
      default: '127.0.0.1',
      required: true,
      store: true
    },
    {
      type: 'input',
      name: 'port',
      message: 'And the Port number? (default: 3000)',
      default: 3000,
      required: true,
      store: true
    },
    {
      type: 'checkbox',
      name: 'environments',
      message: 'Do you want to include some other environment? (ℹ️  Press Enter for skip)',
      choices: [
        'Develop',
        'QA',
        'Staging',
        'Production',
      ],
      store: true,
    }
  ],
  configCrud: [
    {
      type: 'confirm',
      name: 'pouchdb',
      message: '🎲 Do you want to add an example CRUD to this project?',
      default: true,
      store: true
    }
  ]
};
