import antfu from '@antfu/eslint-config'
import vitest from '@vitest/eslint-plugin'

export default antfu({
  react: true,

  rules: {
    'node/prefer-global/process': 'off',
    'react-hooks-extra/no-unnecessary-use-prefix': 'off',
    ...vitest.configs.recommended.rules,
    'vitest/max-nested-describe': ['error', { max: 3 }],
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
