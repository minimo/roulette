/*
 *  roulette.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

NUM_PHOTO = 8;

//アセット登録
var assets = {
    //images
    "bg":   "assets/5212712025_93cca9e023_o.jpg",

    //photo
    "1":   "photo/1.png",
    "2":   "photo/2.png",
    "3":   "photo/3.png",
    "4":   "photo/4.png",
    "5":   "photo/1.png",
    "6":   "photo/2.png",
    "7":   "photo/3.png",
    "8":   "photo/4.png",
}

//namespace tiger
roulette = {
    core: null,
};

tm.define("roulette.CanvasApp", {
    superClass: tm.app.CanvasApp,

    init: function(id) {
        this.superInit(id);
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = 60;
        this.background = "rgba(0, 0, 0, 0)";
        this.keyboard = tm.input.Keyboard(window);

        roulette.core = this;
        
        var loadingScene = tm.ui["LoadingScene"]({
            assets: assets,
            width: SC_W,
            height: SC_H,
            nextScene: function() {
                this._onLoadAssets();
                return roulette.MainScene();
            }.bind(this),
        });
        loadingScene.bg.canvas.clearColor("black");
        this.replaceScene(loadingScene);
  },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
    },
});


