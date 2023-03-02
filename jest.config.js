module.exports = {
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    moduleNameMapper: {
        '@/tests/(.+)': '<rootDir>/tests/$1',
        '@/(.+)': '<rootDir>/src/$1'},
    roots: [
        '<rootDir>/src',
        '<rootDir>/tests'
  ],
    transform: {
        '\\.ts$': 'ts-jest'
    }
};
