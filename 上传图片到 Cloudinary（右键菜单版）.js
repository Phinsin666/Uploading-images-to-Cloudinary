// ==UserScript==
// @name         上传图片到 Cloudinary（右键菜单版）
// @version      1.1
// @description  点击图片后，通过浏览器右键菜单上传到 Cloudinary，并复制链接。
// @author       Phinsin666
// @source       https://github.com/Phinsin666/Uploading-images-to-Cloudinary
// @match        *://*/*
// @namespace https://greasyfork.org/users/385149
// ==/UserScript==
 
(function () {
    'use strict';
 
    const cloudName = 'Cloud Name';              // ← 替换为你的 Cloud Name
    const uploadPreset = 'tampermonkey_upload';      // ← 替换为你的 Upload Preset
    /*
    创建一个 Unsigned Upload Preset（推荐方式）
    这样就能用上面那个油猴脚本，无需暴露 API Secret，安全可靠。
 
    具体步骤：
    登录 Cloudinary 控制台：https://cloudinary.com/console
 
    左侧点击：Settings（设置）
 
    点击上方的 Upload 标签
 
    下拉找到 Upload presets
 
    点击 Add upload preset
 
    设置如下：
 
    Name: 比如 tampermonkey_upload
 
    Signing Mode: 选择 Unsigned
 
    可选配置：允许图片类型、最大大小等
 
    保存后你就有了一个 upload_preset 名称
    */
 
    let currentImageURL = null;
 
    // 监听图片点击，记录当前选中的图片 URL
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'IMG') {
            currentImageURL = target.src;
            console.log('[Cloudinary] 选中图片:', currentImageURL);
        }
    });
 
    // 注册右键菜单命令
    GM_registerMenuCommand('上传选中图片到 Cloudinary', () => {
        if (!currentImageURL) {
            alert('请先点击一张图片以选中它。');
            return;
        }
 
        uploadImageToCloudinary(currentImageURL);
    });
 
    function uploadImageToCloudinary(imageUrl) {
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
 
        fetch(imageUrl)
            .then(res => res.blob())
            .then(blob => {
                const formData = new FormData();
                formData.append('file', blob);
                formData.append('upload_preset', uploadPreset);
 
                return fetch(apiUrl, {
                    method: 'POST',
                    body: formData
                });
            })
            .then(response => response.json())
            .then(data => {
                if (data.secure_url) {
                    GM_setClipboard(data.secure_url);
                    alert(`✅ 上传成功！链接已复制：\n${data.secure_url}`);
                } else {
                    throw new Error(data.error?.message || '上传失败，未知错误');
                }
            })
            .catch(err => {
                alert('❌ 上传失败：' + err.message);
            });
    }
})();
