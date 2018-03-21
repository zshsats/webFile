const loginFun = {
    /*生成四位的随机数*/
    rand() {
        let str = "abcdefghijklmnopqrstuvwxyz0123456789";
        let arr = str.split("");
        let validate = "";
        let ranNum;
        for (let i = 0; i < 4; i++) {
            ranNum = Math.floor(Math.random() * 36);   //随机数在[0,35]之间
            validate += arr[ranNum];
        }
        return validate;
    },
    /*干扰线的随机x坐标值*/
    lineX(w) {
        var ranLineX = Math.floor(Math.random() * w);
        return ranLineX;
    },
    /*干扰线的随机y坐标值*/
    lineY(h) {
        var ranLineY = Math.floor(Math.random() * h);
        return ranLineY;
    },
    valideChange(that,w,h,cal) {
        let content = that.getContext('2d');
        let checkNum=this.rand();
        content.fillStyle = '#000';
        content.fillRect(0, 0, w, h);
        /*生成干扰线20条*/
        for (let j = 0; j < 60; j++) {
            content.strokeStyle = '#fff';
            content.beginPath();    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
            content.moveTo(this.lineX(w), this.lineY(h));
            content.lineTo(this.lineX(w), this.lineY(h));
            content.lineWidth = 0.5;
            content.closePath();
            content.stroke();
        }

        content.fillStyle = '#f6f6f6';
        content.font = 'bold 45px Arial';
        content.fillText(checkNum,60, 35);   //把rand()生成的随机数文本填充到canvas中
        cal(checkNum);
    },
};
export default loginFun;