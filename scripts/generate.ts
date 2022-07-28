import * as path from 'path';
import * as fs from 'fs';
import * as template from 'lodash.template';
import * as upperfirst from 'lodash.upperfirst';

// 组件名
const componentName = require('../package.json').name;

const svgPath = path.join(__dirname, '../svg');
const targetPath = path.join(__dirname, '../src/icons');
const demoPath = path.join(__dirname, '../src/demos');
// 创建目录
fs.mkdirSync(targetPath);
fs.mkdirSync(demoPath);

const svgIdentifiers = [],
    demoDatas = [];
const generateIcons = filePath => {
    const files = fs.readdirSync(filePath);
    files.forEach(filename => {
        const fileDir = path.join(filePath, filename);
        // 目录文件夹
        if (fs.statSync(fileDir).isDirectory()) {
            demoDatas.push({
                name: filename,
                childern: [],
            });
            generateIcons(fileDir);
        } else {
            // 处理反斜杠
            const module = String.raw`${path.relative(__dirname, fileDir)}`.split('\\').join('/');

            const svgIdentifierAllName = upperfirst(demoDatas[demoDatas.length - 1].name) + upperfirst(path.parse(filename).name);
            let svgMotes = '',
                svgIdentifier = svgIdentifierAllName;
            // 处理中文命名
            if (svgIdentifierAllName.indexOf('_') > -1) {
                svgIdentifier = svgIdentifierAllName.split('_')[0];
                svgMotes = svgIdentifierAllName.split('_')[1];
            }
            svgIdentifiers.push(svgIdentifier);
            demoDatas[demoDatas.length - 1].childern.push({
                name: svgMotes,
                svgIdentifier,
            });
            const temp = template(`
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY    

import * as React from 'react'
import Icon from '@ant-design/icons';

import <%= svgIdentifier%>Svg from '../<%= module%>';
// <%= svgMotes%>
const <%= svgIdentifier%> = (props, ref) => {
    return <Icon component={<%= svgIdentifier%>Svg} {...props} ref={ref}/>
}

export default React.forwardRef(<%= svgIdentifier%>);
                `);
            fs.writeFileSync(
                path.resolve(__dirname, `../src/icons/${svgIdentifier}.tsx`),
                temp({
                    module,
                    svgIdentifier,
                    svgMotes,
                }),
            );
        }
    });
};

const generateEntries = moduleNames => {
    const entryText = moduleNames
        .sort()
        .map(svgIdentifier => `export { default as ${svgIdentifier} } from './${svgIdentifier}';`)
        .join('\n');
    fs.writeFileSync(
        path.resolve(__dirname, '../src/icons/index.tsx'),
        template(`
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY  

<%= entryText%>
    `)({ entryText }),
    );
};

const generateDemoData = demos => {
    demos.forEach(demo => {
        const entryClassText = [],
            entryDataText = [];
        demo.childern.sort().map(child => {
            entryClassText.push(`${child.svgIdentifier},`);
            entryDataText.push(`{
                id: '${child.svgIdentifier}',
                element: <${child.svgIdentifier} />,
                name: '${child.name}',
            },`);
        });

        const entryClass = entryClassText.join('\n');
        const entryData = entryDataText.join('\n');
        fs.writeFileSync(
            path.resolve(__dirname, `../src/demos/${demo.name}.tsx`),
            template(`
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY    

import * as React from 'react';
import copy from 'copy-to-clipboard';
import { message } from 'antd';


import {
<%= entryClass%>
} from '<%= componentName%>';
const initData = [
    <%= entryData%>
];
const ContentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8,150px)',
    gridTemplateRows: '150px 150px',
};
const ItemStyle = {
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
};
const <%= name%> = () => {
    const copyCot = (text: string) => {
        copy(text);
        message.success(text+' copied');
    };
    return (
        <div style={ContentStyle}>
            {initData.map(item => {
                const text = '< '+item.id+' />';
                return (
                    <div key={item.id} style={ItemStyle} onClick={() => copyCot(text)}>
                        <div>
                            {React.cloneElement(item.element, {
                                style: { fontSize: 36, color: '#555' },
                            })}
                        </div>
                        <div>{item.id}</div>
                        <div>{item.name}</div>
                    </div>
                );
            })}
        </div>
    );
};
export default <%= name%>;
        `)({
                entryClass,
                entryData,
                name: upperfirst(demo.name),
                componentName
            }),
        );
    });
};
const prettier = () => {
    const exec = require('child_process').exec;
    exec(`npm run prettier ${targetPath}`, {}, function() {
        // TODO
    });
    exec(`npm run prettier ${demoPath}`, {}, function() {
        // TODO
    });
};

generateIcons(svgPath);
generateEntries(svgIdentifiers);

generateDemoData(demoDatas);
prettier();
