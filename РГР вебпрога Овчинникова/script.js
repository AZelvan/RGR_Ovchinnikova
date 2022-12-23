'use strict'
let picCounter = 1;

let exCounter;

let isSlideShowOn = false;

let slideShowId;

let currentScale = 70;

let currentWidth = 18;

const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Нижний Новгород',
                'Новосибирск', 'Самара', 'Сочи', 'Екатеринбург',
                'Грозный', 'Якутск', 'Челябинск', 'Омск',
                'Ростов-на-Дону', 'Уфа', 'Пермь', 'Красноярск',
                'Краснодар', 'Волгоград', 'Воронеж', 'Петропавловск-Камчатский', ];

const rightButton = document.querySelector('.right-button');

const leftButton = document.querySelector('.left-button');

const slideShowButton = document.querySelector('.slide-show');

const picture = document.querySelector('.active-pic');

const minis = document.querySelectorAll('.mini');

function decreasePicNum() {
  exCounter = picCounter;
  if (picCounter !== 1) {
    picCounter--;
  } else {
    picCounter = 20;
  }
  changePic();
  changeText();
  changeActiveMini();
}

function increasePicNum() {
  exCounter = picCounter;
  if (picCounter !== 20) {
    picCounter++;
  } else {
    picCounter = 1;
  }
  changePic();
  changeText();
  changeActiveMini();
}



function changePic() {
  picture.classList.add("dis"); //класс dis для срабатывания анимации появления, добавляем display:none
  picture.classList.remove('pic' + exCounter); // удаляем класс предыдущей картинки
  picture.classList.add('pic' + picCounter); //добавлем класс следующей картинки
  setTimeout(function() {
    picture.classList.remove("dis") //удаляем класс dis, возвращая при этиом display: block, включается fade
  }, 0);
}

function changeText() {
  document.querySelector('.counter').innerHTML = picCounter + '/20';//меняем счетчик картинок
  document.querySelector('h2').innerHTML = "Город " + cities[picCounter - 1];//меняем название города
}

function changeActiveMini() { // Перемещаем обводку миниатюры
  document.querySelector('.mini-container .pic' + picCounter).classList.add('mini__active');
  document.querySelector('.mini-container .pic' + exCounter).classList.remove('mini__active');
}


minis.forEach(function(item, i) { //меняем картинку через миниатюру
  item.addEventListener('click', function (e) {
    exCounter = picCounter;
    picCounter = i + 1;
    changePic();
    changeText();
    changeActiveMini();
  })
})


rightButton.onclick = increasePicNum;

leftButton.onclick = decreasePicNum;

slideShowButton.onclick = function() { //запуск и остановка слайдшоу
  if (isSlideShowOn) {
    isSlideShowOn = false;
    document.querySelector('.slide-show').classList.remove('slide-show__active');
    clearInterval(slideShowId);
  } else {
    isSlideShowOn = true;
    document.querySelector('.slide-show').classList.add('slide-show__active');
    slideShowId = setInterval(increasePicNum, 2000);
  }
}

document.querySelector('.scale-minus').onclick = function () {//уменьшение размера превью
  if (currentScale > 50) {
    currentScale -= 10;
    currentWidth -= 2;
    document.querySelector('.mini-container').style.width = currentScale + '%';
    document.querySelector('.mini-container').style.gridTemplateRows =  currentWidth + "vh " + currentWidth + "vh " + currentWidth + "vh " + currentWidth + "vh ";
  }
}

document.querySelector('.scale-plus').onclick = function () {//увеличение размера превью
  if (currentScale < 90) {
    currentScale += 10;
    currentWidth += 2;
    document.querySelector('.mini-container').style.width = currentScale + '%';
    document.querySelector('.mini-container').style.gridTemplateRows =  currentWidth + "vh " + currentWidth + "vh " + currentWidth + "vh " + currentWidth + "vh ";
  }
}
