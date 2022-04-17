///////////////////////////////////////
/* Общие функции */
///////////////////////////////////////
// Функция определения ширины экрана пользователя
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

// Работа с cookie файлами.
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Функция определения браузера
function userAgent(){
  var ua = detect.parse(navigator.userAgent);
  $('body').addClass(ua.browser.family);
}

// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000
function addSpaces(nStr){
  nStr = String(nStr)
	return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Предзагрузчик
function preload() {
  var preloader = $('.preloader');
  var spinner = preloader.find('.loading');
  spinner.fadeOut();
  preloader.delay(1000).fadeOut('slow');
	//console.log('preloaded')
}

// Наверх
function toTop() {
  $("#toTop").hide();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $('#toTop').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.text(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  //LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel
  //LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Показать пароль
function showPass() {
  $('.showPassBlock').on('click', function(event){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    ChangePasswordFieldType(this, $('.sites_client_pass'));
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
    return false;
  });
}

// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}


///////////////////////////////////////
/* Валидаторы */
///////////////////////////////////////
// Валидаторы для Имени
function validName(id){
  var name = $(id).find('.form__person');
  if(name.val() != ''){
    name.removeClass('error');
    name.parent().removeClass('error');
    name.attr('placeholder','Введите Имя');
    return true;
  }else{
    name.addClass('error');
    name.parent().addClass('error');
    name.attr('placeholder','Вы не ввели Имя');
    return false;
  }
}

// Валидаторы для телефона
function validPhone(id){
  var phone = $(id).find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(phone.val());
  if(check == true && check != ''){
    phone.removeClass('error');
    phone.parent().removeClass('error');
    phone.attr('placeholder','Введите номер');
    return true;
  }
  else{
    phone.addClass('error');
    phone.parent().addClass('error');
    phone.attr('placeholder','Вы не ввели номер');
    return false;
  }
}

// Валидаторы для почты
function validEmail(id){
  var email = $(id).find('.form__email');
  var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
  if(check == true && check != ''){
    email.removeClass('error');
    email.parent().removeClass('error');
    email.attr('placeholder','Введите Email');
    return true;
  }else{
    email.addClass('error');
    email.parent().addClass('error');
    email.val('');
    email.attr('placeholder','Вы ввели неверный Email');
    return false;
  }
}


///////////////////////////////////////
/* Аякс Отправка формы без обновления страницы */
///////////////////////////////////////
function ajaxForms(id,flag,successMessage,errorMessage){
  var flag = false;
  //console.log('ajaxForms loaded ', id)
  var form = $(id).find('.form__callback');
  form.on('submit',function(event){
    event.preventDefault();
    if(!flag){
      t = $(this);
      var url = t.prop('action');
      var formData = t.serializeArray();
      formData.push({name: 'ajax_q', value: 1});
      formData.push({name: 'only_body', value: 1});
      $.ajax({
        method: 'POST',
        cache: false,
        url: url,
        data: formData,
        success: function(d){
          var serverCall = JSON.parse(d).status;
          if(serverCall == "ok"){
						setTimeout(function () {
							$.fancybox.close();
						},1000);
            t.hide();
            t.find('.form__input').val(' ');
            t.parent().append('<div class="form__text">'+ errorMessage +'</div>');
						$(id).addClass('error')
            new Noty({
              text: '<div class="noty__addto"><div class="noty__message">' + successMessage + '</div></div>',
              layout:"bottomRight",
              type:"success",
              easing:"swing",
              animation: {
                open: 'animated fadeInUp',
                close: 'animated fadeOutDown',
                easing: 'swing',
                speed: 400
              },
              timeout:"4000",
              progressBar:true
            }).show();
            flag = true;
          }
        }
      });
    }else{
      function callBackError(type) {
        t.find('.form__input').val(' ');
        t.parent().find('.form__text').hide();
				$(id).addClass('error')
        new Noty({
          text: '<div class="noty__addto"><div class="noty__message">' + errorMessage + '</div></div>',
          layout:"bottomRight",
          type:"warning",
          easing:"swing",
          animation: {
            open: 'animated fadeInUp',
            close: 'animated fadeOutDown',
            easing: 'swing',
            speed: 400
          },
          timeout:"4000",
          progressBar:true
        }).show();
      }
      callBackError();
    }
  });

  // Валидация при клике
  form.on('submit',function(event){
    validName(form);
    validPhone(form);
    validEmail(form);
  });
}

// "Обратный звонок".
ajaxForms('#callback','callbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// "Обратный звонок" в модальном окне.
ajaxForms('#fancybox__callback','fancyCallbackFlag','Запрос обратного звонка успешно отправлен администрации магазина','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// "Обратная связь" в модальном окне.
ajaxForms('#fancybox__feedback','fancyFeedbackFlag','Запрос обратной связи успешно отправлен администрации магазина','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Обратная связь".
ajaxForms('.form__feedback','feedbackFlag','Спасибо за обращение! Мы свяжемся с вами в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Подписаться".
//ajaxForms('#subscribe','subscribeFlag','Спасибо за обращение! Вы подписались на наши уведомления','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Уведомить" в модальном окне.
ajaxForms('#fancybox__notify','notifyFlag','Вы будете уведомлены о поступлении товара','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Обратный звонок".
ajaxForms('.page-сallback','pageCallbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// "Обратный звонок".
ajaxForms('#feedback','fancyFeedbackFlag','Запрос обратной связи успешно отправлен администрации магазина','Вы уже отправляли запрос. Пожалуйста ожидайте.')


///////////////////////////////////////
/* Действия удаления из ... */
///////////////////////////////////////
// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из Избранного?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.count-favorites').attr('data-count');
    var goodsModId = e.attr('data-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.count-favorites').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__favorites .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.favorites').removeClass("has-items");
          $('.count-favorites').attr('data-count', '0').text('0');
        }
        var obj = $('.add-favorites[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}

// Удаление ВСЕХ товаров из Избранного без обновлении страницы
function removeFromFavoritesAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить Избранное?')){
    // Предзагрузчик анимации
    $('.addto__favorites').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.favorites').removeClass("has-items");
        $('.count-favorites').attr('data-count', '0').text("0");
        $('.addto__favorites .addto__item').remove();
        $('.addto__favorites .preloader').hide();
        $('.add-favorites').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.count-compare').attr('data-count');
    var goodsModId = e.attr('data-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.count-compare').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__compare .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.compare').removeClass("has-items");
          $('.count-compare').attr('data-count', '0').text('0');
        }
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить сравнение?')){
    // Предзагрузчик анимации
    $('.addto__compare').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.compare').removeClass("has-items");
        $('.count-compare').attr('data-count', '0').text("0");
        $('.addto__compare .addto__item').remove();
        $('.addto__compare .preloader').hide();
        $('.add-compare').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из корзины?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var qty = e.data('qty');
    var id = e.data('id');
    var oldCount = $('.count-cart').attr('data-count');
		$('.product__item[data-id="'+ id +'"]').removeClass('inCart')
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        var newCount = oldCount - qty;
        $('.count-cart').attr('data-count', newCount).text(newCount);
        $('.cartSumNow').html($(d).find('.cartSumNow').html());
        $('.cart__word').html($(d).find('.cart__word').html());
        var flag = 0;
        if(newCount != 0){
          $('.cart .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          })
        }else{
          $('.cart').removeClass("has-items");
          $('.count-cart').attr('data-count', '0').text("0");
          $('.cart .addto__item').remove();
        }
      }
    });
  }
}

// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
    // Предзагрузчик анимации
    $('.cart').prepend('<div class="preloader small"><div class="loading"></div></div>');
    e.parent().fadeOut().remove();
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.totalSum').html($(d).find('.totalSum').html());
        $('.cart').removeClass("has-items");
        $('.count-cart').attr('data-count', '0').text("0");
        $('.cart .addto__item').remove();
        $('.cart .preloader').hide();
				$('.product__item').each(function(){
					$(this).removeClass('inCart');
					$(this).find('.inCart__count').text('0');
				})
      }
    });
  }
}


///////////////////////////////////////
// Закрытие, Открытие элементов
///////////////////////////////////////
// Функция удаления классов всех активных элементов
function closeAll() {
	$('div, a, form, span, nav, ul').removeClass('opened');
	$('.overflowMenu').removeClass('active');
	$('.search__reset').click();
	$('#overlay').click();
	setTimeout(function () {
		$('#overlay').removeClass('transparent');
		$('.search__reset').click();
		$('.search__input').blur(); 
		$('#overlay').click();
	},100)
}

// Закрытие всего при нажатии на темную часть
$('#overlay').on('click', function(event){
	event.preventDefault();
	if($(this).hasClass('opened')){
		closeAll();
	}
});

// Открытие Контактов, Меню, Сравнения, Избранного
function openMenu() {
  // Открытие элементов
  $('.dropdown__open[data-open]').on('click', function(event){
    event.preventDefault();
    $('div, a, form').removeClass('opened');
    var value = $(this).data('open');
    if ($('.dropdown__content[data-content="'+ value +'"]').hasClass('opened')){
      $(this).removeClass('opened');
      $(this).parent().removeClass('opened');
      $('.sidebar__links').removeClass('opened');
      $('#overlay').removeClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').removeClass('opened').slideUp('slow');
			$('.dropdown__content[data-content="'+ value +'"]').slideUp('slow');
    }else{
      $(this).addClass('opened');
      $(this).parent().addClass('opened');
      $('.sidebar__links').addClass('opened');
      $('#overlay').addClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').addClass('opened').slideDown('slow');
			$('.dropdown__content[data-content="'+ value +'"]').slideDown('slow');
    }
  });

  // Открытие каталога с сохранением вложенности
  $('.catalog__open').on('click', function(event){
    event.preventDefault();
    var parent = $(this).closest('.parent');
    var sub = $(this).parent().next('.sub');
    var open = $(this).closest('.catalog__open');
    if (parent.hasClass('opened')) {
      sub.slideUp(600);
      parent.removeClass('opened');
      open.removeClass('opened');
    } else {
      sub.slideDown(600);
      parent.addClass('opened');
      open.addClass('opened');
    }
  });

  // Открытие Поиск
  $('.catalog__icon').on('click', function (event){
    event.preventDefault();
		$(this).toggleClass('opened');
		$('#overlay').toggleClass('opened transparent');
		if(getClientWidth() > 991){
			$(this).parent().toggleClass('opened');
			$('.mobmenu').removeClass('opened');			
			if($(this).hasClass('opened')){
				$('#menu').css({'z-index' : '11'})
			}else{
				$('#menu').css({'z-index' : '4'})
			}
		}else{
			$(this).parent().removeClass('opened');
			$('.mobmenu').addClass('opened');
		}
  });

	// Открытие Заказать звонок
  $('.feedback__title').on('click', function (event){
    event.preventDefault();
		$(this).toggleClass('opened');
		$(this).parent().toggleClass('opened');
		$(this).parent().find('.feedback__content').slideToggle('slow');
		$('#feedback').toggleClass('opened');
  });

	// Открытие поиска
	$('.search__icon').on('click', function(event){
		event.preventDefault();
		$(this).parent().toggleClass('opened')
		$('#overlay').toggleClass('opened');
	});

}

