# 先看说明

需要先创建cloudinary账号，然后创建一个 Unsigned Upload Preset，这样就能用上面那个油猴脚本，无需暴露 API Secret，安全可靠。 https://github.com/Phinsin666/Uploading-images-to-Cloudinary/tree/main

具体步骤：

  登录 Cloudinary 控制台
  
  左侧点击：Settings（设置）
  
  点击上方的 Upload 标签
  
  下拉找到 Upload presets
  
  点击 Add upload preset
  
  设置如下：
  
  Name: 比如 tampermonkey_upload
  
  Signing Mode: 选择 Unsigned
  
  可选配置：允许图片类型、最大大小等
  
  保存后你就有了一个 upload_preset 名称
# 最后再脚本里编辑修改你自己的Name和upload_preset名称保存即可，然后刷新页面点击图片之后再右键菜单栏中找到此脚本上传即可。
