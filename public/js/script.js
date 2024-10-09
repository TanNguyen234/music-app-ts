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
const buttonLike = document.querySelectorAll('[button-like]')
if(buttonLike) {
    buttonLike.forEach(button => {
        button.addEventListener('click', () => {
            const idSong = button.getAttribute('button-like')
            const isActive = button.classList.contains('active');
    
            const typeLike = isActive == true ? 'no' : 'yes';
            
            const link = `/songs/like/${typeLike}/${idSong}`
    
            fetch(link, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
             .then(response => response.json())
             .then(data => {
                if(data.code === 200) {
                    const span = button.querySelector('span')
    
                    span.innerHTML = `${data.like} thích`
    
                    button.classList.toggle('active')
                }
             })
        })  
    })
}
//End Button Like
//Button Favorite
const buttonFavorite = document.querySelectorAll('[button-favorite]')
if(buttonFavorite) {
    buttonFavorite.forEach(button => {
        button.addEventListener('click', () => {
            const idSong = button.getAttribute('button-favorite')
            const isActive = button.classList.contains('active');
    
            const type = isActive == true ? 'unfavorite' : 'favorite';
            
            const link = `/songs/favorite/${type}/${idSong}`
    
            fetch(link, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
             .then(response => response.json())
             .then(data => {
                if(data.code === 200) {
                    button.classList.toggle('active')
                }
             })
        })  
    })
}
//End Button Favorite
//Format Time
const time = document.querySelectorAll('.inner-time span')
if(time) {
    time.forEach(item => {
        item.innerHTML = " " + moment(item.innerHTML, "MM-DD-YYYY").calendar()
    })
}
//End Format Time