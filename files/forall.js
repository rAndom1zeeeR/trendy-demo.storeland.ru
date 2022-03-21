/*! Текущее состояние CapsLock */
var capsLockEnabled=null;function getChar(a){if(a.which==null){if(a.keyCode<32){return null}return String.fromCharCode(a.keyCode)}if(a.which!=0&&a.charCode!=0){if(a.which<32){return null}return String.fromCharCode(a.which)}return null}if(navigator.platform.substr(0,3)!="Mac"){document.onkeydown=function(a){a=a||event;if(a.keyCode==20&&capsLockEnabled!==null){capsLockEnabled=!capsLockEnabled}}}document.onkeypress=function(b){b=b||event;var a=getChar(b);if(!a){return}if(a.toLowerCase()==a.toUpperCase()){return}capsLockEnabled=(a.toLowerCase()==a&&b.shiftKey)||(a.toUpperCase()==a&&!b.shiftKey)};function checkCapsWarning(){document.getElementById("capslock").style.display=capsLockEnabled?"block":"none"}function removeCapsWarning(){document.getElementById("capslock").style.display="none"};
// Установка cookie файлов на основном домене магазина, в случае если покупатель зашёл на другой домен магазина, например по старой ссылке
try{$(document).ajaxSuccess(function(i,l,h){try{if(-1<h.data.indexOf("ajax_q=1")){var d=$.parseJSON(l.responseText);if(null!=d&&typeof(d.setcookie)=="object"){for(var g in d.setcookie){var c=document.createElement("script");c.type="text/javascript";c.async=typeof(d.status)=="undefined"||d.status=="reload"?true:false;c.src=d.setcookie[g];var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f);}}}}catch(j){}});}catch(e){}
// Установка cookie файлов на основном домене магазина, в случае если покупатель зашёл на другой домен магазина, например по старой ссылке
try{$(document).ajaxSuccess(function(i,l,h){try{if(typeof(h.data)!="undefined"&&-1<h.data.indexOf("ajax_q=1")){var d=$.parseJSON(l.responseText);if(null!=d&&typeof(d.setcookie)=="object"){for(var g in d.setcookie){var c=document.createElement("script");c.type="text/javascript";c.async=typeof(d.status)=="undefined"||d.status=="reload"?true:false;c.src=d.setcookie[g];var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f);}}}}catch(j){}});}catch(e){}

// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {
  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();
  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);
  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Считает сумму  33 599,65 + 2000 - 1910-41,6
function GetSum(val,precision) {
  if(typeof (precision) == "undefined" || precision < 0) { precision = 0; }
  // Возводим в степень точности 10 для округления
  var p = Math.pow(10,precision);  
  try {return Math.round(parseFloat(eval(val.toString().replace(/\s/gi, "").replace(/,/gi, ".")))*p)/p;} catch (e) {return 0;}
}