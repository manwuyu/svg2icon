module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/eslint')],
    rules: {
        // your rules
    },
    ignorePatterns: ['.eslintrc.js'],
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
};
