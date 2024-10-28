/**
 * 自动生成docs目录下的内容
 */
const textMap = {
  browser: "浏览器",
  jsvascript: "jsvascript",
  mobile: "移动端",
  others: "其他",
  performance: "performance",
  redux: "redux",
  thinking: "个人思考",
  webview: "webview",
};

// 自定义排序配置
const customOrder = [
  'jsvascript',
  'browser',
  'redux',
  'performance',
  'webview',
  'mobile',
  'thinking',
  'others',
];


const fs = require("fs");
const path = require("path");

const blogsDir = path.join(__dirname, "../docs", "blogs");
const sidebarFilePath = path.join(__dirname, '../docs', '.vitepress', 'sidebar.js');

function getBlogStructure(dir) {
  const result = [];

  // 读取目录
  const folders = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => item.isDirectory());

  for (const folder of folders) {
    const folderPath = path.join(dir, folder.name);
    const items = [];

    // 读取文件夹中的文件
    const files = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((item) => item.isFile() && item.name.endsWith(".md"));

    for (const file of files) {
      const fileName = file.name.replace(".md", ""); // 去掉 .md 后缀
      const link = path
        .join("/blogs", folder.name, fileName)
        .replace(/\\/g, "/"); // 生成相对路径
      items.push({
        text: fileName,
        link: link,
      });
    }

    // 将文件夹信息添加到结果数组中
    result.push({
      originText: folder.name, // 原始路径名称
      text: textMap[folder.name] || folder.name,
      collapsible: true,
      collapsed: true,
      items: items,
    });
  }

  // 根据自定义排序配置对结果进行排序
  result.sort((a, b) => {
    const indexA = customOrder.indexOf(a.originText);
    const indexB = customOrder.indexOf(b.originText);
    
    // 如果在 customOrder 中找不到，默认放在最后
    return (indexA === -1 ? customOrder.length : indexA) - (indexB === -1 ? customOrder.length : indexB);
  });

  return result;
}

const blogStructure = getBlogStructure(blogsDir);

// 将结果写入到 sidebar.js 文件
const sidebarContent = `// !!!由代码自动生成，无需更改。\n export const sidebar = ${JSON.stringify(blogStructure, null, 2)};\n`;

fs.writeFileSync(sidebarFilePath, sidebarContent, 'utf8');