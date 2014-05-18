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
    stop: true,     //ルーレットストップフラグ
    finish: true,   //決定フラグ
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

        //基準オブジェクト
        this.root = tm.app.Object2D().addChildTo(this);
        this.base = tm.app.Object2D().addChildTo(this.root);
        this.base.x = SC_W/2;
        this.base.y = SC_H/2;
        this.info = tm.app.Object2D().addChildTo(this);

        //情報ラベル
        var that = this;
        var lb = this.startLabel = tm.display.OutlineLabel("START!", 30).addChildTo(this);
        lb.x = SC_W/2;
        lb.y = SC_H/2;
        lb.fontFamily = "'Orbitron'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 90;
        lb.fontWeight = 700;
        lb.outlineWidth = 2;
        lb.active = true;
        lb.time = 1;
        lb.update = function() {
            if (!that.ready) {
                this.visible = false;
                return;
            }

            if (this.time == sec(1.25) && this.visible) {
                this.visible = false;
                this.time = 0;
            }
            if (this.time == sec(0.75) && !this.visible) {
                this.visible = true;
                this.time = 0;
            }
            this.time++;
        };

        //写真準備
        var ps = this.photos = [];
        var r = (Math.PI*2)/NUM_PHOTO;
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i] = tm.display.Sprite(""+(i+1),PHOTO_W, PHOTO_H).addChildTo(this.base);
            p.r_w = this.r_w;
            p.r_h = this.r_h;
            p.r = -r*i;
            p.x = rand(-SC_W/2+100, SC_W/2-100);
            p.y = rand(-SC_H/2+100, SC_H/2-100);
            p.currentX = Math.sin(p.r)*p.r_w;
            p.currentY = Math.cos(p.r)*p.r_h;
            p.setScale(0.5);
            p.active = false;
            p.sc = 0.1;
            p.update = function() {
                if (!that.ready) {
                    this.r += 0.0001;
                    this.x = Math.sin(this.r)*this.r_w;
                    this.y = Math.cos(this.r)*this.r_h;
                    if (this.active) {
                        this.sc+=0.01;
                        if (this.sc > 0.5) this.sc = 0.5;
                        this.sc = 0.5;
                        this.remove();
                        this.addChildTo(that.base);
                    } else {
                        this.sc-=0.01;
                        if (this.sc < 0.1) this.sc = 0.1;
                        this.sc = 0.1;
                    }
                    this.setScale(this.sc);
                }
            }
//            p.tweener.wait(1000).scale(0.1, 500, "easeOutQuint").to({ x: p.currentX, y: p.currentY }, 1000, "easeOutQuint");
            p.tweener.wait(1000).to({x: p.currentX, y:p.currentY, scaleX: 0.1, scaleY: 0.1}, 1000, "easeOutQuint")
        }
//        this.photos.shuffle();
        this.center = tm.display.Sprite("1", 800, 600).addChildTo(this.base);
        this.center.visible = false;
    },

    update: function() {
        var kb = app.keyboard;
        //スタート処理
        if (this.ready && kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+sec(2.0);
            this.ready = false;
            this.stop = false;
            this.finish = false;
            this.wait = 1;
        }

        //ストップ処理
        if (!this.ready && !this.stop && kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+sec(2.0);
            this.stop = true;
        }

        if (!this.ready && this.stop) {
            if (this.time % 3 == 0)this.wait++;
            if (this.wait == 60) {
                this.interval = this.time+sec(5.0);
                this.finish = true;
            }
        }

        //ストップ処理
        if (this.finish && kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+sec(2.0);
            this.ready = false;
        }

        if (!this.finish) {
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


