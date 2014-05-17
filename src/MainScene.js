/*
 *  MainScene.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("roulette.MainScene", {
    superClass: tm.app.Scene,
    
    ready: true,    //READY表示フラグ
    stop: false,    //ルーレットストップフラグ
    wait: 1,        //ローリングウェイト
    select: 0,      //選択番号

    time: 0,
    interval: 0,
    
    //ルーレット用
    r_w: 900,
    r_h: 500,

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
            if (!that.ready) {
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
        
        //基準オブジェクト
        this.root = tm.app.Object2D().addChildTo(this);
        this.base = tm.app.Object2D().addChildTo(this.root);
        this.base.x = SC_W/2;
        this.base.y = SC_H/2;

        //写真準備
        var ps = this.photos = [];
        var r = (Math.PI*2)/NUM_PHOTO;
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i] = tm.display.Sprite(""+(i+1),640, 480).addChildTo(this.base);
            p.r_w = this.r_w;
            p.r_h = this.r_h;
            p.r = -r*i;
            p.x = Math.sin(p.r)*p.r_w;
            p.y = Math.cos(p.r)*p.r_h;
            p.setScale(0.1);
            p.active = false;
            p.sc = 0.1;
            p.update = function() {
                if (this.active) {
                    this.sc+=0.01;
                    if (this.sc > 0.5) this.sc = 0.5;
                    this.sc = 0.5;
                } else {
                    this.sc-=0.01;
                    if (this.sc < 0.1) this.sc = 0.1;
                    this.sc = 0.1;
                }
                this.setScale(this.sc);
            }
        }
//        this.photos.shuffle();
        this.center = tm.display.Sprite("1", 800, 600).addChildTo(this.base);
        this.center.visible = false;
    },

    update: function() {
        var kb = app.keyboard;
        if (this.ready && kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+60;
            this.ready = false;
        }

        if (!this.ready) {
            if (this.time % this.wait == 0) {
                this.photos[this.select].active = false;
                this.select++;  
                if (this.select == NUM_PHOTO) {
                    this.select = 0;
                }
                this.photos[this.select].active = true;
                this.center.remove();
                this.center = tm.display.Sprite(""+(this.select+1), 800, 600).addChildTo(this.base);
            }
        }

        this.bg.x-=0.2;
        if (this.bg.x < -3848+SC_W) {
            this.bg.x = 0;
        }
        this.time++;
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


