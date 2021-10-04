var videoContainer = document.querySelector(".video-container");
var controls = document.querySelector(".player");
var videos = document.querySelectorAll(".video");
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var playButton = document.getElementById("play");
var currentTimeText = document.getElementById("curtime");

var totalVideos = videos.length;
var videoIndex = Math.floor(Math.random() * videos.length);

function play(index) {
  var videoPlaying = document.querySelector(".playing");
  if (videoPlaying) {
    videoPlaying.removeEventListener("timeupdate", updateTime);
    videoPlaying.classList.remove("playing");
    videoPlaying.pause();
    videoPlaying.currentTime = 0;
  }

  var newVideo = document.getElementById("video-" + index);
  newVideo.addEventListener("timeupdate", updateTime);
  newVideo.addEventListener("ended", function () {
    playNext();
  });
  newVideo.classList.add("playing");
  newVideo.play();

  playButton.innerHTML = "❙❙";
  currentTimeText.innerHTML = "00:00";
}

function updateTime(event) {
  var curMin = Math.floor(event.target.currentTime / 60);
  var curSec = Math.floor(event.target.currentTime - curMin * 60);
  var durMin = Math.floor(event.target.duration / 60);
  var durSec = Math.round(event.target.duration - durMin * 60);
  if (curSec < 10) {
    curSec = "0" + curSec;
  }
  if (durSec < 10) {
    durSec = "0" + durSec;
  }
  if (curMin < 10) {
    curMin = "0" + curMin;
  }
  if (durMin < 10) {
    durMin = "0" + durMin;
  }
  currentTimeText.innerHTML = curMin + ":" + curSec;
}

function playNext() {
  if (videoIndex >= videos.length - 1) {
    videoIndex = 0;
  } else {
    videoIndex++;
  }
  play(videoIndex);
}

function playPrevious() {
  if (videoIndex === 0) {
    videoIndex = videos.length - 1;
  } else {
    videoIndex--;
  }
  play(videoIndex);
}

next.addEventListener("click", function () {
  playNext();
});

prev.addEventListener("click", function () {
  playPrevious();
});


playButton.addEventListener("click", function () {
  var videoPlaying = document.querySelector(".playing");
  if (videoPlaying.paused) {
    videoPlaying.play();
    playButton.innerHTML = "❙❙";
  } else {
    videoPlaying.pause();
    playButton.innerHTML = "&#9658;";
  }
});

videoContainer.addEventListener("mouseenter", function () {
  showControls();
});

videoContainer.addEventListener("mouseleave", function () {
  hideControls();
});

function showControls() {
  controls.style.opacity = 1;
}

function hideControls() {
  controls.style.opacity = 0;
}

window.addEventListener("DOMContentLoaded", function () {
  play(videoIndex);
});
