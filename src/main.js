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
SC_W = 800;
SC_H = 600;

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~~(60 * s) };               //秒からフレーム数へ変換
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生
//var rand = function(max) {return ~~(Math.random() * max);}

//数値の制限
var clamp = function(x, min, max) {
    return (x<min)?min:((x>max)?max:x);
};

//インスタンス
app = {};

//アプリケーションメイン
tm.main(function() {
    app = roulette.CanvasApp("#world");
    app.run();
});
