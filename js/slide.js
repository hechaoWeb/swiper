(function(){
    
    var Slide = function(id){
        // console.log(this);
        this.slideDom = document.getElementById(id);//滑动区域
        this.length = this.slideDom.children.length;//子类节个数
        this.index = 0;//初始下标
        this.prevX = 0;
        this.slideDom.addEventListener('touchstart', this, false);
        this.slideDom.addEventListener('touchmove', this, false);
        this.slideDom.addEventListener('touchend', this, false);
    }
    Slide.prototype = {
        slideDom:'',
        length:0,
        index:0,
        prevX:0,
        startX:0,
        moveX:0,
        deltaX:0,
        handleEvent:function(e){
            var type = e.type;
            switch(type){
                case 'touchstart':
                    this.touchstart(e);
                    break;
                case 'touchmove':
                    this.touchmove(e);
                    break;
                case 'touchend':
                    this.touchend(e);
                    break;
            }
        },
        touchstart:function(e){
            console.log(e);
            var point = this.getPoint(e);
            this.startX = point.pageX;
            console.log(this.startX,'startX');
        },
        touchmove:function(e){
            e.preventDefault();
            var point = this.getPoint(e);
            this.moveX = point.pageX;
            console.log(this.moveX,'moveX');
            this.deltaX = this.moveX - this.startX;
            this.domove(this.deltaX+this.prevX);
        },
        touchend:function(e){
            var x = Math.abs(this.deltaX);
            var item_w = this.slideDom.offsetWidth;
            if(this.deltaX>0){
                if(x>item_w){
                    var indexd = Math.round(x / item_w);
                    this.index = this.index - indexd;
                }else{
                    if(x/item_w > 0.2){
                        this.index--
                    }
                }
            }else if(this.deltaX<0){
                if(x>item_w){
                    var indexd = Math.round(x / item_w);
                    this.index = this.index + indexd;
                }else{
                    if(x/item_w > 0.2){
                        this.index++;
                    }
                }
            }
            if(this.index >= (this.length-1)){
                this.index = this.length-1;
            }
            if(this.index <0 ){
                this.index = 0;
            }
            this.prevX = -this.index*item_w;
            this.domove(this.prevX,true);
        },
          //默认以第一个手指的位置计算
        getPoint:function(e) {
            // console.log(this);
            return e.touches ? e.touches[0] : e;
        },
          //transform移动
        domove:function(x,t){
            if(t){
                this.slideDom.style.transform = 'translate(' + x + 'px, 0px)';
                this.slideDom.style.transition = 'transform 300ms ease';
            //   slideDom.setAttribute('style', 'transform: translate(' + x + 'px, 0px);transition:transform 300ms ease');
            }else{
                this.slideDom.style.transform = 'translate(' + x + 'px, 0px)';
                this.slideDom.style.transition = 'transform 0ms ease';
            //   slideDom.setAttribute('style', 'transform: translate(' + x + 'px, 0px);transition:transform 0ms ease');
            }  
        },
    }
    window.Slide = Slide;
}())