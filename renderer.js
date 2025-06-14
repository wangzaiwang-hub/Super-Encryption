// State
let selectedFilePaths = [];
let currentOperation = 'encrypt'; // 'encrypt' or 'decrypt'
let mainMenuAnimationInterval;
let filesViewAnimationInterval;

// DOM Elements
const views = {
    menuView: document.getElementById('menu-view'),
    filesView: document.getElementById('files-view'),
    animationView: document.getElementById('animation-view'),
    resultView: document.getElementById('result-view')
};
const protocolDisplay = document.getElementById('protocol-display');
const encryptModeBtn = document.getElementById('encrypt-mode-btn');
const decryptModeBtn = document.getElementById('decrypt-mode-btn');
const fileListDiv = document.getElementById('file-list');
const filesViewTitle = document.getElementById('files-view-title');
const backBtn = document.getElementById('back-btn');
const processBtn = document.getElementById('process-btn');
const exportBtn = document.getElementById('export-btn');
const finishBtn = document.getElementById('finish-btn');
const fakeConsole = document.getElementById('fake-console');
const statusMessage = document.getElementById('status-message');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const menuProtocolDisplay = document.getElementById('menu-protocol-display');
const filesProtocolDisplay = document.getElementById('files-protocol-display');
const authorLink = document.getElementById('author-link');
const minBtn = document.getElementById('min-btn');
const maxBtn = document.getElementById('max-btn');
const closeBtn = document.getElementById('close-btn');

// --- View Management ---
function switchView(viewName) {
    Object.values(views).forEach(view => view.classList.remove('active'));
    if (views[viewName]) {
        views[viewName].classList.add('active');
    }
    
    if (viewName === 'menuView') {
        startMainMenuAnimation();
        stopFilesViewAnimation();
    } else if (viewName === 'filesView') {
        startFilesViewAnimation();
        stopMainMenuAnimation();
    } else {
        stopMainMenuAnimation();
        stopFilesViewAnimation();
    }
}

// --- Main Menu Animation ---
function startMainMenuAnimation() {
    if (mainMenuAnimationInterval) return; // Already running

    const protocols = [
        "Compiling kernel with GLIBC_2.2.5...",
        "Booting from /dev/sda1...",
        "Rootkit signature not found.",
        "[+] Access Granted. AuthID: 8A4E. Privileges: root",
        "Loading module 'kryptos.ko'...",
        "Establishing secure tunnel via 2048-bit RSA...",
        "Connected to node: 192.168.1.254 (latency: 12ms)",
        "Running memscan on PID 1024...",
        "Injecting payload into 'svchost.exe'...",
        "Payload injected. Awaiting callback...",
        "Firewall rule added: ALLOW_TCP_IN 4444",
        "Disabling logging service 'syslogd'...",
        "SUCCESS. System compromised.",
        "Scanning for sensitive data... (SAM, LSA)",
        "Found 3 encrypted credentials.",
        "Cracking hashes with rainbow table...",
        "Hash 1/3 cracked: 'P@$$w0rd123'",
        "Awaiting user command..."
    ];

    let i = 0;
    menuProtocolDisplay.innerHTML = ''; // Clear previous lines

    mainMenuAnimationInterval = setInterval(() => {
        if (menuProtocolDisplay.children.length > 50) { // Keep more lines
            menuProtocolDisplay.removeChild(menuProtocolDisplay.firstChild);
        }
        const p = document.createElement('p');
        p.textContent = `[${new Date().toISOString()}] ${protocols[i % protocols.length]}`;
        menuProtocolDisplay.appendChild(p);
        menuProtocolDisplay.scrollTop = menuProtocolDisplay.scrollHeight;
        i++;
    }, 300); // Faster interval
}

function stopMainMenuAnimation() {
    clearInterval(mainMenuAnimationInterval);
    mainMenuAnimationInterval = null;
}

// --- Files View Animation ---
function startFilesViewAnimation() {
    if (filesViewAnimationInterval) return;

    const encryptionTerms = [
        "AES (Advanced Encryption Standard)",
        "RSA (Rivest–Shamir–Adleman)",
        "SHA-256 (Secure Hash Algorithm 256-bit)",
        "ECC (Elliptic Curve Cryptography)",
        "PGP (Pretty Good Privacy)",
        "SSL/TLS (Secure Sockets Layer/Transport Layer Security)",
        "HMAC (Hash-based Message Authentication Code)",
        "PBKDF2 (Password-Based Key Derivation Function 2)",
        "Twofish", "Serpent", "Blowfish",
        "GCM (Galois/Counter Mode)",
        "Diffie-Hellman key exchange",
        "Cipher Block Chaining (CBC)",
        "Public Key Infrastructure (PKI)"
    ];

    let i = 0;
    filesProtocolDisplay.innerHTML = '';

    filesViewAnimationInterval = setInterval(() => {
        if (filesProtocolDisplay.children.length > 50) {
            filesProtocolDisplay.removeChild(filesProtocolDisplay.firstChild);
        }
        const p = document.createElement('p');
        p.textContent = `[${new Date().toISOString()}] Verification: ${encryptionTerms[i % encryptionTerms.length]}`;
        filesProtocolDisplay.appendChild(p);
        filesProtocolDisplay.scrollTop = filesProtocolDisplay.scrollHeight;
        i++;
    }, 400);
}

