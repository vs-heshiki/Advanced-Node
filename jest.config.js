module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/infra/typeorm/data-source.ts'
  ],
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/*.spec.ts'
  ],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  setupFiles: ['dotenv/config']
}
