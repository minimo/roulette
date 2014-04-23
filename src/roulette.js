/*
 *  roulette.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//アセット登録
var assets = {
    //images
    "arrow":        "assets/arrow.png",
    "planet":       "assets/planet.png",
    "planet_mono":  "assets/planet_mono.png",
    "frigate":      "assets/frigate1.png",

    "laser_b":      "assets/laser_b.png",
    "laser_r":      "assets/laser_r.png",
    "laser_h":      "assets/laser_h.png",
    "laser_head":   "assets/laser_head.png",

    "explode":      "assets/explode.png",

    "bg1":          "assets/5212712025_93cca9e023_o.jpg",
}

//namespace tiger
roulette = {
    core: null,
};

tm.define("roulette.CanvasApp", {
    superClass: tm.app.CanvasApp,

    init: function(id) {
        this.superInit(id);
        roulette.core = this;
   },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
    },
});


