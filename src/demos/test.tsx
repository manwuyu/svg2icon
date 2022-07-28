// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react';
import copy from 'copy-to-clipboard';
import { message } from 'antd';

import { TestIcon1 } from '@manwuyu/icon';
const initData = [
    {
        id: 'TestIcon1',
        element: <TestIcon1 />,
        name: '测试图标',
    },
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
const Test = () => {
    const copyCot = (text: string) => {
        copy(text);
        message.success(text + ' copied');
    };
    return (
        <div style={ContentStyle}>
            {initData.map((item) => {
                const text = '< ' + item.id + ' />';
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
export default Test;