// Дополнительные пункты меню в шапке Перенос пунктов меню
function mainnav(id,rows,media){
	if(getClientWidth() > media){
		var mainnav = $(id);
		var overMenuExist = mainnav.find('.overflowMenu li').length;
		if(overMenuExist){
			mainnav.find('.overflowMenu li').removeClass('mainnav__replaced');
			mainnav.find('.mainnav__more').remove();
			mainnav.find('.overflowMenu li').each(function(){
				mainnav.find('.mainnav__list').append($(this));
			});
		}
		var menuHeight = rows;
		var menuWidth = mainnav.width() * menuHeight;
		var menuCount = mainnav.find('.mainnav__list li').length + 1;
		var nextCheck = 0;
		for(var i=1; i < menuCount;  i++){
			var currentWidth = parseInt(Math.ceil(mainnav.find('.mainnav__list li:nth-child('+i+')').width())) + 16;
			nextCheck += currentWidth;
			if(nextCheck > menuWidth){
				var a = i;
				for(a;a < menuCount;a++){
					mainnav.find('.mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
				}
				mainnav.find('.mainnav__replaced').each(function(){
					mainnav.find('.overflowMenu').append($(this));
				});
				mainnav.find('.mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="header__block-link"><span>Ещё...</span></a></li>');
				mainnav.find('.mainnav__more').on('click',function(){
					if($(this).hasClass('opened')){
						$(this).removeClass('opened');
						mainnav.removeClass('opened');
						mainnav.find('.overflowMenu').removeClass('opened');
						$('#overlay').removeClass('opened');
					} else{
						$(this).addClass('opened');
						mainnav.addClass('opened');
						mainnav.find('.overflowMenu').addClass('opened');
						$('#overlay').addClass('opened')
					}
					// Определение положения кнопки еще
					positionMore()
				});
				
				// Определение положения кнопки еще
				function positionMore(){
					var morePos = mainnav.find('.mainnav__more').position().left;
					var contentPos = parseInt(morePos) - 50;
					mainnav.find('.overflowMenu').css({'left' : contentPos})
				}

				return false;
			}
		}
	}
}

///////////////////////////////////////
// Функция + - для товара
///////////////////////////////////////
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty__plus').off('click').on('click', function(){
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty__minus').off('click').on('click', function(){
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal - 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
}


///////////////////////////////////////
// Уведомления
///////////////////////////////////////
function notyStart(text, type) {
  new Noty({
    text: text,
    layout: "bottomCenter",
    type: type,
    theme: "",
    textAlign: "center",
    animation: {
      open: 'animated fadeInUp',
      close: 'animated fadeOutDown',
      easing: 'swing',
      speed: 400
    },
    timeout: "2000",
    progressBar: true,
    closable: true,
    closeOnSelfClick: true,
    modal: false,
    dismissQueue: false,
    onClose: true,
    killer: false
  }).show();
}


///////////////////////////////////////
/* Скрипты для главной */
///////////////////////////////////////
// Отсчет даты до окончания акции
function counterDate() {
	// Устанавливаем дату обратного отсчета ММ-ДД-ГГ
	$('.product__counter').each(function(){		
		var t = $(this);
		var end = t.attr('end');
		var countDownDate = new Date(end).getTime();
		// Обновление счетчика каждую секунду
		var x = setInterval(function() {
			var now = new Date().getTime();
			var distance = countDownDate - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			// Вывод
			t.find('.days span').text(days);
			t.find('.hours span').text(hours);
			t.find('.minutes span').text(minutes);
			t.find('.seconds span').text(seconds);
			// Счетчик завершен
			if (distance < 0) {
				clearInterval(x);
				t.find('div span').text('0');
			}
		}, 1000);
	})
}


// Функция показать все для "Товары на главной"
function pdtSale(){
	var id = '#pdt__sale';
	var btn = $(id).find('.showAll');
	var item = $(id).find('.product__item');
	var buttons = $(id).find('.products__buttons');
	var max = $(id).find('.product__item:visible').length;
	// Скрываем кнопку показать все если меньше 5 товаров
	item.length > max ? buttons.show() : buttons.hide()
	// Функция открытия доп товаров
	btn.on('click', function (event){
		event.preventDefault();
		var t = $(this);
		var parents = t.parents().find(id);
		var btnText = t.find('span');
		if(t.hasClass('active')){
			t.removeClass('active')
			parents.removeClass('active')
			btnText.text('Показать все')
			parents.find('.product__item').removeClass('show')
			$('html, body').animate({scrollTop : parents.offset().top}, 600);
		}else{
			t.addClass('active')
			parents.addClass('active')
			btnText.text('Скрыть')
			parents.find('.product__item').addClass('show')
		}
	});
}

// Функция слайдера для "Новинки" на главной странице
function pdtSales(){
	var id = $('#pdt__sales');
	var carousel = id.find('.owl-carousel');
	var buttons = id.find('.owl-nav');
	var dots = id.find('.owl-dots');
	carousel.owlCarousel({
		items: 2,
		margin: 0,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: buttons,
		navText: [ , ],
		dots: false,
		dotsContainer: dots,
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:1, autoHeight: true},
			480:{items:1},
			640:{items:1},
			768:{items:1},
			992:{items:2},
			1200:{items:2}
		}
	});
}

// Функция слайдера для "Новинки" на главной странице
function pdtNew(){
	var id = $('#pdt__new');
	var carousel = id.find('.owl-carousel');
	var buttons = id.find('.owl-nav');
	var dots = id.find('.owl-dots');
	carousel.owlCarousel({
		items: 5,
		margin: 0,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: buttons,
		navText: [ , ],
		dots: false,
		dotsContainer: dots,
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:1, autoHeight: true},
			480:{items:2},
			640:{items:3},
			768:{items:3},
			992:{items:4},
			1200:{items:5}
		}
	});
}

// Функция для "Хиты продаж" на главной странице
function pdtBest(){
	var id = '#pdt__best';
	var btn = $(id).find('.showAll');
	var item = $(id).find('.product__item');
	var buttons = $(id).find('.products__buttons');
	var max = $(id).find('.product__item:visible').length;
	// Скрываем кнопку показать все если меньше 5 товаров
	item.length > max ? buttons.show() : buttons.hide()
	// Функция открытия доп товаров
	btn.on('click', function (event){
		event.preventDefault();
		var t = $(this);
		var parents = t.parents().find(id);
		var btnText = t.find('span');
		if(t.hasClass('active')){
			t.removeClass('active')
			parents.removeClass('active')
			btnText.text('Показать все')
			parents.find('.product__item').removeClass('show')
			$('html, body').animate({scrollTop : parents.offset().top}, 600);
		}else{
			t.addClass('active')
			parents.addClass('active')
			btnText.text('Скрыть')
			parents.find('.product__item').addClass('show')
		}
	});
}

// Слайдер для главной страницы
function slideShow() {
	// Слайдер на главной
	var owlS = $('#slideshow .owl-carousel');
	owlS.owlCarousel({
		items: 1,
		loop: true,
		rewind: true,
		lazyLoad: true,
		nav: false,
		navText: [ , ],
		navContainer: '',
		dots: true,
		dotsContainer: '',
		dotsData: false,
		dotsSpeed: 400,
		dotsEach: true,
		smartSpeed: 500,
		URLhashListener: true,
		autoplay: false,
    autoplayTimeout: '3000',
		autoplayHoverPause: true,
		autoHeight: false,
		autoHeightClass: 'owl-height',
		responsiveClass: true,
		responsiveRefreshRate: 100,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		animateOut: 'fadeOut',
    animateIn: 'fadeIn',
	});
}

// Новости
function newsCarousel() {
	var id = $('#news');
	var carousel = id.find('.owl-carousel');
	var buttons = id.find('.owl-nav');
	var dots = id.find('.owl-dots');
	// Функция слайдера для Новостей
	carousel.owlCarousel({
		items: 3,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
		navText: [ , ],
		dots: false,
		dotsContainer: dots,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:1, autoHeight: true},
			480:{items:2},
			640:{items:3},
			768:{items:3},
			992:{items:3},
			1200:{items:3}
		}
	});

	// Табы в товарах на главной
	$('#news .tabs__nav').on('click', function (event) {
		event.preventDefault();
		var id = $(this).attr('data-tab');
		$('#news .tabs__content').prepend('<div class="preloader"><div class="loading"></div></div>');
		preload();
		$('#news .tabs__nav').removeClass('active')
		$('#news .tabs__content').removeClass('active');
		$(this).addClass('active');
    $('#'+ id).addClass('active');
	});
}

// Функция слайдер для "Вы смотрели"
function viewed() {
	var id = $('.viewed');
	var carousel = id.find('.owl-carousel');
	var buttons = id.find('.owl-nav');
	var dots = id.find('.owl-dots');
	carousel.owlCarousel({
		items: 2,
		margin: 0,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: buttons,
		navText: [ , ],
		dots: true,
		dotsContainer: dots,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:2, autoHeight: true},
			480:{items:3},
			640:{items:4},
			768:{items:5},
			992:{items:2},
			1200:{items:2}
		}
	});
}


///////////////////////////////////////
/* Скрипты для товаров */
///////////////////////////////////////
// Функция выбора модификаций
function quickViewMod() {
	// Получение центральной разметки страницы (для быстрого просмотра)
	$(document).ready(function(){
		$.fn.getColumnContent = function() {
			var block = ($(this).length && $(this).hasClass('productViewBlock') ? $(this).filter('.productViewBlock') : $('.productViewBlock:eq(0)'));
			block.each(function(){
				// Удаляем все блоки, которые не отображаются в быстром просмотре.
				$(this).children().not('.productView').remove();
				// $(this).prepend(
				// 	'<div class="modal__title block__title">' +
				// 		'<div class="title">Выбор модификации</div>' +
				// 	'</div>'
				// );
			});
			block.removeClass('productViewQuick');
			block.addClass('productViewMod');
			block.find('.productView__image img').attr('src', block.find('.productView__image img').data('src'))
			return block;
		}
		// Быстрый просмотр товара
		// При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
		$('.product__item.has-mod').mouseover(function() {
			// Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
			var link = $(this).find('a.add-mod');
			if(link.length < 1) {
				return true;
			}
			// Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
			if(typeof(document.quickviewPreload) == 'undefined') {
				document.quickviewPreload = [];
			}
			var href = link.attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			// Если контент по данной ссылке ещё не загружен
			if(typeof(document.quickviewPreload[href]) == 'undefined') {
				// Ставим отметку о том, что мы начали загрузку страницы товара
				document.quickviewPreload[href] = 1;
				// Делаем запрос на загрузку страницы товара
				$.get(href, function(content) {
					// Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
					document.quickviewPreload[href] = $(content).getColumnContent();
				})
				// Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
				.fail(function() {
					delete document.quickviewPreload[href];
				});
			}
		});
		// Действие при нажатии на кнопку быстрого просмотра.
		$(document).on('click', 'a.add-mod', function() {
			var href = $(this).attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			quickViewShowMod(href);
			$(function(){
				var observer = lozad(); // lazy loads elements with default selector as '.lozad'
				observer.observe();
			});
			preload();
			return false;
		});
	});
}

