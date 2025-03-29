import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,

  rules: {
    'node/prefer-global/process': 'off',
  },

  ignores: [
    '.cursor',
    '.next',
    'node_modules',
    'dist',
    'build',
    'public',
    '**/*.test.ts',
    '**/*.test.tsx',
    'src/components/ui/**/*.tsx',
  ],
})
