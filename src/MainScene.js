/*
 *  MainScene.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("roulette.MainScene", {
    superClass: tm.app.Scene,

    time: 0,
    interval: 0,
    stop: true,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 1.0)";

        //バックグラウンド
        var bg = this.bg = tm.display.Sprite("bg",3848, 1280).addChildTo(this);
        bg.x = 0;
        bg.y = 0;
        bg.originX = bg.originY = 0;

        var that = this;
        var lb = this.startLabel = tm.display.OutlineLabel("START!", 30).addChildTo(this);
        lb.x = SC_W/2;
        lb.y = SC_H/2;
        lb.fontFamily = "'Orbitron'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 30;
        lb.fontWeight = 700;
        lb.outlineWidth = 2;
        lb.active = true;
        lb.time = 1;
        lb.update = function() {
            if (!this.active || !that.stop) {
                this.visible = false;
                return;
            }

            if (this.time == 75 && this.visible) {
                this.visible = false;
                this.time = 0;
            }
            if (this.time == 45 && !this.visible) {
                this.visible = true;
                this.time = 0;
            }
            this.time++;
        };

        //写真準備
        var ps = this.photos = [];
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i] = tm.display.Sprite(""+(i+1),640, 480).addChildTo(this);
            p.x = -SC_W-i*640;
            p.y = SC_H/2;
            var that = this;
            p.update = function() {
                if (!that.stop) this.x += 100;
            }
        }
        this.photos.shuffle();
    },

    update: function() {
        var kb = app.keyboard;
        if (kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+60;
        }

        this.bg.x-=0.2;
        if (this.bg.x < -3848+SC_W) {
            this.bg.x = 0;
        }
        this.time++;
    },

    start: function() {
        this.photos.shuffle();
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i];
            p.x = -SC_W-i*640;
        }
        this.stop = false;
    },
    
    stop: function() {
        this.stop = true;
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


