/*
 *  roulette.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

NUM_PHOTO = 100;

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
    "9":   "photo/1.png",
    "10":   "photo/2.png",
    "11":   "photo/1.png",
    "12":   "photo/2.png",
    "13":   "photo/3.png",
    "14":   "photo/4.png",
    "15":   "photo/1.png",
    "16":   "photo/2.png",
    "17":   "photo/3.png",
    "18":   "photo/4.png",
    "19":   "photo/1.png",
    "20":   "photo/2.png",
    "21":   "photo/1.png",
    "22":   "photo/2.png",
    "23":   "photo/3.png",
    "24":   "photo/4.png",
    "25":   "photo/1.png",
    "26":   "photo/2.png",
    "27":   "photo/3.png",
    "28":   "photo/4.png",
    "29":   "photo/1.png",
    "30":   "photo/2.png",
    "31":   "photo/1.png",
    "32":   "photo/2.png",
    "33":   "photo/3.png",
    "34":   "photo/4.png",
    "35":   "photo/1.png",
    "36":   "photo/2.png",
    "37":   "photo/3.png",
    "38":   "photo/4.png",
    "39":   "photo/1.png",
    "40":   "photo/2.png",
    "41":   "photo/1.png",
    "42":   "photo/2.png",
    "43":   "photo/3.png",
    "44":   "photo/4.png",
    "45":   "photo/1.png",
    "46":   "photo/2.png",
    "47":   "photo/3.png",
    "48":   "photo/4.png",
    "49":   "photo/1.png",
    "50":   "photo/2.png",
    "51":   "photo/1.png",
    "52":   "photo/2.png",
    "53":   "photo/3.png",
    "54":   "photo/4.png",
    "55":   "photo/1.png",
    "56":   "photo/2.png",
    "57":   "photo/3.png",
    "58":   "photo/4.png",
    "59":   "photo/1.png",
    "60":   "photo/2.png",
    "61":   "photo/1.png",
    "62":   "photo/2.png",
    "63":   "photo/3.png",
    "64":   "photo/4.png",
    "65":   "photo/1.png",
    "66":   "photo/2.png",
    "67":   "photo/3.png",
    "68":   "photo/4.png",
    "69":   "photo/1.png",
    "70":   "photo/2.png",
    "71":   "photo/1.png",
    "72":   "photo/2.png",
    "73":   "photo/3.png",
    "74":   "photo/4.png",
    "75":   "photo/1.png",
    "76":   "photo/2.png",
    "77":   "photo/3.png",
    "78":   "photo/4.png",
    "79":   "photo/1.png",
    "80":   "photo/2.png",
    "81":   "photo/1.png",
    "82":   "photo/2.png",
    "83":   "photo/3.png",
    "84":   "photo/4.png",
    "85":   "photo/1.png",
    "86":   "photo/2.png",
    "87":   "photo/3.png",
    "88":   "photo/4.png",
    "89":   "photo/1.png",
    "90":   "photo/2.png",
    "91":   "photo/1.png",
    "92":   "photo/2.png",
    "93":   "photo/3.png",
    "94":   "photo/4.png",
    "95":   "photo/1.png",
    "96":   "photo/2.png",
    "97":   "photo/3.png",
    "98":   "photo/4.png",
    "99":   "photo/1.png",
    "100":   "photo/2.png",
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


