# Super Encryption

一个外观酷炫、具有"黑客"风格界面的虚假文件加密工具。它并不会对文件内容进行实际的加密，而是通过一种独特的方式修改文件的后缀名，同时提供了配套的"解密"功能来恢复原始文件名。

## ✨ 功能亮点

- **赛博朋克/黑客风格界面**: 整个应用采用暗色主题和亮绿色文本，模拟了经典的终端（Terminal）外观。
- **动态背景**: 主界面和文件选择界面都带有动态滚动的"协议/日志"文本，营造出专业和神秘的氛围。
- **自定义窗口**: 完全移除了原生窗口边框，使用纯 HTML/CSS 打造了与主题完美融合的自定义标题栏和窗口控制按钮（最小化、最大化、关闭）。
- **"伪"加密/解密**:
    - **加密**: 将文件的原始后缀名（如 `.txt`）通过 Base64 编码，并重命名文件为 `[原始文件名].[编码后的后缀].sCrypt` 的格式。
    - **解密**: 能够智能识别 `.sCrypt` 文件，并将其中的后缀名解码，完美恢复原始文件。
- **安全的文件操作**: 无论是加密还是解密，程序都会将处理后的文件保存到用户选择的新位置，绝不修改原始文件。
- **流畅的动画效果**: 所有的界面切换、文件列表加载都带有平滑的过渡和动画效果。
- **跨平台打包**: 使用 Electron 和 electron-builder 构建，可以轻松打包成 Windows `.exe` 安装程序。

## 📸 截图预览

*在这里可以放置您的应用截图*

**主界面:**
![主界面](https://github.com/user-attachments/assets/1ac33b3e-432a-4005-93e5-3919f53598df)


**文件处理界面:**
![文件处理界面](https://github.com/user-attachments/assets/f624203d-6c79-4df7-b79b-f61ec890553f)


## 🛠️ 技术栈

- **框架**: [Electron](https://www.electronjs.org/)
- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端/环境**: [Node.js](https://nodejs.org/)
- **打包工具**: [electron-builder](https://www.electron.build/)

## 🚀 使用方法

1.  **克隆仓库**
    ```bash
    git clone https://your-repository-url.git
    cd super-encryption
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **在开发模式下运行**
    ```bash
    npm start
    ```

4.  **打包成可执行文件**
    ```bash
    npm run dist
    ```
    打包完成后，在根目录下的 `dist` 文件夹中可以找到生成的安装程序。

## 👤 作者

- **@wangzaiwang-hub** - [wangzaiwang-hub](https://github.com/wangzaiwang-hub)

---
*该项目仅供学习和娱乐，请勿用于非法用途。* 