// Быстрый просмотр модификаций
function quickViewShowMod(href, atempt) {
	// Если данные по быстрому просмотру уже подгружены
	if(typeof(document.quickviewPreload[href]) != 'undefined') {
		// Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
		if(1 == document.quickviewPreload[href]) {
			// Если попытки ещё не указывались, ставим 0 - первая попытка
			if(typeof(atempt) == 'undefined') {
				atempt = 0;
				// Иначе прибавляем счётчик попыток
			} else {
				atempt += 1;
				// Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
				if(atempt > 500) {
					delete document.quickviewPreload[href];
					// TODO сделать вывод красивой таблички
					alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
					return true;
				}
			}
			// Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится.
			setTimeout('quickViewShowMod("' + href + '", '+ atempt +')', 50);
			return true;
		} else {
			$.fancybox.close();
			// $.fancybox.open(document.quickviewPreload[href]);
			$.fancybox.open({
				src  : document.quickviewPreload[href],
				type : 'inline',
				transitionEffect: "slide",
			});
			addCart();
			addTo();
			goodsModification($('.fancybox-content.productViewBlock'));
			newModification($('.fancybox-content.productViewBlock'));
			quantity();
			prodQty($('.fancybox-content.productViewBlock'));
		}
	} else {
		$.get(href, function(content) {
			$.fancybox.close();
			//$.fancybox.open($(content).getColumnContent());
			$.fancybox.open({
				src  : $(content).getColumnContent(),
				type : 'inline',
				transitionEffect: "slide"
			});
			addCart();
			addTo();
			goodsModification($('.fancybox-content.productViewBlock'));
			newModification($('.fancybox-content.productViewBlock'));
			quantity();
			prodQty($('.fancybox-content.productViewBlock'));
		});
	}
}

// Разница в цене в процентах %
function priceDiff(obj,type) {
	$(obj).each(function(){
		var old = parseFloat($(this).find('.price__old .num').text().replace(' ',''));
		var now = parseFloat($(this).find('.price__now .num').text().replace(' ',''));
		var diff = 0;
		if(old > now){
			if (type == 'percent') {
				diffPercent = (((old - now)/old)*100).toFixed();
				$(this).find('.ico__sales').text('-' + diffPercent + '%');
			} else {
				diff = (old - now).toFixed();
				$(this).find('.ico__sales .num').text(addSpaces(diff));
			}
		}else{
			$(this).find('.ico__sales').hide();
		}
	});
}

// Много и Мало вместо точного количества
function goodsModRest() {
	$('.goodsModRestValue').each(function(){
		var value = $(this).data('value');
		if (value > 0 && value < 11) {
			$(this).text('В наличии мало');
			$(this).css('opacity', '1');
			$(this).parent().addClass('few');
		}else if (value > 10) {
			$(this).text('В наличии много');
			$(this).css('opacity', '1');
			$(this).parent().addClass('alot');
		}else if (value == 0) {
			$(this).text('Нет в наличии');
			$(this).css('opacity', '1');
			$(this).parent().addClass('zero');
		}
	});
}

// Добавление товара в корзину
function addCart() {
	$('.productView__form, .goodsListForm').off('submit').submit(function() {
		// Быстрый заказ
		if ($(this).attr('rel') === 'quick') {
			quickOrder(this);
			$('.cart').addClass("has-items");
			return (false);
		}
		// Добавляем активные классы и обновлем счетчик товаров
		$('.cart').addClass("has-items");
		$('.count-cart').animate({opacity: 0,display: "none"},500);
		$('.count-cart').animate({display: "inline",opacity: 1},500);
		// Находим форму, которую отправляем на сервер, для добавления товара в корзину
		var formBlock = $($(this).get(0));
		// Проверка на существование формы отправки запроса на добавление товара в корзину
		if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
			alert('Не удалось найти форму добавления товара в корзину');
			return false;
		}
		// Получаем данные формы, которые будем отправлять на сервер
		var formData = formBlock.serializeArray();
		var t = $(this);
		var id = t.find('input[name="form[goods_id]"]').val()
		// Сообщаем серверу, что мы пришли через ajax запрос
		formData.push({name: 'ajax_q', value: 1});
		// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
		//formData.push({name: 'fast_order', value: 1});
		// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
		$.ajax({
			type: "POST",
			cache: false,
			url: formBlock.attr('action'),
			data: formData,
			success: function(data) {
				// Анализ системного сообщения в коризне
				var str = $(data).html();
				// Проверяем текст сообщения на наличие ошибки
				if (str.indexOf("Не удалось") != -1) {
					// Сообщение с ошибкой
					if(typeof(Noty) == "function") {
						new Noty({
							text: str,
							layout:"bottomRight",
							type:"warning",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}
				} else {
					// Сообщение с успешным добавлением
					if(typeof(Noty) == "function") {
						new Noty({
							text: str,
							layout:"bottomRight",
							type:"success",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}

					// Добавляем активный класс если товар успешно добавился в корзину
					function inCart(obj){
						obj.addClass("inCart");
						var count = obj.find('.inCart__count');
						var newCount = parseInt(count.text()) + 1;
						count.text(newCount)
					}
					// Запуск функции для выбранного товара
					inCart(t);

					// Запуск функции активного класса товара в других категориях
					$('.product__item[data-id="' + id + '"]').each(function(){
						inCart($(this))
						$(this).addClass('inCart');
					});

					// Анимация добавления товара в корзину
					function animateCart(){
						var img = t.find('img');
						var w = img.width();
						var bascket = $(".cart__icon");

						if(!img.length){
							img = t.parents().find('.productView__image img');
							w = 200;
						}

						img.clone()
								.css({
									'width' : w,
									'position' : 'absolute',
									'z-index' : '9999',
									'display' : 'block',
									bottom: img.offset().top,
									left: img.offset().left
								})
								.appendTo("body")
								.animate({
									opacity: 0.1,
									left: bascket.offset()['left'],
									top: bascket.offset()['top'],
									width: 20
								}, 1000, function() {	
									$(this).remove();
								});
					}

					// Запуск Анимации
					animateCart();

					// Открытие/Закрытие корзины при добавлении
					$('.cart.dropdown').addClass('opened');
					setTimeout(function () {
						$('.cart.dropdown').removeClass('opened')
						$.fancybox.close();
					}, 2000);

				}
				// Скрытое обновление корзины
				$('.hiddenUpdate').html(data);

				// Пересчитываем сумму экономии в корзине
				sumSave();
			}
		});
		return false;
	});
}

// Добавление в сравнение и Сохраненное
function addTo() {
// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-compare').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		var
				a = $(this)
				isAdd = a.attr('data-action-is-add'),
				addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				pageUrl = a.attr('data-action-url'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				aText = a.parent().find('.add-compare'),
				addTooltip = a.attr('data-add-tooltip'),
				delTooltip = a.attr('data-del-tooltip'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;

		$('.addto__compare .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						if($('.addto__compare').length){
							$('.addto__compare .addto__items').prepend('' +
								'<div class="addto__item flex" data-id="'+ pDataid +'">' +
									'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image flex-center"><img src="'+ pImg +'" /></a>' +
									'<div class="addto__content flex">' +
										'<div class="addto__info">' +
											'<a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
											'<div class="addto__price  '+ pDataChar +'">' +
												'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
											'</div>' +
										'</div>' +
										'<div class="addto__actions flex">' +
											'<a href="'+ delUrl +'?id='+ pDataMod +'" data-id="'+ pDataMod +'" class="addto__remove remove flex-center" title="Убрать товар из списка сравнения" onclick="removeFromCompare($(this))"><i class="icon-close"></i></a>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'');
						}
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
							var textLabel = 'Добавлено в сравнение'
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
							var textLabel = 'Удалено из сравнения'
						}

						

						// tippy('.add-compare', {
						// 	content: 'asdasd',
						// });

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.compare_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.count-compare');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.compare_goods_count);
								$('.count-compare').attr('data-count', data.compare_goods_count);
								if(data.compare_goods_count > 0){
									$('.compare').addClass("has-items");
								}else{
									$('.compare').removeClass("has-items");
									$('.count-compare').attr('data-count', '0').text("0");
									$('.add-compare').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
							.attr('title', newTitle)
							.attr('data-tooltip', newTooltip)
							.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-del-tooltip' : 'data-add-tooltip'));
						//}

						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated noty_effects_open',
									close: 'animated noty_effects_close',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated noty_effects_open',
									close: 'animated noty_effects_close',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});

  // Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-favorites').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		var
				a = $(this)
				isAdd = a.attr('data-action-is-add'),
				addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				pageUrl = a.attr('data-action-url'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				aText = a.parent().find('.add-compare'),
				addTooltip = a.attr('data-add-tooltip'),
				delTooltip = a.attr('data-del-tooltip'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;

		$('.addto__favorites .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__favorites .addto__items').prepend('' +
              '<div class="addto__item flex" data-id="'+ pDataid +'">' +
								'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image flex-center"><img src="'+ pImg +'" /></a>' +
								'<div class="addto__content flex">' +
									'<div class="addto__info">' +
										'<a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
										'<div class="addto__price  '+ pDataChar +'">' +
											'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
										'</div>' +
									'</div>' +
									'<div class="addto__actions flex">' +
              			'<a href="'+ delUrl +'?id='+ pDataMod +'" data-id="'+ pDataMod +'" class="addto__remove remove flex-center" title="Убрать товар из списка избранного" onclick="removeFromFavorites($(this))"><i class="icon-close"></i></a>' +
              		'</div>' +
              	'</div>' +
              '</div>' +
						'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
							var textLabel = 'Добавлено в избранное'
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
							var textLabel = 'Удалено из избранного'
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.favorites_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.count-favorites');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.favorites_goods_count);
								$('.count-favorites').attr('data-count', data.favorites_goods_count);
								if(data.favorites_goods_count > 0){
									$('.favorites').addClass("has-items");
								}else{
									$('.favorites').removeClass("has-items");
									$('.count-favorites').attr('data-count', '0').text("0");
									$('.add-favorites').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
							.attr('title', newTitle)
							.attr('data-tooltip', newTooltip)
							.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-del-tooltip' : 'data-add-tooltip'));
						//}

						// Блок Сообщения Успешно
						var textContainer = '<div class="noty__addto flex"><div class="noty__content"><a class="noty__title flex" href="'+ pageUrl +'"><i class="icon-favorites"></i><span>'+ textLabel +'</span></a><a class="noty__message" href="'+ pUrl +'">'+ pName +'</a><div class="noty__price price__now '+ pDataChar +'"><span class="num">' + addSpaces(pDataPrice) + '</span></div></div><div class="noty__image flex-center"><img src="'+ pImg +'" /></div></div>';
						
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated noty_effects_open',
									close: 'animated noty_effects_close',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Блок Сообщения Ошибка
						var textContainer = '<div class="noty__addto"><a class="noty__title flex-center" href="'+ pageUrl +'"><span>Не удалось</span></a><div class="noty__message"><span>Для добавления товара в избранное Вам необходимо </span><a class="noty__link" href="/user/login">войти в личный кабинет или зарегистрироваться</a></div></div></div>';

						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto full"><div class="noty__title">Войдите в свой аккаунт</div><div class="noty__message">'+ data.message + '</div><div class="noty__buttons"><a class="button href="/user/login" title="Войти"><span>Войти</span></a></div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated noty_effects_open',
									close: 'animated noty_effects_close',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});
}


///////////////////////////////////////
/* Скрипты для оформления заказов */
///////////////////////////////////////
// Быстрый заказ
function quickOrder(formSelector) {
	// Находим форму, которую отправляем на сервер, для добавления товара в корзину
	var formBlock = $($(formSelector).get(0));
	// Проверка на существование формы отправки запроса на добавление товара в корзину
	if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
		alert('Не удалось найти форму добавления товара в корзину');
		return false;
	}
	// Получаем данные формы, которые будем отправлять на сервер
	var formData = formBlock.serializeArray();
	// Сообщаем серверу, что мы пришли через ajax запрос
	formData.push({name: 'ajax_q', value: 1});
	// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
	formData.push({name: 'fast_order', value: 1});
	// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
	$.ajax({
		type    : "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox.open(data, {
				keyboard: false,
				baseClass: "fastOrder",
				afterShow: function(){
          showPass();
          orderScripts();
          orderScriptsSelect();
          coupons();
          preload();
          $('.fastOrder__form').validate({
            errorPlacement: function(error, element) { }
          });
				}
			})

		}
	});
	return false;
}

// Регистрация и выбор доставки
function orderScripts() {
	// маска телефона
	$("#sites_client_phone").mask("+7 (999) 999-9999");
	// Выбор даты доставки. Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
	$("#deliveryConvenientDate").datepicker({
		// Если true, то при активации даты, календарь закроется.
		autoClose: true,
		// Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
		minDate: new Date()
	});
	// При оформлении заказа дадим возможность зарегистрироваться пользователю
	$('#form__registration').click(function(){
		if($(this).prop("checked")) {
			$('.form__pass').show();
			$('#sites_client_email').addClass('required');
			$('#sites_client_email').attr("required", true);
			$(this).parent().addClass('active');
			$(this).attr("checked", true);
			$('.form__fields.email label').addClass('required');
		} else {
			$('.form__pass').hide();
			$('#sites_client_email').removeClass('required');
			$('#sites_client_email').attr("required", false);
			$(this).parent().removeClass('active');
			$(this).attr("checked", false);
			$('.form__fields.email label').removeClass('required');
		}
	});
	// Отображение вариантов оплаты
	var ID = $('input[name="form[delivery][id]"]:checked').val();
	$('.order__payment').hide();
	$('.order__payment[rel="' + ID + '"]').show();
	$('.order__payment[rel="' + ID + '"]').find('input:first').click();
	// Действия при выборе варианта доставки на этапе оформления заказа
	$('.delivery__radio').click(function(d){
		// Отображение вариантов оплаты при выборе доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().removeClass('active');
		});
		$('.zone__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().removeClass('active');
		});
		var val = $(this).val();
		var fz = $($('.zone__radio[deliveryid='+val+']')[0]);
		$(this).prop('checked',true);
		fz.prop('checked',true);
		$(this).parent().addClass('active');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Обновление цены при наличии зоны
		var cartSumTotal = $('.cartSumTotal').data('value');
		var zonePrice =  $('.zone__radio:checked').attr('price');
		if(zonePrice > 0){
			priceBlock.text(addSpaces(zonePrice));
			$('.cartSumDelivery .num').text(addSpaces(zonePrice));
		}else{
			priceBlock.text(price);
			$('.cartSumDelivery .num').text(addSpaces(price));
		}
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumDiscount:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(addSpaces(newSum));
		// Скрытие необязательных полей при выборе самовывоза
		if($(this).data('name') == 'Самовывоз'){
			$('.fastOrder__form').addClass('pickup');
			$('.address input, .address textarea').val('Самовывоз');
			$('#deliveryConvenientDate').val('01.01.2220');
			$(".total__buttons button").removeClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
		}else{
			$('.fastOrder__form').removeClass('pickup');
			$('.address input, .address textarea').val('');
			$('#deliveryConvenientDate').val('');
		}
	});
	// Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
	$('.zone__radio').click(function(){
		var val = $(this).attr('deliveryid');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Обновление цены
		priceBlock.text(addSpaces(price));
		//
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			if($(this).val() == val){
				$(this).prop('checked',true);
			}else{
				$(this).prop('checked',false);
			}
		});
		// Выбор варианта оплаты при выборе зоны доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumTotalHide:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(addSpaces(newSum));
		$('.cartSumDelivery .num').text(addSpaces(price));
	});
}

