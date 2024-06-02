import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.getElementById("vimeo-player");
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = "videoplayer-current-time";

const onTimeUpdate = throttle((data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
}, 1000);

player.on("timeupdate", onTimeUpdate);

const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime !== null) {
  player.setCurrentTime(parseFloat(savedTime)).catch(function (error) {
    console.error(error);
  });
}

player.on("play", function () {
  console.log("Played the video!");
});

player.getVideoTitle().then(function (title) {
  console.log("Title:", title);
});
