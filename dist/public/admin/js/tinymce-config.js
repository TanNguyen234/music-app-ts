const listTextareMCE = document.querySelectorAll('[textarea-mce]');

if(listTextareMCE.length > 0) {
  listTextareMCE.forEach((textarea) => {
    const id = textarea.id
    tinymce.init({
      selector: `#${id}`, //Cho thẻ textarea có class=textarea-mce
      plugins: "advlist link image lists code", //Để thêm tính năng insert img
      image_title: true,
      images_upload_url: '/admin/upload',
      automatic_uploads: true,
      file_picker_types: "image",
      // file_picker_callback: (cb, value, meta) => {
      //   const input = document.createElement("input");
      //   input.setAttribute("type", "file");
      //   input.setAttribute("accept", "image/*");
    
      //   input.addEventListener("change", (e) => {
      //     const file = e.target.files[0];
    
      //     const reader = new FileReader();
      //     reader.addEventListener("load", () => {
      //       const id = "blobid" + new Date().getTime();
      //       const blobCache = tinymce.activeEditor.editorUpload.blobCache;
      //       const base64 = reader.result.split(",")[1];
      //       const blobInfo = blobCache.create(id, file, base64);
      //       blobCache.add(blobInfo);
      //       cb(blobInfo.blobUri(), { title: file.name });
      //     });
      //     reader.readAsDataURL(file);
      //   });
    
      //   input.click();
      // },
    });
  })
}