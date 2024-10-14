//Upload Image //Tạo preview ảnh trước khí upload [(google search)]
const uploadImage = document.querySelector('[upload-image]');

if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
    const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]');
    const update = uploadImage.querySelector('[update]');

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
            uploadImagePreview.src = ""
            uploadImage.children[2].style.display = 'none';
            uploadImageInput.value = "";
        })
    })
}
//End Upload Image
//Upload Audio
const uploadAudio = document.querySelector('[upload-audio]');

if(uploadAudio) {
    const uploadAudioInput = uploadAudio.querySelector('[upload-audio-input]');
    const uploadAudioPlay = uploadAudio.querySelector('audio[upload-audio-play]');
    const source = uploadAudioPlay.querySelector('source');
    const update = uploadAudio.querySelector('[update]');

    if(uploadAudioInput.value === '' | undefined | null) {
        update.style.display = 'none';
        source.src = ""
        uploadAudioInput.value = "";
    }

    uploadAudioInput.addEventListener('change', (e) => {
        uploadAudio.children[2].style.display = 'flex';
        let file = e.target.files[0];
        const x = uploadAudio.querySelector('span')

        if(file) {
            source.src = URL.createObjectURL(file)//Hàm tạo đường dẫn
            uploadAudioPlay.load()
        }

        x.addEventListener('click', () => {
            update.style.display = 'none';
            source.src = ""
            uploadAudioInput.value = "";
            uploadAudioPlay.pause(); // Pause the audio if it's playing
            uploadAudioPlay.currentTime = 0; // Reset playback to the beginning
        })
        
    })
}
//End Upload Audio