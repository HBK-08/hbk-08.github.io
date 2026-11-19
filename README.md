# 明烨手记

基于 Astro 的静态课程笔记站。用 Node.js 24，在项目目录运行 `npm ci` 和 `npm run dev` 启动本地站点。`npm run build` 生成 dist，`npm run preview` 预览正式构建。

## 写笔记

把 Markdown 文件放到 src/notes 顶层，沿用已有笔记的文件头。文件名是网址的一部分，course 使用 src/data/courses.ts 里定义的课程 id，order 决定课程页顺序，date 填带引号的 YYYY-MM-DD。二级标题生成页内目录和小节搜索结果，正文可用 LaTeX 数学公式。三篇首发笔记是按既有课程材料撰写的专题短文。

## GitHub Pages

将本项目目录作为独立 GitHub 仓库的根目录，设置 Pages 的构建来源为 GitHub Actions。推送到 main 或手动运行 Publish course notes。工作流读取 GitHub 返回的站点根路径，适配账号主页、自定义域名和仓库子路径。
