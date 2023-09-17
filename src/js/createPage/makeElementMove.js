'use strict'

export function makeElementMove(elem){

    elem.ondragstart = function() {
        return false;
    };
    setResizeObserver(elem);

    return function move(event) {
        if(event.pageY > elem.getBoundingClientRect().top + window.pageYOffset + elem.offsetHeight - 18
            && event.pageX > elem.getBoundingClientRect().left + window.pageXOffset + elem.offsetWidth - 18) return;

        let shiftX = event.clientX - elem.getBoundingClientRect().left;
        let shiftY = event.clientY - elem.getBoundingClientRect().top;

        elem.style.position = 'absolute';

        document.querySelector('.result').append(elem);

        moveAt(event.pageX, event.pageY);

        // переносит elem на координаты (pageX, pageY),
        // дополнительно учитывая изначальный сдвиг относительно указателя мыши
        function moveAt(pageX, pageY) {
            let resultWindow = document.querySelector('.result');
            elem.style.left = pageX - shiftX + 'px';
            elem.style.top = pageY - shiftY + 'px';

            if(elem.offsetLeft < resultWindow.offsetLeft) elem.style.left = resultWindow.offsetLeft + 'px';
            if(elem.offsetLeft + elem.offsetWidth > resultWindow.offsetLeft + resultWindow.offsetWidth) elem.style.left = resultWindow.offsetLeft + resultWindow.offsetWidth - elem.offsetWidth + 'px';
            if(elem.offsetTop < resultWindow.offsetTop) elem.style.top = resultWindow.offsetTop + 'px';
            if(elem.offsetTop + elem.offsetHeight > resultWindow.offsetTop + resultWindow.offsetHeight) elem.style.top = resultWindow.offsetTop + resultWindow.offsetHeight - elem.offsetHeight + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // передвигаем elem при событии mousemove
        document.addEventListener('mousemove', onMouseMove);

        // отпустить elem, удалить ненужные обработчики
        window.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            event.target.style.cursor = 'default';
            elem.onmouseup = null;
        };

    }
}


function setResizeObserver(elem){
    let resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(elem)

    function callback(e){
        if(!e[0].target) return

        let resultWindow = document.querySelector('.result');
        let textarea = e[0].target;

        textarea.style.backgroundSize = `${textarea.offsetWidth}px ${textarea.offsetHeight}px`

        if (textarea.offsetLeft + textarea.offsetWidth > resultWindow.offsetLeft + resultWindow.offsetWidth){
            textarea.style.maxWidth = resultWindow.offsetWidth - (textarea.offsetLeft - resultWindow.offsetLeft)  + 'px';
        }
        if (textarea.offsetLeft + textarea.offsetWidth < resultWindow.offsetLeft + resultWindow.offsetWidth){
            textarea.style.maxWidth = resultWindow.offsetWidth + 'px';
        }

        if (textarea.offsetTop + textarea.offsetHeight > resultWindow.offsetTop + resultWindow.offsetHeight){
            textarea.style.maxHeight = resultWindow.offsetHeight - (textarea.offsetTop - resultWindow.offsetTop) + 'px';
        }
        if (textarea.offsetTop + textarea.offsetHeight < resultWindow.offsetTop + resultWindow.offsetHeight){
            textarea.style.maxHeight = resultWindow.offsetHeight + 'px';
        }
    }
}