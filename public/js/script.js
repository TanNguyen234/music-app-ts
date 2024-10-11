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

    ap.on('ended', () => {
        const link = `/songs/listen/${dataSong._id}`
        const span = document.querySelector('.inner-listen span')
            fetch(link, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
             .then(response => response.json())
             .then(data => {
                if(span && data.code == 200) {
                    span.innerHTML = `${data.newListen} lượt nghe`
                }
             })
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
        const text = item.innerHTML
        if(text.length > 0) {
            item.innerHTML = " " + moment(text, "MM-DD-YYYY").calendar()
        } else {
            item.innerHTML = " " + "N/A"
        }
    })
}
//End Format Time
//Search Suggest
const boxSearch = document.querySelector('.box-search')
if(boxSearch) {
    const input = document.querySelector('input[name="keyword"')
    const boxSuggest = boxSearch.querySelector('.inner-suggest')

    input.addEventListener('keyup', (e) => {
        if(input.value === '') {
            boxSuggest.classList.remove('show')
        }
        
        const keyword = input.value
        const link = `/search/suggest?keyword=${keyword}`
    
        fetch(link, {
            method: 'GET'
        })
         .then(response => response.json())
         .then(data => {
               if(data.code === 200) {
                const songs = data.songs
                if(songs.length > 0) {
                    boxSuggest.classList.add('show')

                    const htmls = songs.map(song => {
                        return `    
                           <a href="/songs/detail/${song.slug}" class="inner-item">
                            <div class="inner-image">
                              <img src=${song.avatar} alt=${song.title}/>
                            </div>
                            <div class="inner-info">
                              <div class="inner-title"> ${song.title} </div>
                              <div class="inner-singer"> 
                                <i class="fa-solid fa-microphone-lines"></i> 
                                <span> ${song.infoSinger.fullName} </span>
                              </div>
                            </div>
                           </a>
                        `
                    })

                    const boxList = boxSuggest.querySelector('.inner-list')
                    console.log(boxList)
                    boxList.innerHTML = htmls.join("")
                } else {
                    boxSuggest.classList.remove('show')
                }
            }
         })
    })
}
//End Search Suggest