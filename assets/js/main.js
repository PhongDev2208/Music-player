const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const DOMON_STORAGE_PLAYER = "DOMON-PLAYER";

const cd = $(".cd");
const cdThumb = $(".cd .cd-thumb");
const heading = $("header h2");
const audio = $("#audio");
const widthCD = cd.offsetWidth;
const btnPlay = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const volume = $(".volume-slider");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");
const wave = $(".wave");

const app = {
  randomIndexs: new Set(),
  config: JSON.parse(localStorage.getItem(DOMON_STORAGE_PLAYER)) || {},
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  currentIndex: 0,
  setConfig(key, value) {
    this.config[key] = value;
    localStorage.setItem(DOMON_STORAGE_PLAYER, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Click Pow Get Down",
      singer: "Raftaar x Fortnite",
      path: "https://ytop1.com/vi/Thankyou?token=U2FsdGVkX19v%2b4PPbqI62JdWEFANNh%2b6GdFSXFYJFDs3znFrV7%2fbmvBlEQNZKXAtUlavZsMW6UlMyhsD1F1sEbfYf6i0EX8rLePCCvqvb9dvK3cFfjaEueyHySIiTlw%2fLFnMGwT3Ei1RsSrJMi7ia23s35JKQrt7%2fUZgedH%2bEOw%3d&s=youtube&id=&h=6528733907484526496",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
    },
    {
      name: "Tu Phir Se Aana",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "https://ytop1.com/vi/Thankyou?token=U2FsdGVkX1%2bTr7JyD79O0aPuKh7kpOueMq5ddUkeyhNmJtEHOK0Ke3Exy3Vk743G80gqbb%2bhMntxnP11QcQpeHcKdYFbSz7609f6T0dtfP15jvZtZEmmkGb80SSqthv%2b5F7UxM1y6RScFk0Z0LSOm6pB0xIeerc10dc%2feP%2fmyA%2b5EqeI9fe%2b8jj269ZAEp7832E1Fv6%2fdd8wYW6SDVnIQ27PPdy5jyK%2bgJv0sIAKQa4%3d&s=youtube&id=&h=6528733907484526497",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "https://ytop1.com/vi/Thankyou?token=U2FsdGVkX19lgnGM6ec%2bLFdrJZt7x%2b6S82gl1%2fMqzscWws0pNTuruQDmridPzG4V4%2bC0ymJBAytqh4kNP8dfu0%2fAwnP9mw1yKwDgbkLAyjYMbzJz5zozhIq1F4FR2pwuHITJQIWcS%2fICIpgC6Rl2rFXUkw4yBVKIToHS%2bcJFm6A%3d&s=youtube&id=&h=6528733907484526497",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://ytop1.com/vi/Thankyou?token=U2FsdGVkX18G5T8yjwumplUGp8dfBxh9WvFT92mJZY9yUQ4zhYEUa0OYt4jfx0FAxT56kh94HotgMVuQmH4a2QqNoH%2bevUpxDM1Zj%2fJpklJKFck6xUxXSQgftlahbhxWFBrTWoiCalOUSYDSjgrfUrWq8iScq54rzwi06uTk4%2b5hwVvPYPkVzVw0TmAfi%2fvw&s=youtube&id=&h=6528733907484526497",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://ytop1.com/vi/Thankyou?token=U2FsdGVkX18UfW9Q%2f9Py9Vr%2f1C96HmSPG1TYIdcDePhN0nst8bgXAX9ChJqUUoleZvutAKR67e5KUR0GF%2frYjSdnxpQQS9My8CF7tTKPTp9%2bdjplLYS364rnc%2bc3GQ%2f5l%2bk3iqx%2b0miaZkRqWgbBAH1sCPikEylVVfagOya9d1Md7hE9dHddULVz%2bi9yjkHFkw8tW6jU4XocHQB%2fLT%2bFdg%3d%3d&s=youtube&id=&h=6528733907484526498",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
      image:
        "https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/86/c9/bb/86c9bb30-fe3d-442e-33c1-c106c4d23705/17UMGIM88776.rgb.jpg/1200x1200bf-60.jpg",
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "https://ytop1.com/vi/Thankyou?token=U2FsdGVkX1%2fv6eqm6YG3lLrbXsfS%2bit66FKC7%2fGt0d%2fy1HEkwRqA%2fTLBlRHyvJZ2dpYet5ZmMOcx7I4tcAxg1teUnWIG0j1fQqTgnwooigeui3Aew%2bdh5k8jfbpi4VflW590wqeuGP7%2fROUu%2feDYrQ%3d%3d&s=youtube&id=&h=6528733907484526497",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
    },
  ],
  defineProperty() {
    Object.defineProperty(this, "currentSong", {
      get() {
        return this.songs[this.currentIndex];
      },
    });
  },
  renderPlayList() {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}"">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playList.innerHTML = htmls.join("");
  },
  loadCurrentSong() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
    this.activeSong();
    this.scrollActiveSong();
    this.setConfig("currentIndex", this.currentIndex);
    this.randomIndexs.add(this.currentIndex);
  },
  loadConfig() {
    this.isRandom = this.config["isRandom"] || false;
    this.isRepeat = this.config["isRepeat"] || false;
    this.currentIndex = this.config["currentIndex"] || 0;
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong() {
    let newIndex;
    if (this.randomIndexs.size === this.songs.length) {
      this.randomIndexs.clear();
    }
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.currentIndex === newIndex || this.randomIndexs.has(newIndex));
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  activeSong() {
    const htmlSongs = $$(".song");
    htmlSongs.forEach((song) => {
      if (song.getAttribute("data-index") != this.currentIndex) {
        song.classList.remove("active");
      } else {
        song.classList.add("active");
      }
    });
  },
  scrollActiveSong() {
    $(".song.active").scrollIntoView({
      behavior: "smooth",
      block: this.currentIndex < 2 ? "end" : "nearest",
    });
  },
  handleEvent() {
    const _this = this;
    let isProgressing = true;
    const animateCd = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    animateCd.pause();

    audio.onplay = function () {
      player.classList.add("playing");
      _this.isPlaying = true;
      animateCd.play();
      audio.volume = volume.value / 100;
      if(cd.style.width === "0px") {
        wave.classList.add("loader");
      }
    };

    audio.onpause = function () {
      player.classList.remove("playing");
      _this.isPlaying = false;
      animateCd.pause();
      wave.classList.remove("loader");
    };

    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      var newWidthCD = widthCD - scrollTop;
      if(newWidthCD < 70) {
        cd.style.width = 0;
        if(_this.isPlaying) {
          wave.classList.add("loader");
        } 
      } else {
        cd.style.width = newWidthCD + "px";
        wave.classList.remove("loader");
      }
      cd.style.opacity = newWidthCD / widthCD;
      console.log("scroll")
    };

    btnPlay.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    progress.onchange = function (e) {
      e.target.onmousedown = function (e) {
        isProgressing = false;
      };

      const seekTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = seekTime;

      e.target.onmouseup = function () {
        isProgressing = true;
      };
    };

    volume.onchange = () => {
      audio.volume = volume.value / 100;
    }

    audio.ontimeupdate = function () {
      if (audio.duration && isProgressing) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.setConfig("currentIndex", _this.currentIndex);
    };

    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.setConfig("currentIndex", _this.currentIndex);
    };

    randomBtn.onclick = function () {
      _this.isRandom = randomBtn.classList.toggle("active");
      _this.setConfig("isRandom", _this.isRandom);
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = repeatBtn.classList.toggle("active");
      _this.setConfig("isRepeat", _this.isRepeat);
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.onclick();
      }
    };

    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      const optionNode = e.target.closest(".option"); 
      if (songNode && !optionNode) {
        _this.currentIndex = Number(songNode.dataset.index);
        _this.loadCurrentSong();
        audio.play();
      }
      if (optionNode) {
        //handle option click
      }
    };
  },
  start() {
    this.defineProperty();

    this.handleEvent();

    this.renderPlayList();

    this.loadConfig();

    this.loadCurrentSong();
  },
};

app.start();
