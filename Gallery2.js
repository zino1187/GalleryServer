class Gallery{
    /*
    <div style="border:1px solid red;margin-bottom:1px"> 
    <img src="./images/bird.png" width="25px"/>
    <span>앵그리버드 2020</span>
    </div>
    */
    constructor(container, src, msg){
        this.container=container;        
        this.div; 
        this.src=src;
        this.img; 
        this.span;

        this.div = document.createElement("div");
        this.img = document.createElement("img");        
        this.span = document.createElement("span");
        
        this.div.style.border="1px solid red";
        this.div.style.margin="margin-bottom:1px";

        this.img.src = this.src; 
        this.img.style.width="25px";

        this.span.innerText=msg;

        this.div.appendChild(this.img);
        this.div.appendChild(this.span);        

        this.container.appendChild(this.div);
    }

}