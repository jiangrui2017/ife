var game= {
  // ��Ǳ߽磬�ƶ����ܳ������ӿռ�
  rn: 1,
  cn: 1,
  state: 0,//�����ɫ��������ķ���
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
  // TUN LEF������ת����ʱ����ת90�ȣ�
  turnLeft:function (box) {
    var deg=eval('get'+getComputedStyle(box,null)["transform"]);//����getmatrix����,�����ϴ���ת����
    var step=-90;//ÿ����ת���ٶ�
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
  // TUN RIG������ת��˳ʱ����ת90�ȣ�
  turnRight:function (box) {
    var deg=eval('get'+getComputedStyle(box,null)["transform"]);//����getmatrix����,�����ϴ���ת����
    var step=90;//ÿ����ת���ٶ�
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
  // TUN BAC������ת����ת180�ȣ�
  turnBack:function (box) {
    var deg=eval('get'+getComputedStyle(box,null)["transform"]);//����getmatrix����,�����ϴ���ת����
    var step=180;//ÿ����ת���ٶ�
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
//����ʹ��getComputedStyle��ȡ��transform��ֵΪһ������matrix(a,b,c,d,e,f)����
// ���Դ˺������ڰ��������ת��Ϊ����Ҫ����ת��Ķ���
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