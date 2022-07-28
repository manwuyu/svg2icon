# 图标库

把图标以英文名_中文名命名 放在svg下，以文件夹分类

会生成src下的 icons 和demos 文件
```
yarn run generate
```


修改docs下的index.md 引用的 src里的demos的文件 

查看效果 
```
yarn run start
```
生成组件库代码

```
yarn run build
```

生成组件文档
```
yarn run doc:build
```

备注 
    1.修改package.json里的name 即可，.umirc.ts里的name 和 生成的组件名会一起修改
    2.svg 下的英文命名不要重复