// Выбор доставки и оплаты
function orderScriptsSelect() {
	// Выбор доставки
	$('.delivery__select select').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(addSpaces(startprice));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html()
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.delivery__desc').html()
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Обновление цены и описания при выборе доставки
	$('.delivery__select select').each(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(addSpaces(startprice));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html();
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').each(function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(addSpaces(WithZone));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').on('change', function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(addSpaces(WithZone));
		$('.cartSumDelivery .num').text(addSpaces(WithZone));
	});

	// Выбор оплаты
	$('.paymentSelect').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('value');
		$('.hiddenRadio .paymentRadio[value="'+selectedDelId+'"]').click();
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор оплаты
	$('.payment__option input').on('click', function (){
		var t = $(this).parent()
		$('.payment__option').removeClass('active')
		t.addClass('active')
	});
	// Проверяем выбранную оплату
	$('.payment__option input').each(function (){
		var t = $(this).parent()
		if($(this).attr('checked')){
			t.addClass('active')
		}
	});
}

// Отправка купона при оформлении заказа
function coupons() {
	var submitBtn = $('.coupon__button');
	var couponInput = $('.coupon__code');
	var resetBtn = $('.coupon__reset');
	submitBtn.on('click', function(){
		var url = '/order/stage/confirm';
		var val = couponInput.val();
		// Получаем данные формы, которые будем отправлять на сервер
		var formData = $('#myform').serializeArray();
		formData.push({name: 'ajax_q', value: 1});
		formData.push({name: 'only_body', value: 1});
		formData.push({name: 'form[coupon_code]', value: val});
		$.ajax({
			type: "POST",
			cache: false,
			url: url,
			data: formData,
			success: function(data) {
				var cartSumTotal = $('.cartSumTotal:eq(0) .num').text().toString().replace(/\s/g, '')
				// Получаем блок скидки
				var discountBlock = $(data).closest('#myform').find('.discount');
				var discountName = discountBlock.find('.name').text();
				var discountPrice = discountBlock.find('.percent .num').text();
				var discountPercent = discountBlock.find('.percent').text();
				if (discountPrice.length) {
					discountPrice = discountPrice
				}else{
					discountPrice = discountPercent
				}
				// Получаем новую итоговую стоимость заказа
				var totalBlock = $(data).closest('#myform').find('.total');
				var totalSum = totalBlock.find('.total-sum').data('total-sum');
				var deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text());
				var newTotalSum = totalSum + deliveryPrice;
				// Записываем название и размер скидки по купону
				$('.total__coupons .total__label span').html(discountName);
				$('.total__coupons .cartSumCoupons').html(discountPrice);
				$('.cartSumCouponsDiscount').html(discountPrice);
				$('.total__discount').hide();
				$('.total__coupons').show();
				if (newTotalSum > cartSumTotal) {
					couponInput.parent().addClass('error');
					couponInput.parent().removeClass('active');
					couponInput.val("").attr("placeholder", "Купон неверен");
					$('.total__coupons').hide();
					$('.total__discount').show();
					$('.cartSumTotal .num').text(addSpaces(newTotalSum));
					$('.cartSumCouponsDiscount').html('0 руб.');
				} else if (newTotalSum == cartSumTotal) {
					couponInput.parent().removeClass('error');
					couponInput.parent().addClass('active');
				} else {
					couponInput.parent().removeClass('error');
					couponInput.parent().addClass('active');
					$('.total__coupons').show();
					// Обновляем значение итоговой стоимости
					$('.cartSumTotal .num').text(addSpaces(newTotalSum));
					$('.cartSumTotal').attr('data-value', newTotalSum);
					$('.cartSumCoupons').attr('data-value', newTotalSum);
					$('.cartSumTotalHide').attr('data-value', newTotalSum);
					$('.cartSumTotalHide .num').text(addSpaces(newTotalSum));
					$('.cartSumDiscount .num').text(addSpaces(totalSum));
				}
			},
			error: function(data){
				console.log("Возникла ошибка: Невозможно отправить форму купона.");
			}
		});
	});
	// Сброс
	resetBtn.on('click', function(){
		$('.coupon__code').val('').trigger('input');
		$('.fake__input').val('').trigger('input');
		setTimeout(function(){
			$('.total__coupons').hide();
			$('.total__discount').show();
			var cartSum = $('.cartSumDiscount').data('value');
			var deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text());
			var newTotalSum = cartSum + deliveryPrice;
			$('.cartSumTotal .num').text(addSpaces(newTotalSum));
			$('.cartSumTotal').attr('data-value', newTotalSum);
			$('.cartSumCoupons').attr('data-value', newTotalSum);
			$('.cartSumTotalHide').attr('data-value', newTotalSum);
			$('.cartSumTotalHide .num').text(addSpaces(newTotalSum));
			$('.cartSumCouponsDiscount').html('0 руб.');
			couponInput.parent().removeClass('error');
			couponInput.parent().removeClass('active');
			couponInput.val("").attr("placeholder", "Введите купон");
		}, 500);
	});
	// Отображение кнопки Сброс
	couponInput.on('input',function(){
		if($(this).val()) {
			$(this).parent().find('.coupon__reset').addClass('active')
		} else {
			$(this).parent().find('.coupon__reset').removeClass('active')
		}
	});
	// Фальшивая кнопка купона
	$('.fake__button').on('click', function(event){
		event.preventDefault();
		var fakeValue = $('.fake__input').val();		
		couponInput.val(fakeValue);
		submitBtn.click();
	});
	// Отображение фальшивой кнопки Сброс
	$('.fake__input').on('input',function(){
		if($(this).val()) {
			resetBtn.addClass('active')
		} else {
			resetBtn.removeClass('active')
		}
	});
}


///////////////////////////////////////
/* Скрипты для Товары, Категории */
///////////////////////////////////////
function catalog() {
	// Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
	$('.filter__item input').on('click', function(){
		$(this)[0].form.submit();
	});

	// $('.filtersActive input').on('click', function(){
	// 	$(this)[0].form.submit();
	// });

	// Открытие сортировки и показать по
  $('.select label').on('click',function(){
		if(!$(this).parent().hasClass('opened')){
			$(this).parent().addClass('opened');
		}
  });
  // Закрытие сортировки и показать по
  $(document).mouseup(function (e){
    var selectDown = $(".select .select__items");
    if (!selectDown.is(e.target)) {
      selectDown.parent().removeClass('opened');
      setTimeout(function(){
        selectDown.parent().addClass('clicked');
      }, 1);
    }
  });
  // Обновление названия сортировки
  var selectText = $('.select .select__items a.active span').text();
  var lengthText = selectText.length;
  if (lengthText == '0' ){
    selectText = 'Название сортировки';
  }
  $('.toolbar .sort-by.select .select__value span').text(selectText);

	// Боковое меню сохранение открытой вложенности
	// $('.collapsible:not(".active")').find('.collapsible__content').css('display', 'none');
	// $('.collapsible.active').find('.collapsible__content').css('display', 'block');
	$('.collapsible__click').on('click', function(event){
		event.preventDefault();
		if ($(this).closest('.collapsible').hasClass('active')) {
			$(this).parent().find('.collapsible__content').slideDown(600);
			$(this).closest('.collapsible').removeClass('active');
		} else {
			$(this).parent().find('.collapsible__content').slideUp(600);
			$(this).closest('.collapsible').addClass('active');
		}
	});

	// Сборосить категорию фильтра
	$('.filter__clear').on('click', function(event){
		event.preventDefault();
		var parent = $(this).closest('.filter__list');
		var checkboxes = parent.find('[type="checkbox"]')
		checkboxes.prop('checked', false).attr('checked', false);
		$('.form__filters')[0].submit();
	});

	function prodPromo() {
		var id = $('.products__promo');
		var carousel = id.find('.owl-carousel');
		var buttons = id.find('.owl-nav');
		var dots = id.find('.owl-dots');
		carousel.owlCarousel({
			items: 3,
			margin: 20,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: buttons,
			navText: [ , ],
			dots: true,
			dotsContainer: dots,
			autoHeight: true,
			autoHeightClass: 'owl-height',
			autoplay: false,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1, autoHeight: true},
				320:{items:1, autoHeight: true},
				480:{items:1},
				640:{items:2},
				768:{items:2},
				992:{items:2},
				1200:{items:3}
			}
		});
	}
	// Запуск
	prodPromo()

}

