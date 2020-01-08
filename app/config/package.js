/* eslint-disable comma-dangle */
/* eslint-disable quote-props */
module.exports = {
  'main': 'dist/index.js',
  'scripts': {
    'build': 'tsc',
    'start:watch': 'nodemon',
    'start:local': 'cp env/.env.local .env && tsc && node .',
    'test': 'cp env/.env.local .env && jest'
  },
  'devDependencies': {
    '@types/jest': '^24.0.18',
    '@types/node': '^12.11.1',
    '@types/supertest': '^2.0.5',
    '@typescript-eslint/eslint-plugin': '^2.5.0',
    '@typescript-eslint/parser': '^2.5.0',
    'eslint': '^6.8.0',
    'eslint-config-airbnb-base': '^14.0.0',
    'eslint-plugin-import': '^2.19.1',
    'jest': '^24.9.0',
    'nodemon': '^1.19.4',
    'supertest': '^4.0.2',
    'ts-jest': '^24.1.0',
    'ts-node': '^8.4.1',
    'typescript': '^3.7.4'
  },
  'dependencies': {
    'dotenv': '^8.2.0',
    'pretty-console-colors': '^1.0.8'
  }
};
