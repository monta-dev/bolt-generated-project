module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'node',
      moduleFileExtensions: ['ts', 'js'],
      transform: {
        '^.+\\.ts$': 'ts-jest'
      },
      testMatch: ['**/test/**/*.test.ts'],
      collectCoverage: true,
      coverageDirectory: 'coverage',
      coverageReporters: ['text', 'lcov'],
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/test/',
        '/out/'
      ],
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json'
        }
      }
    };
