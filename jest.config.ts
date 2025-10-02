export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Required for React components
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.app.json', // Point to your tsconfig
        diagnostics: true, // Enable detailed TypeScript errors
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    '^@component/(.*)$': '<rootDir>/src/components/$1', // Support custom paths
    '^@service/(.*)$': '<rootDir>/src/services/$1',
    '^@page/(.*)$': '<rootDir>/src/pages/$1',
    '^@util/(.*)$': '<rootDir>/src/utils/$1',
  },
  moduleDirectories: ['node_modules', 'src'], // Support custom paths resolution
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Include jest.setup.ts
};