// Фильтр по ценам
function priceFilter() {
	var
			priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text()),  // Минимальное значение цены для фильтра
			priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text()),  // Максимальное значение цены для фильтра
			priceSliderBlock = $('#goods-filter-price-slider'), // Максимальное значение цены для фильтра
			priceInputMin = $("#goods-filter-min-price"), // Поле ввода текущего значения цены "От"
			priceInputMax = $("#goods-filter-max-price"), // Поле ввода текущего значения цены "До"
			priceSubmitButtonBlock = $(".goodsFilterPriceSubmit");  // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.

	// Изменяет размер ячеек с ценой, т.к. у них нет рамок, есть смысл менять размеры полей ввода, чтобы они выглядили как текст
	function priceInputsChangeWidthByChars() {
		// Если есть блок указания минимальной цены
		if(priceInputMin.length) {
			priceInputMin.css('width', (priceInputMin.val().length*8 + 32) + 'px');
			priceInputMax.css('width', (priceInputMax.val().length*8 + 32) + 'px');
		}
	}

	// Слайдер, который используется для удобства выбора цены
	priceSliderBlock.slider({
		range: true,
		min: priceFilterMinAvailable,
		max: priceFilterMaxAvailable,
		values: [
			parseInt($('#goods-filter-min-price').val())
			,parseInt($('#goods-filter-max-price').val())
		],
		slide: function( event, ui ) {
			priceInputMin.val( ui.values[ 0 ] );
			priceInputMax.val( ui.values[ 1 ] );
			priceSubmitButtonBlock.css('display', 'flex');
			priceInputsChangeWidthByChars();
		}
	});
	// При изменении минимального значения цены
	priceInputMin.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal < priceFilterMinAvailable) {
			newVal = priceFilterMinAvailable;
		}
		priceSliderBlock.slider("values", 0, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceInputsChangeWidthByChars();
	});
	// При изменении максимального значения цены
	priceInputMax.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal > priceFilterMaxAvailable) {
			newVal = priceFilterMaxAvailable;
		}
		priceSliderBlock.slider("values", 1, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceInputsChangeWidthByChars();
	});
	// Обновить размеры полей ввода диапазона цен
	priceInputsChangeWidthByChars();

	// Активный фильтр цены
	if (priceInputMin.val() > priceFilterMinAvailable || priceInputMax.val() < priceFilterMaxAvailable) {
		$('.filters-price').addClass('has-filters');
		$('.toolbar').addClass('has-filters');
		$('#filters').addClass('has-filters');
	}else{
		$('.filters-price').removeClass('has-filters');
		$('.toolbar').removeClass('has-filters');
		$('#filters').removeClass('has-filters');
	}
	
	// Фильтры открыть
	$('.filters__icon').on('click', function (event) {
		event.preventDefault();
		$(this).toggleClass('opened');
		$('#filters').toggleClass('opened');
		$('#overlay').toggleClass('opened transparent');
	});

	// Фильтры поиск
	$('.filter__search').on('input', function () {
		var $items = $(this).next('.filter__items').children()
		var $checkboxes = $items.find('label');
		var itemsArray = $checkboxes.map(function () {return $(this).data('name').toLowerCase()}).toArray();
		var str = $(this).val();

		var resultArray = itemsArray.map((item, i) => item.indexOf(str) >= 0 ? i : -1).filter(item => item >= 0);
		$items.hide().filter(function () {        
			return resultArray.some(el => el === $(this).index())
		}).show();
	})
	
	$('.filter__list').each(function(){
		var item = $(this).find('.filter__item').length;
		var search = $(this).find('.filter__search');
		item < 4 ? search.hide() : search.show()
	});

}



///////////////////////////////////////
/* Скрипты для Товар */
///////////////////////////////////////
// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
	if(cnt>13) { return false; }
	$(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
	num = (num==6)?0:num;
	setTimeout(function () {
		RefreshImageAction(img, num+1, cnt+1)
	}, 50);
}

// Товар. Карточка товара
function pageGoods() {
	// Слайдер доп. изображений
	$('.thumblist .owl-carousel').owlCarousel({
		items: 4,
		margin: 16,
		loop: false,
		rewind: true,
		lazyLoad: true,
		dots: false,
		nav: false,
		navText: [ , ],
		autoplay: false,
		autoplayHoverPause: true,
		autoHeight: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:3},
			375:{items:3},
			480:{items:4},
			641:{items:5},
			768:{items:6},
			992:{items:4},
			1200:{items:4}
		}
	});

	// Функция Сопутствующие товары Слайдер
	function relatedViews(){
		var id = $('#related-views');
		var carousel = id.find('.owl-carousel');
		var buttons = id.find('.owl-nav');
		var dots = id.find('.owl-dots');
		carousel.owlCarousel({
			items: 5,
			margin: 0,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: buttons,
			navText: [ , ],
			dots: false,
			dotsContainer: dots,
			autoHeight: false,
			autoHeightClass: 'owl-height',
			autoplay: false,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1, autoHeight: true},
				320:{items:1, autoHeight: true},
				480:{items:2},
				640:{items:3},
				768:{items:3},
				992:{items:4},
				1200:{items:5}
			}
		});
	}
	relatedViews();

	// Функция Сопутствующие товары Слайдер
	function relatedGoods(){
		var id = $('#related-goods');
		var carousel = id.find('.owl-carousel');
		var buttons = id.find('.owl-nav');
		var dots = id.find('.owl-dots');
		carousel.owlCarousel({
			items: 5,
			margin: 0,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: buttons,
			navText: [ , ],
			dots: false,
			dotsContainer: dots,
			autoHeight: false,
			autoHeightClass: 'owl-height',
			autoplay: false,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1, autoHeight: true},
				320:{items:1, autoHeight: true},
				480:{items:2},
				640:{items:3},
				768:{items:3},
				992:{items:4},
				1200:{items:5}
			}
		});
	}
	// Сопутствующие товары Запуск Слайдера
	relatedGoods();

	// Функция показать больше для Отзывов
	var opinionContent = $('.opinion__content');
	var opinionCount = opinionContent.find('.opinion__item').length;
	var opinionVisible = opinionContent.find('.opinion__item:visible').length;
	if(opinionCount<=opinionVisible){ opinionContent.find('.opinion__buttons').hide(); }
	opinionContent.find('.opinion__buttons .showAll').on('click',function(event){
		event.preventDefault();
		if($(this).hasClass('active')){
			$(this).removeClass('active').find('span').text("Показать все");
			opinionContent.find('.opinion__item').removeClass('show');
			$('html, body').animate({scrollTop : jQuery('.productView__opinion').offset().top - 60}, 600);
		}else{
			$(this).addClass('active').find('span').text("Скрыть все");
			opinionContent.find('.opinion__item').addClass('show');
		}
	});

	// Переключение для Положительный и Отрицательный отзыв
	$('.generally label').on('click', function(event){
		event.preventDefault();
		$('.generally label').removeClass('active');
		$('.generally input').attr('checked', false);
		$(this).addClass('active');
		$(this).next('input').attr('checked', true);
	});
	
	// Переключение для Положительный и Отрицательный отзыв
	$('.opinion__nav a').on('click', function(){
    if($(this).hasClass('goodOpinions')){
      $('.good').removeClass('hide');
      $('.bad').removeClass('show');
      $('.good').addClass('show');
      $('.bad').addClass('hide');
			$('.opinion__buttons').hide();
			$('.opinion__nav a').removeClass('active')
			$(this).addClass('active')
    } else if($(this).hasClass('badOpinions')){
      $('.good').removeClass('show');
      $('.bad').removeClass('hide');
      $('.good').addClass('hide');
      $('.bad').addClass('show');
			$('.opinion__buttons').hide();
			$('.opinion__nav a').removeClass('active')
			$(this).addClass('active')
    } else {
      $('.good, .bad').removeClass('show');
      $('.good, .bad').removeClass('hide');
			$('.opinion__buttons').show();
			$('.opinion__nav a').removeClass('active')
			$(this).addClass('active')
    }
  });

	// Добавление отзыва о товаре. Рейтинг
	if($('.goodsOpinionRating').length){
		$('.goodsOpinionRating').rating();
	}

	// Ссылка на отображение формы для добавление отзыва о товаре
	$('.opinion__add').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			// $(this).removeClass('active');
			$('.opinion__addForm').slideUp(600);
		}else{
			// $(this).addClass('active');
			$('.opinion__addForm').slideDown(600);
			$('html, body').animate({scrollTop : jQuery('.opinion__addForm').offset().top}, 500);
		}
	});

	// Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
	$(".opinion__form button").on('click', function(){
		var form = $(".opinion__form");
		form.validate({
			errorPlacement: function(error, element) { }
		});
		form.submit();
		return false;
	});

	// Иконка для обновления изображение капчи
	$('.captcha__refresh').on('click', function(){
		RefreshImageAction(this,1,1);
		$('.captcha__image').attr('src',$('.captcha__image').attr('src')+'&rand'+Math.random(0,10000));
		return false;
	});
	// Имитация клика для капчи
	$('.captcha__refresh').click();

	// Открытие зон доставки
	$('.zone__open').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.zone__list').slideUp(600);
		}else{
			$(this).addClass('active');
			$('.zone__list').slideDown(600);
		}
	});

	// Свернуть и Развернуть дополнительное описание
	$('.opinion__more').on('click', function(event) {
		event.preventDefault();
		// Старый текст ссылки
		var txtOld = $(this).text();
		// Новый текст ссылки
		var txtNew = $(this).attr('rel');
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('mask').removeClass('active');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}else{
			$(this).addClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('active').removeClass('mask');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}
	});

	// Свернуть и Развернуть отображение кнопок
	$('.opinion__text.comment').each(function (){
		var contentHeight = $(this).height();
		if(contentHeight >= 90){
			$(this).parent().find('.opinion__more').show();
			$(this).parent().find('.opinion__text.comment').addClass('mask');
		}else{
			$(this).parent().find('.opinion__more').hide();
			$(this).parent().find('.opinion__text.comment').removeClass('mask');
		}
	});

	// Показать все доп изображения
	function thumbs(){
		var thumbCount = $('.thumblist__item').length
		var thumbVisible = $('.thumblist__item:visible').length
		var thumbButtons = $('.thumblist__buttons')
		if(thumbCount > thumbVisible){
			thumbButtons.show();
			thumbButtons.find('a').on('click', function(event){
				event.preventDefault();
				$(this).toggleClass('active')
				$(this).parents().find('.thumblist__item').toggleClass('show')
				$(this).parents().find('.thumblist__items').toggleClass('justify-start')
			})
		}
		
	}
	thumbs();

}

