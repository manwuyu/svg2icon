export default {
    esm: 'babel',
    cjs: { type: 'babel', lazy: true },
    autoprefixer: {
        browsers: ['ie>9', 'Safari >= 6'],
    },
    runtimeHelpers: true,
};
