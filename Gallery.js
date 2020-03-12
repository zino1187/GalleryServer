/*
게시물 하나를 담게될 클래스 정의  
객체지향 언어에서는 데이터만 담는 인스턴스를 가리켜 VO, DTO
<div style="border:1px solid red;margin-bottom:1px"> 
    <img src="./images/bird.png" width="25px"/>
    <span>앵그리버드 2020</span>
</div>
ECMAScript 2015 부터 클래스,생성자, 상속 지원
*/
class Gallery{
    //멤버변수는 생성자안에 정의한다!!  java 와는 다름
    constructor(container, src, msg){
        this.container= container;
        this.div;
        this.img;
        this.src=src;
        this.span;
        this.msg=msg;

        this.div = document.createElement("div");
        this.img = document.createElement("img");
        this.span = document.createElement("span");

        this.div.style.border="1px solid red";
        this.div.style.margin="margin-bottom:1px";

        this.img.src=this.src;
        this.img.style.width=25+"px";

        this.span.innerText=this.msg;

        //조립하기!!
        this.div.appendChild(this.img);
        this.div.appendChild(this.span);

        //다 조립된 div를 원하는 컨테이너에 부착!! ( 매개변수로 받자! )
        this.container.appendChild(this.div);
    }

}





