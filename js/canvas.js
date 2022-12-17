//colors of bubbles
const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
//bubbles quantity
const BUBBLE_DENSITY = 100;
/*начальная позиция пузырька; использует функцию Math.random, чтобы получить число в промежутке от left до right, а затем с помощью метода toFixed(2) мы оставляем от числа два знака после запятой.*/    
function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
 }
 
 class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
 
        this.getCanvasSize();
 
        this.init();
    }
  
    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }


    init() {
            /*Math.random()-случ. число [0,1);умнож на 4(длина массива колорс)-
            это будет случ число от 0 до 4-1(т.к. 1 в кругл скобках);  math.floor округл до меньш целого=>
            получаем случ номер элемента массива COLORS[], т.е. случ цвет пузырька */
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            //случайное число от 5 до 10, деленное на 10(прозрачность цвета 0,5-1)
            this.alpha = generateDecimalBetween(5, 10) / 10;
            //случайное число от 1 до 3
            this.size = generateDecimalBetween(2, 6);
            //начальн координата Х(от 0 до this.canvasWidth)
            this.translateX = generateDecimalBetween(0, this.canvasWidth);
            //начальн координата У(от 0 до this.canvasHeight)
            this.translateY = generateDecimalBetween(0, this.canvasHeight);
            //скорость движ пузырька -случ число от 20 до 40
            /*Теперь инициализируем дельту перемещения точки по оси x и по оси y. На это число мы будем все время смещать позицию пузырька. движение по горизонтали (movementX) может быть от -2 до 2 — пузырьки будут идти не строго вверх, а с небольшим смещением.  */
            this.velocity = generateDecimalBetween(20, 40);
            this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
            this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }
    /*метод move. В нем нужно обновлять x- и y-координаты нашего пузырька на значения movementX и movementY. X- и y-координаты хранятся в свойствах translateX и translateY. Сейчас мы будем постоянно уменьшать x- и y-координаты и в какой-то момент можем выйти за границы размеров холста.-решаем через if*/
    move() {
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;
        /* проверяем, что значения опустились ниже 0 в координатах или вышли за горизонтальные границы, и, если это так, заново инициализируем данные.*/
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
}

//--------------------PROVERKA----------------------------------
/*проверим работу класса Bubble: создадим несколько пузырьков, экземпляров класса и посмотрим, что они внутри себя хранят.В конструкторе они принимают на вход элемент, внутри него они должны размещаться, давайте получим его с помощью document.getElementById: */
//const canvas = document.getElementById("orb-canvas");
/*создадим массив bubbles, добавим туда пузырьки и выведем их содержимое: */
//const bubbles = [];
//bubbles.push(new Bubble(canvas));
//bubbles.push(new Bubble(canvas));
//bubbles.push(new Bubble(canvas));

//console.log(bubbles);/*видно, что у холста получились корректные размеры. Свойства alpha, color, size выбраны случайно, значения у них правильные. Значения свойств translateX, translateY также различаются и лежат внутри размеров холста.  */
//--------------KONEC PROVERKI-------------------------------------

class CanvasBackground {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
    }
  
    start() {
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }
    canvasSize() {
        /*ширину и высоту для холста мы выставили, умножив ее на значение devicePixelRatio. Это важно, чтобы потом графика на холсте не отображалась мутно на мониторах с более высоким разрешением */
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        //масштаб=devicePixelRatio для контекста this.ctx для оси х и оси у
        this.ctx.scale(this.dpr, this.dpr);
    }


    animate() {
        //1.очистить весь холст. Метод clearRect принимает на вход координаты левого верхнего угла прямоугольника (0,0) и ширину и высоту прямоугольника. В нашем случае эти величины должны равняться ширине и высоте холста (clientWidth и clientHeight).
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        //2.Вычислим новую позицию пузырька. Для кажд эл-та класса Bubble массива this.bubblesList (можно использовать метод forEach массива) нужно вызвать метод move (bubble.move()).После вызова метода move с помощью метода ctx.translate нужно изменить позицию пузырька на значение (bubble.translateX, bubble.translateY).
        this.bubblesList.forEach((bubble) => {
            bubble.move();
            this.ctx.translate(bubble.translateX, bubble.translateY);
            //начинаем отрисовку нового пути пузырька
            this.ctx.beginPath();
            //С помощью метода arc контекста (this.ctx) рисуем круг с центром 0,0 и радиусом bubble.size.
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            //задаем цвет пузырька. у контекста (this.ctx) свойство fillStyle.Цвет=цвету пузырька (bubble.color), alpha-значение = alpha у пузырька (bubble.alpha).
            this.ctx.fillStyle = "rgba(" + bubble.color + "," + bubble.alpha + ")";
            // красим круг нужным цветом
            this.ctx.fill();
            //настроим масштабирование(метод this.ctx.setTransform): горизонтальное и вертикальное масштабирование=this.dpr(Чтобы размер пузырька отрисовался согласно размерам холста, учитывающим devicePixelRatio)
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  
        });
        //запускаем анимацию: метод requestAnimationFrame. На вход нужно передать функцию animate с контекстом, привязанным к текущему классу (this.animate.bind(this))
        requestAnimationFrame(this.animate.bind(this));
        
     }
     //метод будет создавать массив пузырьков
     generateBubbles() {
        this.bubblesList = [];
        for (let i = 0; i < BUBBLE_DENSITY; i++) {
            this.bubblesList.push(new Bubble(this.canvas))
        }
    }
  }

const canvas = new CanvasBackground("orb-canvas");
canvas.start();