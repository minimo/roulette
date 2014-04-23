/*
 *  MainScene.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("roulette.MainScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();

        var that = this;
        //派兵レートラベル
        var lb = this.rateLabel = tm.display.OutlineLabel("50%", 30).addChildTo(this);
        lb.x = 580;
        lb.y = 620;
        lb.fontFamily = "'Orbitron'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 30;
        lb.fontWeight = 700;
        lb.outlineWidth = 2;
        lb.update = function() {
            if (that.control == CTRL_RATE) {
                this.fontSize++;
            } else {
                this.fontSize--;
            }
            this.fontSize = clamp(this.fontSize, 30, 40);
            this.text = that.world.rate + "%";
        };
    },

    update: function() {
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
    },

});
