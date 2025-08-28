# 图片一键转 PDF

一个简单、安全、完全在浏览器本地运行的图片转 PDF 工具。您的所有文件都无需上传至服务器，100% 保护您的隐私安全。

## ✨ 功能特性

-   **多格式支持**: 支持转换多种常用图片格式，如 `JPG`, `PNG`, `WEBP`。
-   **批量转换**: 可一次性选择多张图片，并按选择顺序合并到一个 PDF 文件中。
-   **纯客户端处理**: 所有转换操作均在您的浏览器中完成，文件不会离开您的电脑，彻底杜绝隐私泄露风险。
-   **实时预览与管理**: 上传后可查看文件列表，并能随时移除不需要的图片。
-   **智能页面适配**: 自动计算图片尺寸，使其以最佳比例居中放置在 PDF 页面上。
-   **即时下载**: 转换完成后，可立即下载生成的 PDF 文件。
-   **零后端依赖**: 无需服务器支持，可直接在本地或任何静态页面托管服务上运行。

## 📂 项目结构

```
image-to-pdf/
├── src/
│   ├── index.html      # 应用主页面 (HTML)
│   ├── app.js          # 核心逻辑 (JavaScript)
│   └── styles.css      # 说明文档
```

## 🚀 快速开始

### 运行条件

您只需要一个现代的网页浏览器（如 Chrome, Firefox, Edge, Safari）即可使用本工具。

### 本地部署

1.  **克隆项目到本地：**
    ```bash
    git clone https://github.com/Eyozy/image-to-pdf.git
    cd image-to-pdf
    ```

2.  **直接在浏览器中打开：**
    您无需安装任何依赖或启动 Web 服务器。直接用浏览器打开 `index.html` 文件即可开始使用。
    ```bash
    # Windows 用户
    start index.html

    # macOS 用户
    open index.html

    # Linux 用户
    xdg-open index.html
    ```

## 📖 使用指南

1.  **选择文件**: 打开 `index.html` 页面后，点击 **"选择图片文件"** 按钮，可以选择一张或多张图片。
2.  **管理文件**: 已选择的图片会显示在按钮下方，您可以点击文件名旁边的 "×" 来移除该图片。
3.  **开始转换**: 点击 **"转换为 PDF"** 按钮。按钮上会显示加载动画，提示正在处理中。
4.  **下载文件**: 转换成功后，浏览器将自动触发下载，文件名为 `images-converted.pdf`。同时页面会弹出成功提示。

## 🤝 如何贡献

我们欢迎任何形式的贡献！无论是报告 Bug、提交新功能还是改进现有代码。

1.  Fork 本项目
2.  创建您的新分支 (`git checkout -b feature/YourAmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  将您的分支推送到远程仓库 (`git push origin feature/YourAmazingFeature`)
5.  提交一个 Pull Request

## 📄 许可证

本项目基于 [MIT 许可证](https://opensource.org/licenses/MIT)，查看 [LICENSE](LICENSE) 文件了解详情。
