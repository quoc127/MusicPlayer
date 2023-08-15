/*
    1. Render songs                     ---> done
    2. Scroll top                       --->done                   
    3. Play / pause / seek              ---> completed play and pause and rewind envent
    4. CD rorate                        ---> done
    5. Next and prev                    ---> done
    6. Randomm
    7. Next / repeat when ended
    8. Active song
    9. Scroll active song into view
    10. Play son when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $("header h2");
const player = $(".player");
const cdThumb = $(".cd-thumb");
const audio = document.querySelector("#audio");
const cdElement = $(".cd");
const playBtn = $(".btn-toggle-play");
const process = $(".progress");
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Nơi này có anh",
      singer: "Sơn Tùng",
      path: "./assets/music/song_1.mp3",
      image: "./assets/img/img_1.jpg",
    },
    {
      name: "Nevada",
      singer: "Vicetone",
      path: "./assets/music/song_2.mp3",
      image: "./assets/img/img_2.jpg",
    },
    {
      name: "ĐẮM",
      singer: "Xesi, Ricky Star",
      path: "./assets/music/song_3.mp3",
      image: "./assets/img/img_3.jpg",
    },
    {
      name: "Stay",
      singer: "Justin Bieber",
      path: "./assets/music/song_4.mp3",
      image: "./assets/img/img_4.jpg",
    },
    {
      name: "Bài Ca Tuổi Trẻ",
      singer: "TamKa PKL",
      path: "./assets/music/song_5.mp3",
      image: "./assets/img/img_5.jpg",
    },
    {
      name: "Cho Tôi Đi Theo",
      singer: "Ngọt",
      path: "./assets/music/song_6.mp3",
      image: "./assets/img/img_cho_toi_di_theo.jpg",
    },
    {
      name: "Để tôi ôm em bằng giai điệu này",
      singer: "KAI ĐINH x MIN x GREY D",
      path: "./assets/music/song_de_toi_om_em_bang_giai_dieu_nay.mp3",
      image: "./assets/img/img_de_toi_om_em_bang_giai_dieu_nay.jpg",
    },
    {
      name: "Vì tôi còn sống",
      singer: "Tiên Tiên",
      path: "./assets/music/song_vi_toi_con_song.mp3",
      image: "./assets/img/img_vi_toi_con_song.jpg",
    },
    {
      name: "Lần cuối",
      singer: "Ngọt",
      path: "./assets/music/song_lan_cuoi.mp3",
      image: "./assets/img/img_lan_cuoi.jpg",
    },
    {
      name: "Lạ lùng",
      singer: "Vũ",
      path: "./assets/music/song_la_lung.mp3",
      image: "./assets/img/img_la_lung.jpg",
    },
    {
      name: "Lối nhỏ",
      singer: "Đen - Lối Nhỏ ft. Phương Anh Đào",
      path: "./assets/music/song_loi_nho.mp3",
      image: "./assets/img/img_loi_nho.jpg",
    },
    {
      name: "Suýt nữa thì",
      singer: "ANDIEZ",
      path: "./assets/music/song_suyt_nua_thi.mp3",
      image: "./assets/img/img_13.jpg",
    },
    {
      name: "Ta và nàng",
      singer: "JGKiD ft ĐEN",
      path: "./assets/music/song_ta_va_nang.mp3",
      image: "./assets/img/img_ta_va_nang.jpg",
    },
    {
      name: "Thấy chưa",
      singer: "Ngọt",
      path: "./assets/music/song_thay_chua.mp3",
      image: "./assets/img/img_15.jpg",
    },
    {
      name: "Thật ra em chẳng thương anh vậy đâu",
      singer: "Nguyenn x Đặng Tuấn Vũ",
      path: "./assets/music/song_that_ra_em_chua_thuong_anh_den_vay_dau.mp3",
      image: "./assets/img/img_that_ra_em_chang_thuong_anh_den_vay_dau.jpg",
    },
    {
      name: "Thu cuối",
      singer: " Mr T x Yanbi x Hằng Bingboong",
      path: "./assets/music/song_thu_cuoi.mp3",
      image: "./assets/img/img_thu_cuoi.jpg",
    },
    {
      name: "Túy âm",
      singer: "Xesi x Masew x Nhatnguyen",
      path: "./assets/music/song_tuy_am.mp3",
      image: "./assets/img/img_tuy_am.jpg",
    },
    {
      name: "Va vào giai điệu này",
      singer: "MCK ",
      path: "./assets/music/song_va_vao_giai_dieu_nay.mp3",
      image: "./assets/img/img_va_vao_giai_dieu_nay.jpg",
    },
  ],

  handleEvent: function () {
    const cdWidthElemenet = cdElement.offsetWidth;
    const _this = this;
    // zoom out/in "cd" class
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const cdNewWidthElement = cdWidthElemenet - scrollTop;

      cdElement.style.width =
        cdNewWidthElement > 0 ? cdNewWidthElement + "px" : 0;
      cdElement.style.opacity = cdNewWidthElement / cdWidthElemenet;
    };

    // handle rorate "cd" class
    const cdThumRorateAnimate = cdThumb.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iteration: Infinity,
      }
    );
    cdThumRorateAnimate.pause();
    // handle when click play button
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // when song played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumRorateAnimate.play();
    };

    //when song paused
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumRorateAnimate.pause();
    };

    // when process song change
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const processPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        process.value = processPercent;
      }
    };

    // when rewind song
    process.onchange = function (e) {
      const rewindTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = rewindTime;
    };

    //when next song
    nextBtn.onclick = function(){
      _this.nextSong();
      audio.play();
    };

    prevBtn.onclick = function(){
      _this.prevSong();
      audio.play();
    };
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  loadCurretnSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  nextSong: function(){
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0;
    }
    console.log(this.currentIndex);
    this.loadCurretnSong();
  },

  prevSong: function(){
    this.currentIndex--;
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length - 1;
      // console.log(this.currentIndex);
    }
    this.loadCurretnSong();
  },

  render: function () {
    const htmls = this.songs.map((song) => {
      return `
        <div class="song">
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
    $(".playlist").innerHTML = htmls.join("");
  },

  start: function () {
    // handle envent (DOM envent)
    this.handleEvent();

    // define poperties for object
    this.defineProperties();

    // load song infomation to the UI when start application
    this.loadCurretnSong();
    // render playlist(song)
    this.render();
  },
};

app.start();