function stopFilesViewAnimation() {
    clearInterval(filesViewAnimationInterval);
    filesViewAnimationInterval = null;
}

// --- App Flow & File Handling ---
async function startOperation(operation) {
    currentOperation = operation;
    const files = await window.electronAPI.openFile(operation);
    if (files.length > 0) {
        selectedFilePaths = files;
        updateUiForFilesView();
        switchView('filesView');
    }
}

function updateUiForFilesView() {
    // Update titles and buttons
    if (currentOperation === 'encrypt') {
        filesViewTitle.textContent = '准备加密的文件';
        processBtn.textContent = '一键加密';
    } else {
        filesViewTitle.textContent = '准备解密的文件';
        processBtn.textContent = '一键解密';
    }

    // Animate file list display
    fileListDiv.innerHTML = '';
    let delay = 0;
    selectedFilePaths.forEach(path => {
        setTimeout(() => {
            const fileName = path.split(/[\\/]/).pop();
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';

            // Fake data for coolness
            const permissions = '-rwxr-xr--';
            const size = (Math.random() * 2048 + 50).toFixed(2) + 'K';
            const date = new Date(Date.now() - Math.random() * 1e10).toISOString().substring(0, 10);
            
            fileItem.innerHTML = `
                <span class="file-meta">${permissions}</span>
                <span class="file-meta">${size.padStart(9, ' ')}</span>
                <span class="file-meta">${date}</span>
                <span class="file-name">${fileName}</span>
            `;
            
            fileListDiv.appendChild(fileItem);
            fileListDiv.scrollTop = fileListDiv.scrollHeight; // Scroll to new item
        }, delay);
        delay += 100; // Stagger each item by 100ms
    });
}

function resetToMenu() {
    selectedFilePaths = [];
    switchView('menuView');
}

// --- Event Listeners ---
encryptModeBtn.addEventListener('click', () => startOperation('encrypt'));
decryptModeBtn.addEventListener('click', () => startOperation('decrypt'));

backBtn.addEventListener('click', resetToMenu);
finishBtn.addEventListener('click', resetToMenu);

authorLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.electronAPI.openExternal(e.target.href);
});

processBtn.addEventListener('click', () => {
    switchView('animationView');
    runAnimation(currentOperation);
});

exportBtn.addEventListener('click', async () => {
    const destinationDir = await window.electronAPI.selectDirectory();
    if (destinationDir) {
        exportBtn.disabled = true;
        exportBtn.textContent = '正在导出...';

        const results = await window.electronAPI.processFiles({
            filePaths: selectedFilePaths,
            destinationDir,
            operation: currentOperation
        });
        
        const successCount = results.filter(r => r.success).length;
        
        if (successCount === selectedFilePaths.length) {
            resultTitle.textContent = '全部处理成功！';
            resultMessage.textContent = `成功处理了 ${successCount} 个文件到指定目录。`;
        } else {
            resultTitle.textContent = '部分任务失败';
            resultMessage.textContent = `成功 ${successCount} 个, 失败 ${selectedFilePaths.length - successCount} 个。请检查文件或权限。`;
        }
        
        // Hide export button, show finish button
        exportBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    }
});

// --- Animation ---
function runAnimation(operation) {
    const animations = {
        encrypt: ["初始化加密协议...", "分析文件结构...", "建立安全连接... [完成]", "注入量子随机数种子...", `处理 ${selectedFilePaths.length} 个文件中...`, "应用 AES-256 + RSA 混合加密...", "擦除操作痕迹...", "完成！"],
        decrypt: ["启动解密程序...", "验证文件完整性...", "读取加密头部... [成功]", "反向计算哈希值...", `解密 ${selectedFilePaths.length} 个文件中...`, "执行逆向协议...", "恢复原始文件...", "完成！"]
    };
    const lines = animations[operation] || animations.encrypt;
    fakeConsole.innerHTML = '';
    let i = 0;
    
    function typeLine() {
        if (i < lines.length) {
            const line = document.createElement('p');
            line.innerHTML = `&gt; ${lines[i]}`;
            line.className = 'typing';
            fakeConsole.appendChild(line);
            fakeConsole.scrollTop = fakeConsole.scrollHeight;
            i++;
            setTimeout(typeLine, 350);
        } else {
            setTimeout(() => {
                const opText = operation === 'encrypt' ? '加密' : '解密';
                resultTitle.textContent = `分析完成`;
                resultMessage.textContent = `文件已准备好，可以导出${opText}后的版本。`;
                exportBtn.textContent = `导出${opText}文件`;
                
                // Reset button states for result view
                exportBtn.style.display = 'block';
                exportBtn.disabled = false;
                finishBtn.style.display = 'none';

                switchView('resultView');
            }, 500);
        }
    }
    typeLine();
}

// --- Status Message ---
function showStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = 'visible';
    statusMessage.classList.add(type);

    setTimeout(() => {
        statusMessage.className = '';
    }, 3800);
}

// --- Window Controls ---
minBtn.addEventListener('click', () => window.electronAPI.minimizeWindow());
maxBtn.addEventListener('click', () => window.electronAPI.maximizeWindow());
closeBtn.addEventListener('click', () => window.electronAPI.closeWindow());

window.electronAPI.onWindowStateChange((isMaximized) => {
    if (isMaximized) {
        maxBtn.classList.add('is-maximized');
    } else {
        maxBtn.classList.remove('is-maximized');
    }
});

// Initial Load
switchView('menuView'); 