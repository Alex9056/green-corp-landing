//анимация для числа счастливых клиентов (увеличение цифры от 0 до 5000)
//задание скорости анимации
const INCREASE_NUMBER_ANIMATION_SPEED = 50;
function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if(i===endNumber) {
            element.innerText = i + '+';
        }  else {
            element.innerText = i;
        }
        i+=100;
    }
    setTimeout(function() {
        increaseNumberAnimationStep(i,element,endNumber);}
        , INCREASE_NUMBER_ANIMATION_SPEED);
  }

//------------функция для запуска анимации числа счастливых клиентов
function initIncreaseNumberAnimation() {
 let element=document.querySelector('.features__clients-count');
 increaseNumberAnimationStep(0, element, 5000);
}
//изменяем запуск анимации счетчика счастливых клиентов не с открытия стр-цы, а при прокрутке к блоку с цифрами
//initIncreaseNumberAnimation(); удаляем
//получаем позицию элемента с цифрой счастл. клиентов (Свойство offsetTop возвращает расстояние от верхней части страницы до элемента.)
//let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
//получаем аналогичное значение для позиции скролла. Свойство window.scrollY возвращает позицию скролла, но проблема в том, что эта позиция скролла считается до верхнего угла окна. Нам нужен нижний край окна, поэтому к позиции скролла нужно прибавить высоту окна. т.е. текущая нижняя позиция окна
//let windowBottomPosition = window.scrollY + window.innerHeight;
//Добавляем в function updateScroll() 
//задание анимации для шапки сайта при скролле страницы
let animationInited = false;
function updateScroll() {
    if (window.scrollY > 0) {
        document.querySelector('header').classList.add('header__scrolled');
      } else {
        document.querySelector('header').classList.remove('header__scrolled');
      }
    
    // Запуск анимации увеличения числа (комментарии выше)
    let windowBottomPosition = window.scrollY + window.innerHeight;
    let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
    //при каждом новом скролле к блоку запускается анимация. Чтобы это не смотрелось странно, исправьте это так: анимация будет запускаться единожды. Для этого используем глобальную переменную:let animationInited = false;
    
    if ((windowBottomPosition >= countElementPosition) && !animationInited) {
        animationInited = true;
        initIncreaseNumberAnimation();
    }
}

window.addEventListener('scroll', updateScroll);



//-----------------Поле для ввода другого бюджета
//change, это специальное событие, которое вызывается при выборе новой опции в селекте. 
document.querySelector('#budget').addEventListener('change',function handleSelectChange(event) {
    //console.log(event);
    if (event.target.value === 'other') {
        // Должны добавить еще одно текстовое поле
        let formContainer = document.createElement('div');
        formContainer.classList.add('form__group');
        formContainer.classList.add('form__other-input');

        let input = document.createElement('input');
        input.placeholder = 'Введите ваш вариант';
        input.type = 'text';

        formContainer.appendChild(input);

        document.querySelector('#form form').insertBefore(formContainer, document.querySelector('.form__submit'));
      };

      let otherInput = document.querySelector('.form__other-input');

      //Условие: в селекте выбран вариант -НЕ Другое- И поле ля ввода текста есть на странице.
      if (event.target.value !== 'other'&& Boolean(otherInput)) {
        // Удаляем ранее добавленное текстовое поле, если оно есть в DOM
        document.querySelector('#form form').removeChild(otherInput);
      }
});

//-------плавный скролл для контактов и узнать подробнее

//функция-обработчик клика
function onLinkClick(event) {
    event.preventDefault();

    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
        behavior:'smooth'
    });
}

//функция для добавления тегу а обработчика
function addSmoothScroll(link) {
    link.addEventListener('click', onLinkClick)
}
//Для всех тегов а с атрибутом href c якорной ссылкой href='#...' (a[href^="#"]') добавляем плавный скролл через функцию addSmoothScroll,кот через forEach вызыв-ся для кажд а
document.querySelectorAll('a[href^="#"]').forEach(link => {
    addSmoothScroll(link);
  });
//плавный скролл для кнопки Узнать подробнее
  addSmoothScroll(document.querySelector('.more-button'));