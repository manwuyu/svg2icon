import { defineConfig } from 'dumi';
const componentName = require('./package.json').name;

export default defineConfig({
    title: 'test',
    description: '图标库',
    outputPath: 'docs-dist',
    base: '/icons/',
    publicPath: '/icons/',
    exportStatic: {},
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: componentName,
                libraryDirectory: 'src/icons',
                camel2DashComponentName: false,
            },
            componentName,
        ],
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true,
            },
            'antd',
        ],
    ],
    chainWebpack(memo) {
        memo.module
            .rule('svg')
            .test(/\.svg?/)
            .uses.delete('file-loader');

        memo.module
            .rule('svg')
            .test(/\.svg$/)
            .use('@svgr/webpack')
            .loader('@svgr/webpack');
    },
});
