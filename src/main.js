/*
 *  main.js
 *  2014/04/21
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//乱数発生器
var mt = new MersenneTwister();

//定数
//デバッグフラグ
var DEBUG = false;

//スクリーンサイズ
SC_W = 1920;
SC_H = 1080;

//写真サイズ
PHOTO_W = 800;
PHOTO_H = 600;

//写真数
NUM_PHOTO = 100;

//フレームレート
fps = 240;

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~~(fps * s) };               //秒からフレーム数へ変換
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生
//var rand = function(max) {return ~~(Math.random() * max);}

//数値の制限
var clamp = function(x, min, max) {
    return (x<min)?min:((x>max)?max:x);
};

//easing qubic in out
var ease_in_out = function(t, b, c, d) {
    t /= d/2.0
    if (t < 1)return c/2.0*t*t + b;
    t = t - 1;
    return -c/2.0 * (t*(t-2) - 1) + b;
}

//インスタンス
app = {};

//アプリケーションメイン
tm.main(function() {
    app = roulette.CanvasApp("#world");
    app.run();
});
