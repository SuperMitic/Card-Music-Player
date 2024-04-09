let music = [
    {
        name: "0",
        title: "Chances",
        artist: "Silent Partner",

    }, 
    {
        name: "1",
        title: "Places",
        artist: "Balynt",

    }, 
    {
        name: "2",
        title: "Sea",
        artist: "MBB",

    }, 
    {
        name: "3",
        title: "Chill With Me",
        artist: "",

    }
]

const audio = document.getElementById('musicPlayer');
const progressSlider = document.querySelector('.progress-bar');
const currentTimeDisplay = document.getElementById('tempo');
const totalDurationDisplay = document.getElementById('song-duration');
const playpauseBtn = document.querySelector(".play-pause");
const progressArea = document.querySelector('.progress-area');
const albumcover = document.getElementById('album-cover');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const songtitle = document.getElementById('song-title')
const bgimage = document.getElementById('card-box'); 
const heart = document.getElementById('cuore');
let isPlaying = false;
let songIndex = 0;
let favorites = [false, false, false, false];


// Play/Pause toggle function
function togglePlayPause() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (isPlaying) {
        audio.pause();
        albumcover.style.animationPlayState = 'paused';
        playpauseBtn.querySelector("i").innerText = "play_arrow";
    } else {
        audio.play();
        albumcover.style.animationPlayState = 'running';
        playpauseBtn.querySelector("i").innerText = "pause";
    }
    isPlaying = !isPlaying;
}

// Next song function
function nextSong() {
    if (songIndex < music.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;
    }
    audio.src = `music/${music[songIndex].name}.mp3`;
    albumcover.src = `cover/${music[songIndex].name}.jpeg`;
    bgimage.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(cover/${music[songIndex].name}.jpeg)`;
    songtitle.textContent = `${music[songIndex].title} - ${music[songIndex].artist}`;
    albumcover.style.animationPlayState = 'running';
    playpauseBtn.querySelector("i").innerText = "pause";
    checkFavorites();
    isPlaying = true;
    audio.play();
}

// Previous song function
function prevSong() {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = music.length - 1;
    }
    audio.src = `music/${music[songIndex].name}.mp3`;
    albumcover.src = `cover/${music[songIndex].name}.jpeg`;
    bgimage.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(cover/${music[songIndex].name}.jpeg)`;
    songtitle.textContent = `${music[songIndex].title} - ${music[songIndex].artist}`;
    albumcover.style.animationPlayState = 'running';
    playpauseBtn.querySelector("i").innerText = "pause";
    checkFavorites();
    isPlaying = true;
    audio.play();
}

function checkFavorites(){
    if (favorites[songIndex] == true){
        heart.classList.add('bi-heart-fill');
        heart.classList.remove('bi-heart');
    } else {
        heart.classList.remove('bi-heart-fill');
        heart.classList.add('bi-heart');
    }
}

playpauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
heart.addEventListener("click", function(){
    favorites[songIndex] = !favorites[songIndex];
    checkFavorites();
    }
);

// Format time to display as minutes:seconds
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Display total duration once the audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
});

// Update current time and progress bar as the audio plays
audio.addEventListener("timeupdate", function () {
    const tempoCorrente = audio.currentTime;
    let currentMinutes = Math.floor(tempoCorrente / 60);
    let currentSeconds = Math.floor(tempoCorrente % 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    currentTimeDisplay.textContent = currentMinutes + ":" + currentSeconds;

    let percentage = (audio.currentTime / audio.duration) * 100;
    progressSlider.style.width = percentage + '%';
    
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX; 
    let songDuration = audio.duration; 

    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

// Handle audio ending
audio.onended = function () {      
    playpauseBtn.querySelector("i").innerText = "play_arrow";
    progressSlider.style.width = '0%';
    currentTimeDisplay.textContent = formatTime(0);
    isPlaying = false;
};

// Volume Control remains unchanged
document.getElementById('volumeControl').addEventListener('input', function () {
    audio.volume = this.value;
});