// Инициализация табов на странице товара
function initTabs() {
	// Блок в котором находятся табы
	var tabs = $('.productView__tabs');
	if(!tabs.length) {
		return false;
	}
	// Добавляем аткивные классы на первый элемент
	tabs.find('[data-tab]').first().addClass('active');
	tabs.find('[data-tab-content]').first().addClass('active');
	// Проверяет хэш и если по нему была открыта вкладка, то эта функция автоматически откроет её.
	checkTabHash();
	// Если используется хеш, то скролим до контента
	if(document.location.hash !== '') {
		$('html, body').animate({scrollTop : jQuery('.tabs__content').offset().top - 68}, 600);
	}
	// Биндим изменение хэша - проверка какой таб нужно открыть.
	$(window).bind('hashchange', function() { checkTabHash(); });
}

// Переключение табов
function tabSwitch(nb) {
	var tabs = $('.productView__tabs');
	var tab = tabs.find('[data-tab="'+ nb +'"]');
	var content = tabs.find('[data-tab-content="'+ nb +'"]');
	tabs.find('[data-tab]').removeClass('active');
	tabs.find('[data-tab-content]').removeClass('active');
	tab.addClass('active');
	content.addClass('active');
	document.location.hash = "#tab_" + nb;
}

// Проверяет хэш, переданый пользователем и открывает соответствующий раздел
function checkTabHash() {
	// Определяем текущий хэш страницы
	var hash = window.location.hash.substr(1);
	if(hash == 'goodsDataOpinionAdd') {
		hash = 'tab_4';
	}
	if(!hash.length || hash.indexOf('tab_') == -1) {
		return false;
	}
	// Открываем тот таб, который был указан в hash-е
	tabSwitch(hash.replace("tab_", ''))
}

// Изменение кол-ва в карточке
function prodQty($container){
	var goodsModView = $container || $('#main .productViewBlock')
	goodsModView.find('.quantity').change(function(){
		var t = $(this);
		// Количество
		var val = parseInt(t.val());
		// Если вводят 0 то заменяем на 1
		if(val < 1){
			t.val(1);
			val = 1;
		}
		// Проверка максимальныго остатка
		var max = parseInt(t.attr('max'));
		if(val > max){
			t.val(max);
			val = max;
			new Noty({
				text: '<div class="noty__addto"><div class="noty__message">Внимание! Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div></div>',
				layout:"bottomRight",
				type:"warning",
				easing:"swing",
				animation: {
					open: 'animated fadeInUp',
					close: 'animated fadeOutDown',
					easing: 'swing',
					speed: 400
				},
				timeout:"2000",
				progressBar:true
			}).show();
		}

		// Обновление кол-ва для функций "Добавить"
		goodsModView.find('.goodsDataMainModificationId').val($(this).val());
		// Цена товара без изменений
		var price = parseInt(goodsModView.find('.price__now').attr('content'));
		var priceOld = parseInt(goodsModView.find('.price__old').attr('content'));
		var newPrice = 0;
		var newPriceOld = 0;

		// Проверяем наличие добавленных товаров вместе с основным
		if (goodsModView.find('.productView__form [class^="goodsID-"]').length) {
			goodsModView.find('.productView__form [class^="goodsID-"]').each(function(){
				// Сумма всех добавленных товаров
				newPrice += parseInt($(this).attr('data-price'))
				newPriceOld += parseInt($(this).attr('data-price-old'))
			});
		}

		// Считаем новую сумму товара с учетом добавленных
		var multi = String(val * price + newPrice);
		var multiOld = String(val * priceOld + newPriceOld);

		// Обновляем новую сумму
		goodsModView.find('.price__now').attr('data-price', multi);
		goodsModView.find('.price__now').find('.num').text(addSpaces(multi));
		goodsModView.find('.price__old').attr('data-price-old', multiOld);
		goodsModView.find('.price__old').find('.num').text(addSpaces(multiOld));
	});
}

// Переименование названий Месяца
function monthNames() {
	if ($('.month').length){
		$('.month').each(function (){
			if ($(this).text() === 'Jan') {
				$(this).text('Января')
			}else if ($(this).text() === 'Feb') {
				$(this).text('Февраля')
			}else if ($(this).text() === 'Mar') {
				$(this).text('Марта')
			}else if ($(this).text() === 'Apr') {
				$(this).text('Апреля')
			}else if ($(this).text() === 'May') {
				$(this).text('Мая')
			}else if ($(this).text() === 'Jun') {
				$(this).text('Июня')
			}else if ($(this).text() === 'Jul') {
				$(this).text('Июля')
			}else if ($(this).text() === 'Aug') {
				$(this).text('Августа')
			}else if ($(this).text() === 'Sep') {
				$(this).text('Сентября')
			}else if ($(this).text() === 'Oct') {
				$(this).text('Октября')
			}else if ($(this).text() === 'Nov') {
				$(this).text('Ноября')
			}else if ($(this).text() === 'Dec') {
				$(this).text('Декабря')
			}
		});
	}
}


// Радио кнопки для модификаций
function newModification($container) {
	var $parentBlock = $container || $('#main .productViewBlock')
	$parentBlock.find('.goodsModificationsProperty').each(function(){
		a = $(this).find('select option:selected').attr('value');
		$(this).find('.goodsModificationsValue[data-value="'+ a +'"]').addClass('active');
		dis = $(this).find('select option:disabled').attr('value');
		$(this).find('.goodsModificationsValue[data-value="'+ dis +'"]').removeClass('active');
		$(this).find('.goodsModificationsValue[data-value="'+ dis +'"]').addClass('disabled');
	});
	$parentBlock.find('.goodsModificationsValue').click(function(){
		$(this).parents().find('.goodsModificationsValue').removeClass('active');
		$(this).addClass('active');
		a = $(this).data('value');
		$(this).parents().find('select option[value="' + a + '"]').prop('selected',true);
		$(this).parents().find('select').trigger('change');
	});
	$parentBlock.find('.goodsModificationsValue.disabled').off('click');
}

