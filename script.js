let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnable = true;


function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;

}

function hideItem(direction){
    isEnable = false;
    items[currentItem].classList.add(direction);    
    items[currentItem].addEventListener('animationend', function(){
        this.classList.remove('active', direction);
    });
}

function showItem(direction){
    items[currentItem].classList.add('next', direction);    
    items[currentItem].addEventListener('animationend', function(){
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnable = true;
    });
}



function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

document.querySelector('.controls.left').addEventListener('click', function() {
    if (isEnable) {
        previousItem(currentItem);
    }
});

document.querySelector('.controls.right').addEventListener('click', function() {
    if (isEnable) {
        nextItem(currentItem);
    }
});



const swipeDetect = (el) => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let dist = 0;

    let startTime = 0;
    let elapsedTime = 0;
    
    let threshold = 150;     //Distance of swipe
    let restraint = 100;    //Angle of swipe -- Distance Y
    let allowedTime = 300;   //Time if swipe
    
    surface.addEventListener('mousedown', function(e){
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventdefault();
    });

    surface.addEventListener('mouseup', function(e){
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) > threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) { 
                    if (isEnable) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnable) {
                        nextItem(currentItem);
                    }
                }
            } 
        }
        e.preventdefault();
    });

/*    surface.addEventListener('touchstart', function(e){
        if (e.target.classList.contains('arrow') || e.target.classList.contains('controls')){
            if (e.target.classList.contains('left')) {
                if (isEnable) {
                    previousItem(currentItem);
                }
            } else if ((e.target.classList.contains('right')) {
                if (isEnable) {
                    nextItem(currentItem);
                }
            })
        }
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        e.preventdefault();
    });

    surface.addEventListener('touchmove', function(e){
        e.preventdefault();
    });

    surface.addEventListener('touchend', function(e){
        let touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) > threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    if (isEnable) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnable) {
                        nextItem(currentItem);
                    }
                }
            } 
        }
        e.preventdefault();
    });*/
}

let el = document.querySelector('.carousel');
swipeDetect(el);
