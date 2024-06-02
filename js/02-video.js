import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.getElementById("vimeo-player");
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = "videoplayer-current-time";

// Când timpul de redare se schimbă, salvați-l în local storage, dar nu mai des decât o dată pe secundă
const onTimeUpdate = throttle((data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
}, 1000);

player.on("timeupdate", onTimeUpdate);

// La reîncărcarea paginii, setați timpul curent de redare la valoarea salvată în local storage
const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime !== null) {
  player.setCurrentTime(parseFloat(savedTime)).catch(function (error) {
    console.error(error);
  });
}

// Puteți adăuga un mesaj pentru a verifica dacă scriptul funcționează corect
player.on("play", function () {
  console.log("Played the video!");
});

player.getVideoTitle().then(function (title) {
  console.log("Title:", title);
});
