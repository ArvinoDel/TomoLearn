module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: {
        module: 'commonjs',
        moduleResolution: 'node',
        jsx: 'react-jsx',
      },
    },
  },
};
