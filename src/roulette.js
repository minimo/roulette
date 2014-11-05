/*
 *  roulette.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 */

//namespace tiger
roulette = {
    core: null,
};

tm.define("roulette.CanvasApp", {
    superClass: tm.app.CanvasApp,

    init: function(id) {
        this.superInit(id);
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = fps;
        this.background = "rgba(0, 0, 0, 0)";
        this.keyboard = tm.input.Keyboard(window);

        roulette.core = this;
        
        var loadingScene = tm.ui["LoadingScene"]({
            assets: assets,
            width: SC_W,
            height: SC_H,
            bgColor: "black",
            nextScene: function() {
                this._onLoadAssets();
                return roulette.MainScene();
            }.bind(this),
        });
        this.replaceScene(loadingScene);
  },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
    },
});


