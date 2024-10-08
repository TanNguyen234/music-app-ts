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
//Button Like
const buttonLike = document.querySelector('[button-like]')
if(buttonLike) {
    buttonLike.addEventListener('click', () => {
        const idSong = buttonLike.getAttribute('button-like')
        const isActive = buttonLike.classList.contains('active');

        const typeLike = isActive == true ? 'no' : 'yes';
        
        const link = `/songs/like/${typeLike}/${idSong}`

        const span = buttonLike.querySelector('span')
        
        fetch(link, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
         .then(response => response.json())
         .then(data => {
            span.innerHTML = `${data.like} thích`

            buttonLike.classList.toggle('active')
         })
    })
}
//End Button Like