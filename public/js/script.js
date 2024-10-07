//Aplayer
const aplayer = document.getElementById('aplayer')
if(aplayer) {
    const dataSong = JSON.parse(aplayer.getAttribute('data-song'))
    const dataSinger = JSON.parse(aplayer.getAttribute('data-singer'))

    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay: true,
    });
    //Spin
    const avatar = document.querySelector('.singer-detail .inner-avatar');

    ap.on('play', () => {
        avatar.style.animationPlayState = "running"
    })

    ap.on('pause', () => {
        avatar.style.animationPlayState = "paused"
    })
}
//En Aplayer