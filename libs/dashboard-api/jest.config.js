module.exports = {
  name: 'dashboard-api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dashboard-api',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