// Модификации select
function goodsModification($container) {
	// Функция собирает свойства в строку, для определения модификации товара
	function getSlugFromGoodsDataFormModificationsProperties(obj) {
		var properties = new Array();
		$(obj).each(function(i){
			properties[i] = parseInt($(this).val());
		});
		return properties.sort(function(a,b){
			return a - b
		}).join('_');
	}

	var $parentBlock = $container || $('#main .productViewBlock')

	var
		goodsDataProperties = $parentBlock.find('.goodsModificationsProperty select[name="form[properties][]"]'),  // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
		goodsDataModifications = $parentBlock.find('.goodsModificationsList'); // Запоминаем блоки с информацией по модификациям, для ускорения работы

	// Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
	function updateVisibility (y) {
		// Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
		goodsDataProperties.each(function(j){
			// Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
			if( j != y ) {
				// Проходим по всем значениям текущего свойства модификации товара
				$(this).find('option').each(function(){
					// Записываем временный массив свойств, которые будем использовать для проверки существования модификации
					var checkProperties = new Array();
					$(goodsDataProperties).each(function(i){
						checkProperties[i] = parseInt($(this).val());
					});
					// Пытаемся найти модификацию соответствующую выбранным значениям свойств
					checkProperties[j] = parseInt($(this).attr('value'));
					// Собираем хэш определяющий модификацию по свойствам
					slug = checkProperties.sort(function(a,b){return a - b}).join('_');
					// Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
					if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
						$(this).attr('disabled', true);
						// Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
					} else {
						$(this).attr('disabled', false);
					}
				});
			}
		});
	}
	// Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
	// Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
	updateVisibility (0);
	// Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
	updateVisibility (1);

	// Изменение цены товара при изменении у товара свойства для модификации
	goodsDataProperties.each(function(y){
		$(this).change(function(){
			var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
					goodsModView                  = $parentBlock.find('.productView'),
					modificationBlock             = goodsModView.find('.goodsModificationsList[rel="'+slug+'"]'),
					modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
					modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
					modificationPriceNow          = parseInt(modificationBlock.find('[name="price_now"]').val()),
					modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
					modificationPriceOld          = parseInt(modificationBlock.find('[name="price_old"]').val()),
					modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
					modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
					modificationDescription       = modificationBlock.find('.description').html(),
					modificationIsInCompareList   = modificationBlock.find('[name="is_has_in_compare_list"]').val(), // Отследить что делает
					modificationGoodsModImageId   = modificationBlock.find('[name="goods_mod_image_id"]').val(),
					goodsModificationId           = goodsModView.find('.goodsModificationId'),
					goodsPriceNow                 = goodsModView.find('.price__now'),
					goodsPriceOld                 = goodsModView.find('.price__old'),
					goodsAvailableQty             = goodsModView.find('.productView__qty'),
					goodsAvailable                = goodsModView.find('.productView__available'),
					goodsAvailableTrue            = goodsAvailable.find('.available__true'),
					goodsAvailableFalse           = goodsAvailable.find('.available__false'),
					goodsArtNumberBlock           = goodsModView.find('.productView__articles'),
					goodsArtNumber                = goodsArtNumberBlock.find('.goodsModArtNumber'),
					goodsModDescriptionBlock      = goodsModView.find('.goodsModDescription'),
					goodsModRestValue             = goodsModView.find('.goodsModRestValue');

			// Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
			if(modificationBlock.length) {
				// Цена товара
				goodsPriceNow.html(modificationPriceNowFormated);
				goodsPriceNow.attr('data-price', modificationPriceNow);
				goodsPriceNow.attr('content', modificationPriceNow);

				var relatedPriceNow = $('#related-goods .products__total-price');
				var goodsID = $('[class^="goodsID-"]');
				if(goodsID.length){
					relatedPriceNow.html(modificationPriceNowFormated);
					relatedPriceNow.attr('data-price', modificationPriceNow);
					relatedPriceNow.attr('content', modificationPriceNow);
				}else{
					relatedPriceNow.find('.num').text('0');
				}

				$('#related-goods .checkbox__input').each(function(i, checkbox){
					var $checkbox = $(checkbox);
					var checkboxActive = $checkbox.prop('checked');
					if(checkboxActive) {
						changePrice($checkbox, checkboxActive);
					}
				});
				// Старая цена товара
				if(modificationPriceOld>modificationPriceNow) {
					goodsPriceOld.html(modificationPriceOldFormated);
				} else {
					goodsPriceOld.html('');
					goodsPriceOld.hide();
				}
				// Есть ли товар есть в наличии
				if(modificationRestValue>0) {
					goodsAvailableTrue.show();
					goodsAvailableFalse.hide();
					goodsModView.removeClass('productView__empty');
					goodsModRestValue.html('В наличии');
					goodsModRestValue.attr('data-value', modificationRestValue);
					goodsAvailableQty.find('.quantity').attr('max', modificationRestValue);
					goodsAvailableQty.find('.quantity').val("1");
					// Если товара Нет в наличии
				} else {
					goodsAvailableTrue.hide();
					goodsAvailableFalse.show();
					goodsModView.addClass('productView__empty');
					goodsModRestValue.html(modificationRestValue);
					goodsModRestValue.attr('data-value', modificationRestValue);
					goodsAvailableQty.find('.quantity').attr('max', modificationRestValue);
					goodsAvailableQty.find('.quantity').val("1");
				}
				// Много Мало
				if(modificationRestValue>10) {
					goodsModRestValue.html('В наличии Много');
				} else {
					goodsModRestValue.html('В наличии Мало');
				}

				// Покажем артикул модификации товара, если он указан
				if(modificationArtNumber.length>0) {
					goodsArtNumberBlock.show();
					goodsArtNumber.html(modificationArtNumber);
					// Скроем артикул модификации товара, если он не указан
				} else {
					goodsArtNumberBlock.hide();
					goodsArtNumber.html('');
				}
				// Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
				if(modificationDescription.length > 0) {
					goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
				} else {
					goodsModDescriptionBlock.hide().html();
				}
				// Идентификатор товарной модификации
				goodsModificationId.val(modificationId);
				goodsModView.find('.goodsDataMainModificationId').attr('name','form[goods_mod_id][' + modificationId + ']');
				var goodsDataMainImage = goodsModView.find('.productView__images');
				// Меняет главное изображение товара на изображение с идентификатором goods_mod_image_id
				function changePrimaryGoodsImage(goods_mod_image_id) {
					// Если не указан идентификатор модификации товара, значит ничего менять не нужно.
					if(1 > goods_mod_image_id) {
						return true;
					}
					var
							// Блок с изображением выбранной модификации товара
							goodsModImageBlock = goodsDataMainImage.find('[data-id="' + parseInt(goods_mod_image_id) + '"'),
							// Блок, в котором находится главное изображение товара
							MainImageBlock = goodsDataMainImage.find('.productView__image'),
							// Изображение модификации товара, на которое нужно будет изменить главное изображение товара.
							MediumImageUrl = goodsModImageBlock.attr('data-href'),
							// Главное изображение, в которое будем вставлять новое изображение
							MainImage = MainImageBlock.find('img')
					;
					// Если изображение модификации товара найдено - изменяем главное изображение
					MainImage.attr('src', MediumImageUrl).parent().attr('href', MediumImageUrl);
					// Изменяем идентификатор главного изображения
					MainImageBlock.attr("data-id", parseInt(goods_mod_image_id));
					return true;
				}
				// Обновляем изображние модификации товара, если оно указано
				changePrimaryGoodsImage(modificationGoodsModImageId);
			} else {
				// Отправим запись об ошибке на сервер
				sendError('no modification by slug '+slug);
				alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
			}
			// Обновляем возможность выбора другой модификации для текущих значений свойств модификации товара.
			updateVisibility(y);
		});
	});

	$('#related-goods .checkbox__input').on('change', function(){
    let $checkbox = $(this);
    let modId = $checkbox.data('mod-id');
    let checkboxActive = $checkbox.prop('checked');
    if (checkboxActive) {
      // Создаём инпут с доп товаром
      var $input = $('<input class="goodsID-' + modId + '">')
        .attr('type', 'hidden')
        .attr('name', 'form[goods_mod_id][' + modId + ']')
        .attr('data-price', $checkbox.data('mod-price'))
        .val(1);
      $('.productView__form').append($input);
      // Пересчёт цены
      changePrice($checkbox, checkboxActive);
      $(this).parent().addClass('added');
    } else {
      // Удаляем  доп товар
      $('.productView__form').find('input[name="form[goods_mod_id][' + modId + ']"]').remove();
      // Пересчёт цены
      changePrice($checkbox, checkboxActive)
      $(this).parent().removeClass('added');
    }
  });

	function changePrice(currentCheckbox, checkboxActive){
		var $checkbox = currentCheckbox;
		var checkboxPrice = $checkbox.data('mod-price');
		var priceNowBlock = $('.productView__price .price__now');
		var priceNowTotal = $('.products__total-price');
		var nowPrice = priceNowBlock.attr('data-price');
		var nowPriceTotal = priceNowTotal.attr('data-price');
		var newPrice = 0;
		var newPriceTotal = 0;
		if (checkboxActive) {
			newPrice = String(parseInt(nowPrice) + parseInt(checkboxPrice));
			priceNowBlock.attr('data-price', parseInt(nowPrice) + parseInt(checkboxPrice))
			newPriceTotal = String(parseInt(nowPriceTotal) + parseInt(checkboxPrice));
			priceNowTotal.attr('data-price', parseInt(nowPriceTotal) + parseInt(checkboxPrice))
		} else {
			newPrice = String(nowPrice - checkboxPrice);
			priceNowBlock.attr('data-price', parseInt(nowPrice) - parseInt(checkboxPrice))
			newPriceTotal = String(nowPriceTotal - checkboxPrice);
			priceNowTotal.attr('data-price', parseInt(nowPriceTotal) - parseInt(checkboxPrice))
		}
		priceNowBlock.find('.num').text(addSpaces(newPrice))
		priceNowTotal.find('.num').text(addSpaces(newPriceTotal))
	}
}


///////////////////////////////////////
// Сравнение товаров
///////////////////////////////////////
function compare() {
	var owlCompare = $('.CompareGoodsTableTbody .owl-carousel');
	owlCompare.owlCarousel({
		items: 4,
		margin: 16,
		loop: false,
		rewind: false,
		lazyLoad: true,
		dots: false,
		nav: false,
		navContainer: '',
		navText: [ , ],
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: false,
		smartSpeed: 500,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:2},
			481:{items:2},
			641:{items:3},
			768:{items:3},
			992:{items:4},
			1200:{items:4}
		},
		onInitialized: carouselInitialized,
		onChanged: carouselInitialized
	});
	function carouselInitialized(event){
		if (event.item.count > event.page.size) {
			$('.CompareGoods__nav .owl-nav').css('display', 'block');
		}else{
			$('.CompareGoods__nav .owl-nav').css('display', 'none');
		}
	}
	$('.CompareGoods__nav .owl-nav .owl-prev').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('prev.owl.carousel');
	});
	$('.CompareGoods__nav .owl-nav .owl-next').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('next.owl.carousel');
	});
	// Сравнение товаров. Фильтр в верхней навигации. Отображение всех и различающихся характеристик товара
	$('.CompareGoods__switch').on('click', function(){
		$(this).toggleClass('switch-on');
		if ($(this).hasClass('switch-on')) {
			$(this).trigger('on.switch');
			$('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
			$('.CompareGoodsTableTbodyComparisonLine.same').hide();
		} else {
			$(this).trigger('off.switch');
			$('.CompareGoodsTableTbodyComparisonLine:hidden').show();
		}
	});
}


///////////////////////////////////////
// Корзина
///////////////////////////////////////
function cartQuantity(){
	$('.cartqty').change($.debounce(300, function(){
		var quantity = $(this);
		var qVal = $(this).val();
		if(qVal >= '1'){
			var id = $(this).closest('.cart__item').data('id');
			var qty = $(this).val();
			var data = $('.cartForm').serializeArray();
			data.push({name: 'only_body', value: 1});
			$.ajax({
				data: data,
				cache:false,
				success:function(d){
					quantity.val($(d).find('.cart__item[data-id="' + id + '"] .cartqty').val());
					item = $('.cart__item[data-id="' + id + '"]');
					item.find('.price__now').html($(d).find('.cart__item[data-id="' + id + '"] .price__now').html());
					item.find('.price__old').html($(d).find('.cart__item[data-id="' + id + '"] .price__old').html());
					$('.cartTotal').html($(d).find('.cartTotal').html());
					c = $(d).find('.cart__item[data-id="' + id + '"] .cartqty').val();
					sumSave();
					// Вызов функции быстрого заказа в корзине
					$('#startOrder').on('click', function() {
						startOrder();
						return false;
					});
					if(qty > c){
						$('.cart__error').remove();
						$('.cartTable').before('<div class="cart__error warning">Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div>');
						$('.cart__error').fadeIn(500).delay(2500).fadeOut(500, function(){$('.cartErr').remove();});
						$('.cartqty').removeAttr('readonly');
					}
				}
			});
		}else{
			$(this).val('1');
			$(this).trigger('change');
		}
	}));
	quantity();
}

// Удаление товара из корзины
function cartDelete(s){
	var yep = confirm('Вы точно хотите удалить товар из корзины?');
	if(yep == true){
		s.closest('.cart__item').fadeOut();
		url = s.data('href');
		$.ajax({
			url:url,
			cache:false,
			success:function(d){
				$('.page-cartTable').html($(d).find('.page-cartTable').html());
				cartQuantity();
				sumSave();
				$('#startOrder').on('click', function() {
					startOrder();
					return false;
				});
			}
		});
	}else{
		return false;
	}
}

// Функция быстрого оформления заказа в корзине
function startOrder(){
	var globalOrder = $('#globalOrder');
	var cartTable = $('.cartTable');
	var closeOrder = $('#closeOrder');
	var startOrder = $('#startOrder');
	//объект блока куда будет выводиться форма быстрого заказа
	var OrderAjaxBlock = $('#OrderAjaxBlock');
	var urlQuickForm = '/cart/add'; // адрес страницы с формой
	// данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
	var quickFormData = [
		{name: 'ajax_q', value: 1},
		{name: 'fast_order', value: 1}
	];
	cartTable.addClass('disable');
	globalOrder.show('slow');
	closeOrder.addClass('show');
	$('.cart__clear').hide();
	startOrder.hide();
	$('#makeOrder').show();
	$.ajax({
		type: "POST",
		cache: false,
		url: urlQuickForm,
		data: quickFormData,
		success: function(data) {
			OrderAjaxBlock.html($(data).find('.fastOrderContent').wrap('<div></div>').html());
			OrderAjaxBlock.show('slow');
			$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
			showPass();
			orderScripts();
			orderScriptsSelect();
			coupons();
			// Стили для новых селектов
			$(".form__phone").mask("+7 (999) 999-9999");
			$("#sites_client_phone").mask("+7 (999) 999-9999");
			$('#closeOrder, .closeOrder').on('click', function() {
				cartTable.removeClass('disable');
				globalOrder.hide();
				closeOrder.removeClass('show');
				startOrder.show();
				$('#makeOrder').hide();
				$('.cart__clear').show();
				$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
				return false;
			});
			// Валидация формы на странице оформления заказа
			$(".total__buttons button, #makeOrder").on('click', function(){
				var form = $(".fastOrder__form");
				form.validate({
					errorPlacement: function(error, element) { }
				});
				form.submit();
				return false;
			});
			// Выключение кнопки оформления заказа если не все поля заполнены
			$(".fastOrder__form [required]").blur(function(){
				if($('.fastOrder__form').valid()) {
					$(".total__buttons button").removeClass('disabled');
					$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
					$("#makeOrder").removeClass('disabled');
					$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
				} else {
					$(".total__buttons button").addClass('disabled');
					$(".total__buttons button").attr('data-tooltip', 'Заполните все поля');
					$("#makeOrder").addClass('disabled');
					$("#makeOrder").attr('data-tooltip', 'Заполните все поля');
				}
			});
			// Выключение кнопки оформления заказа если не все поля заполнены
			$(function(){
				if($('.fastOrder__form').valid()) {
					$(".total__buttons button").removeClass('disabled');
					$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
					$("#makeOrder").removeClass('disabled');
					$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
				}else{
					$(".fastOrder__form input, .fastOrder__form textarea, .fastOrder__form select").removeClass('error');
				}
			});
		}
	});
	return false;
}


