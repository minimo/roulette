/*
 *  MainScene.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("roulette.MainScene", {
    superClass: tm.app.Scene,
    
    phase: 0,       //現在フェーズ
                    //0: 起動直後
                    //1: 待機中（ルーレット起動待ち）
                    //2: ルーレット回転中
                    //3: ストップボタン押下後スライド中
                    //4: 決定
                    //5: 決定後戻り待ち

    wait: 1,        //ローリングウェイト
    select: 0,      //選択番号
    
    time: 0,
    interval: 0,
    
    //ルーレット用
    r_w: 900,
    r_h: 500,
    
    //back ground music
    bgm: null,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 1.0)";
        
        this.bgm = tm.asset.AssetManager.get("bgm").clone();
        if (this.bgm) {
            this.bgm.loop = true;
            this.bgm.currentTime = 0;
        }


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
        var lb = this.infoLabel = tm.display.OutlineLabel("START!", 30).addChildTo(this.info);
        lb.x = SC_W/2;
        lb.y = SC_H/2;
        lb.fontFamily = "'Orbitron'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 180;
        lb.fontWeight = 700;
        lb.outlineWidth = 2;
        lb.time = 1;
        lb.visible = false;
        lb.update = function() {
            if (that.phase != 1 && that.phase != 3) {
                this.visible = false;
                return;
            }

            if (that.phase == 1) {
                this.text = "READY!!"
                if (this.time == sec(1.25) && this.visible) {
                    this.visible = false;
                    this.time = 0;
                }
                if (this.time == sec(0.75) && !this.visible) {
                    this.visible = true;
                    this.time = 0;
                }
            } else if (that.phase == 3){
                this.text = "STOP!!"
                this.visible = true;
            } else {
                this.visible = false;
            }
            this.time++;
        };

        //写真準備
        var ps = this.photos = [];
        var r = (Math.PI*2)/NUM_PHOTO;
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i] = tm.display.Sprite(""+(i+1),PHOTO_W, PHOTO_H).addChildTo(this.base);
            p.number = i+1;
            p.r_w = this.r_w;
            p.r_h = this.r_h;
            p.x = rand(-SC_W/2+200, SC_W/2-200);
            p.y = rand(-SC_H/2+100, SC_H/2-100);
            p.setScale(0.5);
            p.active = false;
            p.skip = false;
            p.update = function() {
                if (that.phase > 1) {
                    this.r += 0.0001;
                    this.x = Math.sin(this.r)*this.r_w;
                    this.y = Math.cos(this.r)*this.r_h;
                    if (this.active) {
                        this.remove();
                        this.addChildTo(that.base);
                        this.setScale(0.5);
                    } else {
                        this.setScale(0.1);
                    }
                }
            }
        }

        //シャッフルして順番に円形に並べる
        this.photos.shuffle();
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i];
            p.r = -r*i;
            p.currentX = Math.sin(p.r)*p.r_w;
            p.currentY = Math.cos(p.r)*p.r_h;
        }
        
        this.center = tm.display.Sprite("1", 800, 600).addChildTo(this.base);
        this.center.visible = false;
    },

    update: function() {
        var kb = app.keyboard;

        if (this.phase == 0 && this.time % sec(0.5) == 0) {
            var num = rand(1, NUM_PHOTO);
            this.photos[num].remove();
            this.photos[num].addChildTo(this.base);
            this.photos[num].x = rand(-SC_W/2+200, SC_W/2-200);
            this.photos[num].y = rand(-SC_H/2+100, SC_H/2-100);
        }

        //初回処理
        if (this.phase == 0 && kb.getKey("space")) {
            this.interval = this.time+sec(2.0);
            this.startup();
            this.phase++;
        }

        //回転スタート
        if (this.phase == 1 && kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+sec(2.0);
            this.wait = 1;
            this.phase++;
        }

        //ルーレット回転処理
        if (this.phase == 2 || this.phase == 3) {
            if (this.time % this.wait == 0) {
                this.photos[this.select].active = false;
                this.select++;
                if (this.select == NUM_PHOTO) {
                    this.select = 0;
                }
                tm.asset.AssetManager.get("beep").clone().play();
                this.photos[this.select].active = true;
                var num = this.photos[this.select].number;
                this.center.remove();
                this.center = tm.display.Sprite(""+num, 800, 600).addChildTo(this.base);
            }
        }

        //回転ストップ
        if (this.phase == 2 && kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+sec(2.0);
            this.stop = true;
            this.phase++;
        }

        //スライド中
        if (this.phase == 3) {
            if (this.time % sec(0.02) == 0)this.wait++;
            if (this.wait == sec(1.0)) {
                //当選者決定
                this.interval = this.time+sec(1.0);
                this.center.tweener.scale(1.8, 2000, "easeOutQuint");
                this.photos[this.select].tweener.clear().fadeOut(1000);
//                this.photos[this.select].tweener.clear().scale(0.1, 1000, "easeOutQuint");
                this.photos[this.select].active = false;
                this.phase++;
            }
        }

        //当選者決定後、最初に戻る
        if (this.phase == 4 && kb.getKey("space") && this.time > this.interval) {
            this.interval = this.time+sec(2.0);
            this.center.tweener.clear().fadeOut(1000);

            this.photos[this.select].skip = true;
            this.photos.splice(this.select,1);
            NUM_PHOTO--;

            this.shuffle();
            this.phase = 1;
            this.infoLabel.visible = true;
        }

        //当選者決定後、最初に戻る（キャンセル）
        if (this.phase == 4 && kb.getKey("return") && this.time > this.interval) {
            this.interval = this.time+sec(2.0);

            var x = this.photos[this.select].x
            var y = this.photos[this.select].y
            this.center.tweener.clear().to({x: this.photos[this.select].x, y: this.photos[this.select].y, scaleX: 0.1, scaleY: 0.1}, 1000, "easeOutQuint").fadeOut(1);
            
            this.photos[this.select].active = false;
            this.photos[this.select].visible = true;
            this.photos[this.select].alpha = 1.0;

            this.phase = 1;
            this.infoLabel.visible = true;
        }

        this.bg.x-=0.2;
        if (this.bg.x < -3848+SC_W) {
            this.bg.x = 0;
        }
        this.time++;
    },
    
    startup: function() {
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i];
            p.tweener.wait(1000).to({x: p.currentX, y: p.currentY, scaleX: 0.1, scaleY: 0.1}, 1000, "easeOutQuint");
//            p.tweener.wait(1000).scale(0.1, 500, "easeOutQuint").to({ x: p.currentX, y: p.currentY }, 1000, "easeOutQuint");
        }
    },

    shuffle: function() {
        this.photos.shuffle();
        var r = (Math.PI*2)/NUM_PHOTO;
        for (var i = 0; i < NUM_PHOTO; i++) {
            var p = this.photos[i];
            p.r = -r*i;
            p.currentX = Math.sin(p.r)*p.r_w;
            p.currentY = Math.cos(p.r)*p.r_h;
            p.tweener.clear().to({x: p.currentX, y: p.currentY, scaleX: 0.1, scaleY: 0.1}, 1000, "easeOutQuint");
        }
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


