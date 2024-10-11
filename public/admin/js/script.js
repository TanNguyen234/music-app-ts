//Upload Image //Tạo preview ảnh trước khí upload [(google search)]
const uploadImage = document.querySelector('[upload-image]');

if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
    const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]');
    const update = document.querySelector('[update]');

    if(!uploadImageInput.value) {
        update.style.display = 'none';
    }

    uploadImageInput.addEventListener('change', (e) => {

        uploadImage.children[2].style.display = 'flex';
        const x = uploadImage.children[2].children[1];
        let file = e.target.files[0];
        
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)//Hàm tạo đường dẫn ảnh
        }

        x.addEventListener('click', (e) => {
            console.log("x");
            uploadImagePreview.src = ""
            uploadImage.children[2].style.display = 'none';
            uploadImageInput.value = "";
        })
    })
}
//End Upload Image