///////////////////////////////////////
// Функции шаблона
///////////////////////////////////////
// Функция копирования элементов из верхней части шапки
function mobile(){
	var content = $('.header__top').html();
	var mobile = $('.mobile');
	mobile.append(content)
}

// Функция Открытия каталога
function openCatalog(){
	// Создаем контейнеры куда будем отправлять наши подкатегории
	for (var i = 0; i < 4; i++){
		$('.catalog__subs').append('<div class="catalog__sub catalog__sub-level-'+ i +'" data-level="'+ i +'"><div class="catalog__sub-label catalog__link"></div></div>')
	}

	// Сортируем подкатегории по уровням
	$('.catalog__content .catalog__item').each(function(){
		var level = $(this).data('level')
		for (var i = 0; i < 4; i++){
			if (level == i) {
				$(this).addClass('level-'+ i +'');
				$('.catalog__sub-level-'+ i +'').append($(this))
			}
			level == '0' ? $(this).addClass('show') : $(this).removeClass('show')
		}
	});

	// Отображаем подкатегории при наведении
	$('.catalog__sub .catalog__item').mouseover(function(){
		$('.catalog__sub .catalog__item').removeClass('hover')
		$(this).addClass('hover')
		var id = $(this).data('id');
		var level = $(this).data('level')
		var next = level + 1;
		var next2 = level + 2;
		var prev = next - 1;
		$('.catalog__sub-level-'+ next +' .catalog__item').each(function(){
			$('.catalog__sub-level-'+ next +' .catalog__item').removeClass('show')
			$('.catalog__sub-level-'+ next +' .catalog__item').parent().removeClass('show')
			$('.catalog__sub-level-'+ next2 +' .catalog__item').removeClass('show')
			$('.catalog__sub-level-'+ next2 +' .catalog__item').parent().removeClass('show')
			$('.catalog__sub-level-'+ prev +' .catalog__item').removeClass('hovered')
			$('.catalog__sub-level-'+ next +' .catalog__item[data-parent="'+ id +'"]').addClass('show')
			$('.catalog__sub-level-'+ next +' .catalog__item[data-parent="'+ id +'"]').parent().addClass('show')
			$('.catalog__sub-level-'+ prev +' .catalog__item[data-id="'+ id +'"]').parent().addClass('show')
			$('.catalog__sub-level-'+ prev +' .catalog__item[data-id="'+ id +'"]').addClass('hovered')
			var txt = $('.catalog__sub-level-'+ prev +' .catalog__item[data-id="'+ id +'"] .catalog__name').text();
			$('.catalog__sub-level-'+ next +' .catalog__sub-label').text(txt);			
		});
	});	
}


///////////////////////////////////////
// Загрузка основных функций шаблона
///////////////////////////////////////
$(document).ready(function(){
  userAgent();
  openMenu();
  showPass();
  mainnav('header .mainnav', '1', 991);
  toTop();
	viewed();
	mobile();
	counterDate();
	newsCarousel();
  // Ленивая загрузка
  $(function(){
    var observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  });
  
  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
    // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });

  // Маска ввода телефона
  $(".form__phone").mask("+7 (999) 999-9999");

  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);

	// Удаление классов загрузки для элементов страницы
	$('.loading').addClass('loaded');
	$('div, section, ul').removeClass('loading');
});


////////////////////////////////////////////
// Загрузка основных функций шаблона Товаров
////////////////////////////////////////////
$(document).ready(function(){
	quickViewMod();
	goodsModRest();
	priceDiff('.product__item', 'percent');
	addCart();
	addTo();
	hoverImage();
	sumSave();
	// Добавление товара в корзину
	$('.add-cart').on('click', function() {
		var form = $(this).closest('form');
		if ($(this).hasClass('quick')) {
			form.attr('rel', 'quick');
		} else {
			var rel = form.attr('rel');
			if (rel) {
				form.attr('rel', rel.replace('quick', ''));
			}
		}
		form.trigger('submit');
		return (false);
	});

	// Уведомить при отсутствии товара
	$('.add-notify').on('click', function(){
		var formBlock = $(this).closest('.goodsListForm');
    var goodsMod = formBlock.find('[name="form[goods_mod_id]"]').val();
    $('#fancy-notify-goods-mod').val(goodsMod)
	});
});

// Запуск основных функций для разных разрешений экрана
$(document).ready(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
});

// Запуск функций при изменении экрана
$(window).resize(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
  mainnav('header .mainnav', '1', 991);
});


/*
//Функции для удобства
function addActive(obj){obj.addClass('active');}
function removeActive(obj){obj.removeClass('active')}
//if (addOpened(t));
function addOpened(obj){obj.hasClass('opened') ? obj.removeClass('opened') : obj.addClass('opened')}*/

function addActive(obj){obj.hasClass('active') ? obj.removeClass('active') : obj.addClass('active')}

// Функция подгрузки товаров ajax
function ajaxProducts() {
	var pages = $('.pages');

	if(pages.length){
		// Функция загрузки товаров со след страницы
		function loadItems(){
			var url = pages.find('.next a').attr('href');
			// Проверяем наличие след страницы
			if(url){
				// console.log('get goods from url', url)
				$.ajax({
					url:url + '&only_body=1',
					cache:false,
					dataType: 'html',
					success:function(data){
						// Получаем товары
						var items = $(data).find('.products__ajax').html();
						// Добавляем товары
						$('.products__ajax').append(items)
						// Обновляем изображение подргуженных товаров
						$('.products__ajax .product__item').each(function(){
							$(this).find('img').attr('src', $(this).find('img').data('src'))
						})
						priceDiff('.products__ajax .product__item', 'percent');
						// Обновляем навигацию
						pages.html($(data).find('.pages').html())
						$('.status__visible').text($('.products__ajax .product__item:visible').length);
					}
				})
			}else{
				console.log('Загружены все товары')
				return false;
			}
		}

		// Проверка положения нижней границы контейнера
		function checkPosition() {
			var coords = $(".products__container")[0].getBoundingClientRect();
			var windowHeight = document.documentElement.clientHeight;
			// нижний край элемента виден?
			var bottomVisible = coords.bottom < windowHeight && coords.bottom > 100;
			return bottomVisible
		}

		// обрабатываем скролл на всей странице
		function throttle(func, limit){
			var lastFunc;
			var lastRan;
			return function(){
				var context = this;
				var args = arguments;
				if (!lastRan){
					func.apply(context, args);
					lastRan = Date.now();
				} else {
					clearTimeout(lastFunc);
					lastFunc = setTimeout(function(){
						if((Date.now() - lastRan) >= limit) {
							func.apply(context, args);
							lastRan = Date.now();
						}
					}, limit - (Date.now() - lastRan));
				}
			}
		}
		
		// код будет срабатывать раз в 1 секунду
		document.addEventListener('scroll', throttle(function() {
			if(checkPosition()){
				console.log('loadItems')
				return loadItems();
			} else {
				return false;
			}
		}, 1000));

	}

}

// Функция записи состояния Нет в наличии
function restCookie(){
	// Куки для кнопки в наличии в каталоге
  var category_name = $('#page__title .title').text();
  if(getCookie('empty') === 'hide' && getCookie('categoryName') === category_name) {
    $("#filter_only_with_rest").prop('checked', true);
  } else {
    deleteCookie('categoryName','');
  }
  $("#filter_only_with_rest").change(function(){
     setCookie('categoryName', category_name);
     
    if($(this).is(':checked')){
      setCookie('empty','hide');
    }else{
      deleteCookie('empty','hide');
      deleteCookie('categoryName', '' );
    }
  });
}

// Функция определения кол-ва дней до окончания акции
function discountEndDay(){
	$('.promotion__item').each(function(){
		var end = $(this).find('.promotion__end').data('end')
		var now = $(this).find('.promotion__end').data('now')
		var diff = new Date(end).getTime() - new Date(now).getTime();
		// Получаем кол-во дней
		var days = Math.floor(diff / (1000 * 60 * 60 * 24));
		// Проверяем статус акции
		if(days < 0){
			var text = 'Акция завершена'
		}else{
			var text = 'Осталось ' + days + ' д' + genWordEnd(days, 'ень', 'ня', 'ней')
		}
		// Обновляем остаток дней
		$(this).find('.promotion__end').text(text)

	})
}

function stylerOn(){
	$('select').styler();
}


// Функция изменения изображений при наведении на товар
function hoverImage(){
	$('.product__item').each(function(){
		var t = $(this);
		var imagesLen = t.find('.product__imgID').length
		// Останавливаем функцию если меньше 2 изображений товара
		if (imagesLen < 2){
			return
		}

		// Создаем элементы при наведении на которые будут меняться изображения
		t.find('.product__imgID').each(function(){
			var href = $(this).data('href')
			var id =  $(this).data('id')
			// Создаем элементы
			t.find('.product__hoverImages').append('<div class="product__hoverImage" data-id="'+ id +'" data-href="'+ href +'"></div>');
			// Добавляем активный класс на элемент навигации
			if (id == t.find('.product__img').data('id')){
				t.find('.product__hoverImage').removeClass('active')
				t.find('.product__hoverImage[data-id="' + id + '"]').addClass('active')
			}
		});

		// Ховер эффект изменения изображения
		t.find('.product__hoverImage').hover(function(){
			var href = $(this).data('href')
			var id =  $(this).data('id')
			t.find('.product__img').attr({
				'data-id': id,
				'href': href
			})
			t.find('.product__img img').attr('src', href)
			t.find('.product__hoverImage').removeClass('active')
			$(this).addClass('active')
		})

	})
}

// Функция наведения на категории
function hoverCatalog(){
	
	$('.sideСatalog').each(function(){
		var t = $(this);
		var content = t.find('.sideСatalog__content');
		var height = $('.slider__item').height()

		if(height == undefined){
			var height = 500
		}

		// Скрываем кнопку если мало категорий. Сравниваем размеры по слайдеру
		if(content.height() >= height) {
			$('.sideСatalog').append('<div class="sideСatalog__more"><i class="icon-arrow_down"></i></div>');
			
			var button = t.find('.sideСatalog__more');
			
			// Показать больше категорий
			button.on('click', function(){
				$(this).toggleClass('active')
				content.toggleClass('active')
			})
		}


	})

}

hoverCatalog()



// Считаем скидку в корзине
function sumSave(){
	$('.addto__save').each(function(){
		var t = $(this).find('.cartSumSave');
		var priceSum = parseInt(t.data('price-old')) - parseInt(t.data('price-now'));
		if(priceSum > 0) {
			t.attr('data-price', priceSum).find('.num').text(addSpaces(priceSum))
			t.parent().show();
		}else{
			t.parent().hide();
		}
	});
}