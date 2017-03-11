var game= {
  // 标记边界，移动不能超出格子空间
  rn: 1,
  cn: 1,
  state: 0,//标记蓝色边所面向的方向
  LEFT: 1,
  RIGHT: 2,
  UNDER: 3,
  go: function (input, box) {
    var left = box.offsetLeft;
    var top = box.offsetTop;
    var val = input.value;
    if (val == "GO") {
      if (this.state == 0) {
        if (this.cn > 1) {
          this.cn--;
          box.style.top = top - 123 + "px";
        }
      }
      else if (this.state == this.LEFT) {
        if (this.rn > 1) {

          this.rn--;
          box.style.left = left - 123 + "px";
        }
      }
      else if (this.state == this.UNDER) {
        if (this.cn < 5) {
          this.cn++
          box.style.top = top + 123 + "px";
        }
      }
      else if (this.state == this.RIGHT) {
        if (this.rn < 5) {
          this.rn++;
          box.style.left = left + 123 + "px";
        }

      }
    }
    else if(val=="TUN LEF"){
      this.turnLeft(box);
    }
    else if(val=="TUN RIG"){
      this.turnRight(box);

    }
    else if(val=="TUN BAC"){
      this.turnBack(box);
    }

  },
  // TUN LEF：向左转（逆时针旋转90度）
  turnLeft:function (box) {
    var deg=eval('get'+getComputedStyle(box,null)["transform"]);//构造getmatrix函数,返回上次旋转度数
    var step=-90;//每次旋转多少度
    box.style.transform='rotate('+(deg+step)%360+'deg)';
    if(this.state==0){
      this.state=this.LEFT;
    }
    else if(this.state==this.LEFT){
      this.state=this.UNDER;
    }
    else if(this.state==this.UNDER){
      this.state=this.RIGHT;
    }
    else {
      this.state=0;
    }

  },
  // TUN RIG：向右转（顺时针旋转90度）
  turnRight:function (box) {
    var deg=eval('get'+getComputedStyle(box,null)["transform"]);//构造getmatrix函数,返回上次旋转度数
    var step=90;//每次旋转多少度
    box.style.transform='rotate('+(deg+step)%360+'deg)';
    if(this.state==0){
      this.state=this.RIGHT;
    }
    else if(this.state==this.LEFT){
      this.state=0;
    }
    else if(this.state==this.UNDER){
      this.state=this.LEFT;
    }
    else {
      this.state=this.UNDER;
    }
  },
  // TUN BAC：向右转（旋转180度）
  turnBack:function (box) {
    var deg=eval('get'+getComputedStyle(box,null)["transform"]);//构造getmatrix函数,返回上次旋转度数
    var step=180;//每次旋转多少度
    box.style.transform='rotate('+(deg+step)%360+'deg)';
    if(this.state==0){
      this.state=this.UNDER;
    }
    else if(this.state==this.LEFT){
      this.state=this.RIGHT;
    }
    else if(this.state==this.UNDER){
      this.state=0;
    }
    else {
      this.state=this.LEFT;
    }
  },

}
//由于使用getComputedStyle获取的transform的值为一个矩阵“matrix(a,b,c,d,e,f)”，
// 所以此函数用于把这个矩阵转化为所需要的旋转后的度数
function getmatrix(a,b,c,d,e,f) {
  var aa=Math.round(180*Math.asin(a)/ Math.PI);
  var bb=Math.round(180*Math.acos(b)/ Math.PI);
  var cc=Math.round(180*Math.asin(c)/ Math.PI);
  var dd=Math.round(180*Math.acos(d)/ Math.PI);
  var deg=0;
  if(aa==bb||-aa==bb){
    deg=dd;
  }else if(-aa+bb==180){
    deg=180+cc;
  }else if(aa+bb==180){
    deg=360-cc||360-dd;
  }
  return deg>=360?0:deg;
}
window.onload=function () {
  var input=document.getElementsByTagName("input")[0];
  var box=document.getElementById("box");
  var btn=document.getElementsByTagName("button")[0];
  btn.onclick=function () {
    game.go(input,box);
  }
}