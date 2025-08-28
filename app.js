document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convertButton');
    const imageInput = document.getElementById('imageInput');
    const fileLabelText = document.getElementById('fileLabelText');
    const fileListContainer = document.getElementById('fileList');
    const statusPopup = document.getElementById('statusPopup');

    let selectedFiles = [];
    let statusTimeout;

    // --- UI Interaction Logic ---

    imageInput.addEventListener('change', (event) => {
        selectedFiles = Array.from(event.target.files);
        updateFileList();
        updateButtonState();
        hideStatusPopup(); 
    });

    function updateFileList() {
        fileListContainer.innerHTML = ''; 
        if (selectedFiles.length > 0) {
            fileListContainer.classList.remove('hiding');
            selectedFiles.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = file.name;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = '×';
                removeBtn.setAttribute('aria-label', `Remove ${file.name}`);
                removeBtn.onclick = () => removeFile(index);

                fileItem.appendChild(fileName);
                fileItem.appendChild(removeBtn);
                fileListContainer.appendChild(fileItem);
            });
            fileLabelText.textContent = `已选择 ${selectedFiles.length} 个文件`;
        } else {
            fileLabelText.textContent = '选择图片文件';
        }
    }

    function removeFile(indexToRemove) {
        selectedFiles.splice(indexToRemove, 1);
        
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach(file => dataTransfer.items.add(file));
        imageInput.files = dataTransfer.files;
        
        updateFileList();
        updateButtonState();
    }
    
    function updateButtonState() {
        convertButton.disabled = selectedFiles.length === 0;
    }

    function setLoading(isLoading) {
        const buttonText = convertButton.querySelector('.button-text');
        if (isLoading) {
            convertButton.classList.add('loading');
            buttonText.textContent = '正在转换...';
            convertButton.disabled = true;
        } else {
            convertButton.classList.remove('loading');
            buttonText.textContent = '转换为 PDF';
            updateButtonState();
        }
    }
    
    updateButtonState(); // Set initial state

    // --- Core PDF Conversion Logic ---

    convertButton.addEventListener('click', async () => {
        if (selectedFiles.length === 0) {
            showStatusPopup('请先选择图片文件。', 'error');
            return;
        }

        setLoading(true);
        hideStatusPopup();

        try {
            if (typeof window.jspdf === 'undefined') {
                await loadJsPDF();
            }
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const imgData = await readFileAsDataURL(file);
                const img = await loadImage(imgData);

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                
                let imgWidth = img.width;
                let imgHeight = img.height;
                const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight, 1);
                
                imgWidth *= ratio;
                imgHeight *= ratio;
                
                const x = (pageWidth - imgWidth) / 2;
                const y = (pageHeight - imgHeight) / 2;

                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
            }

            pdf.save('images-converted.pdf');
            showStatusPopup('PDF 已成功生成！', 'success', 5000);

        } catch (error) {
            console.error('PDF generation failed:', error);
            showStatusPopup('生成 PDF 时出错，请重试。', 'error');
        } finally {
            setLoading(false);
        }
    });

    // --- Helper & UI State Functions ---

    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = error => reject(error);
            img.src = src;
        });
    }

    function loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (typeof window.jspdf !== 'undefined') {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    function showStatusPopup(text, type = 'info', duration = null) {
        clearTimeout(statusTimeout);
        statusPopup.textContent = text;
        statusPopup.className = `status-popup ${type} show`;

        if (duration) {
            statusTimeout = setTimeout(() => {
                hideStatusAndFiles();
            }, duration);
        }
    }

    function hideStatusPopup() {
        statusPopup.classList.remove('show');
    }

    function hideStatusAndFiles() {
        statusPopup.classList.add('hiding');
        fileListContainer.classList.add('hiding');
        
        setTimeout(() => {
            statusPopup.classList.remove('show', 'hiding', 'success', 'error');
            statusPopup.textContent = '';
            fileListContainer.classList.remove('hiding');
            resetUI();
        }, 300); // This duration should match the CSS transition time
    }

    function resetUI() {
        selectedFiles = [];
        imageInput.value = '';
        updateFileList();
        updateButtonState();
    }
});