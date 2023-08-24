const arr = [{
  title:"surat cinta untuk starla",
  artist:"Virgoun",
  img:"/src/image/surat_cinta_untuk_starla.jpeg",
  sound:"/src/musik/surat_cinta_untuk_starla.mp3"
},
{
  title:"Kelingan Mantan",
  artist:"NDX A.K.A",
  img:"/src/image/kelingan_mantan.jpeg",
  sound:"/src/musik/kelingan_mantan.mp3"
},
{
  title:"night changes",
  artist:"one direction",
  img:"/src/image/night_changes.jpeg",
  sound:"/src/musik/night_changes.mp3"
}];

const img = document.querySelector("#img");
const judul = document.querySelector("#music-title");
const penyanyi = document.querySelector("#singer-song");
const currentTime = document.querySelector("#current-time");
const musicDuration = document.querySelector("#music-duration");
const previous = document.querySelector("#previous");
const pause = document.querySelector("#pause");
const next = document.querySelector("#next");
const timeSlider = document.querySelector("#slider");
const volumeSlider = document.querySelector("#slider-volume");
const audioPlayer = document.getElementById("audio-player");
let currentIndex = 0;

next.onclick = () => {
  currentIndex = (currentIndex + 1) % arr.length;
  audioPlayer.src = arr[currentIndex].sound;
  img.src = arr[currentIndex].img;
  judul.innerHTML = arr[currentIndex].title;
  penyanyi.innerHTML = arr[currentIndex].artist;
  audioPlayer.play();
}
previous.onclick = () => {
  currentIndex = (currentIndex - 1) % arr.length;
  if(currentIndex < 0) {
    currentIndex = arr.length - 1;
  }
  audioPlayer.src = arr[currentIndex].sound;
  img.src = arr[currentIndex].img;
  judul.innerHTML = arr[currentIndex].title;
  penyanyi.innerHTML = arr[currentIndex].artist;
  audioPlayer.play();
}
pause.onclick = () => {
  audioPlayer.pause()
}
audioPlayer.onloadedmetadata = () => {
  timeSlider.max = audioPlayer.duration;
  
}
audioPlayer.addEventListener("timeupdate", function() {
  currentTime.innerHTML = Convert(audioPlayer.currentTime);
  musicDuration.innerHTML = Convert(audioPlayer.duration);
  timeSlider.value = audioPlayer.currentTime;
  timeSlider.style.backgroundSize = `${(100 * audioPlayer.currentTime) / audioPlayer.duration}%`;
  
});
timeSlider.addEventListener("input", function() {
  audioPlayer.currentTime = timeSlider.value;
  //audioPlayer.currentTime = seekSlider.value;
  //seekSlider.style.backgroundSize = `${audioPlayer.currentTime}%`

});
function Convert(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  var formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return formattedTime;
}
volumeSlider.oninput = () => {
  audioPlayer.volume = parseFloat(volumeSlider.value);
  
}