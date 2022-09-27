(function($) {
	var	$body = $('body');
	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});
	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {
			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});
			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});
		}
	// Menu.
		$('#menu')
			.appendTo($body)
			.panel({				
				delay: 500,
                hideOnClick: true,
				hideOnSwipe: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});
})(jQuery);
//Preload
window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }
//Выделение шаблона
function selectText(containerid) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}
//Смена темы
const toggleSwitch = document.querySelector('#theme-switch');
					function detectColorScheme(){
						var theme="light";    //default to light
						
						//local storage is used to override OS theme settings
						if(localStorage.getItem("theme")){
							if(localStorage.getItem("theme") == "dark"){
								var theme = "dark";
							}
						} else if(!window.matchMedia) {
							//matchMedia method not supported
							return false;
						} else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
							//OS theme setting detected as dark
							var theme = "dark";
						}
					
						//dark theme preferred, set document with a `data-theme` attribute
						if (theme=="dark") {
							document.body.classList.add("dark");
							toggleSwitch.checked = true;
						}
					}
					detectColorScheme();
					// This part in header ^
					
					//identify the toggle switch HTML element
					
					
					//function that changes the theme, and sets a localStorage variable to track the theme between page loads
					function switchTheme(e) {
						if (e.target.checked) {
							localStorage.setItem('theme', 'dark');
							document.body.classList.add("dark");
							toggleSwitch.checked = true;
						} else {
							localStorage.setItem('theme', 'light');
							document.body.classList.remove("dark");
							toggleSwitch.checked = false;
						}    
					}
					
					//listener for changing themes
					toggleSwitch.addEventListener('change', switchTheme, false);
					
					//pre-check the dark-theme checkbox if dark-theme is set
					if (document.documentElement.getAttribute("data-theme") == "dark"){
						toggleSwitch.checked = true;
					}
//снятие выделения и скрытие кнопки при скролле
$(window).scroll(function () {
	var highlight = getHighlight(); 
	if ( highlight.text !== '' ) { 
    	if ($(this).scrollTop() > 50) {
			window.getSelection().removeAllRanges();
    		sharing.setAttribute( 'class', 'sharing' );
			document.querySelector('.select').classList.remove('open');
    	}
	}
});
window.addEventListener('click', function(e) {
    const select = document.querySelector('.select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});
//Смена языка
$("#pdt_ru").click(function () {
	document.documentElement.setAttribute("lang","ru");
	console.log('Включен русский язык');
});
$("#pdt_uk").click(function () {
	document.documentElement.setAttribute("lang","uk");
	console.log('Включен великий Украинский язык');
});
//плавный якорь
$(".links").on("click","a", function (e) {
    e.preventDefault();
    var target = this.hash,
    $target = $(target);	
    $('html, body').stop().animate({
		'scrollTop': $target.offset().top - 65
	}, 700, 'swing', function () {
		window.location.hash = target;
	});
});
//слайдер
$("#slide").hide();
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('#slide').fadeIn();
    } else {
        $('#slide').fadeOut();
    }
});
//КНОПКА КОПИРОВАТЬ
//определяем выделение
function getHighlight() { 
    var selection = window.getSelection(); // 1. 
    var object = { 
        parent : null, 
        text   : '', 
        rect   : null 
    }; 
    if ( selection.rangeCount > 0 ) { 
        object = { 
            text   : selection.toString().trim(),
            parent : selection.anchorNode.parentNode, 
            rect   : selection.getRangeAt(0).getBoundingClientRect()
        }; 
    } 
    return object; 
}
var sharing = document.querySelector( '.sharing' );
//показываем кнопку
function showMenu() { 
    var highlight = getHighlight(); 
    if ( highlight.text === '' ) { 
        sharing.setAttribute( 'class', 'sharing' ); 
        sharing.style.left = 0; 
        sharing.style.top  = 0; 
        return; 
    } 
    var width = ( highlight.rect.width / 45); 
    sharing.setAttribute( 'class', 'sharing sharing--shown' ); 
	sharing.style.left = ( highlight.rect.left + width ) + 'px'; 
    sharing.style.top  = ( highlight.rect.top - 50) + 'px'; 
}
document.body.addEventListener( 'mouseup', function() { 
     setTimeout( showMenu, 100 ); 
} );
//Функция скрытия кнопок после нажатия на кнопку
var done_m = document.querySelector('#done_m');
var copy_s = document.querySelector('#copy_s');
var copy_b = document.querySelector('#copy_b');
function klik() {
	window.getSelection().removeAllRanges();
    done_m.setAttribute( 'class', 'hide' ); 
	copy_b.removeAttribute('class'); 
	copy_s.removeAttribute( 'class');
	sharing.setAttribute( 'class', 'sharing' ); 
}
//копирование без подписи
async function copyWithoutSign() {
  try {
	var highlight = getHighlight(); 
    await navigator.clipboard.writeText(highlight.text);
	done_m.removeAttribute( 'class'); 
	copy_b.setAttribute( 'class', 'hide' ); 
	copy_s.setAttribute( 'class', 'hide' ); 
	setTimeout(klik, 1000);
    console.log('Скопирован текст без подписи');
  } catch (err) {
    console.error('Не удалось скопировать: ', err);
  }
} 
//копирование с подписью				 
async function copyWithSign() {
  try {
	var highlight = getHighlight(); 
	const sign = kek;
    await navigator.clipboard.writeText(`${highlight.text}\n\n${sign}`);
	done_m.removeAttribute( 'class'); 
	copy_b.setAttribute( 'class', 'hide' ); 
	copy_s.setAttribute( 'class', 'hide' ); 
	setTimeout(klik, 1000);
    console.log('Скопирован текст с подписью', document.querySelector('.custom-option.selected').textContent);
	document.querySelector('.custom-option.selected').setAttribute( 'class', 'custom-option' ); 
  } catch (err) {
    console.error('Не удалось скопировать: ', err);
  }
} 
///обычное копирование - ctrl+c без форматирования и пробелов
document.addEventListener('copy', copyWithoutSign);
//выбор подписи
copy_s.addEventListener('click', function() {
    this.querySelector('.select').classList.toggle('open');
})
for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option').classList.remove('selected');
            this.classList.add('selected');
            if (document.documentElement.getAttribute("lang") == 'uk'){
			    if (this.dataset.value == 'miloan'){
			        kek = 'З повагою,\nСлужба підтримки клієнтів Мілоан\nтел.: (044)337-36-67\ne-mail: info@miloan.ua';
			    } else if (this.dataset.value == 'tengo'){
			        kek = 'З повагою,\nСлужба підтримки клієнтів Тенго\nтел.: (044)337-00-37\ne-mail: info@tengo.ua';
			    } else if (this.dataset.value == 'amigo'){
			        kek = 'З повагою,\nСлужба підтримки клієнтів Аміго\nтел.: (044)337-00-33\ne-mail: info@amigo.com.ua';
			    }
			    copyWithSign(kek);
            } else {
                if (this.dataset.value == 'miloan'){
                    kek = 'С уважением,\nСлужба поддержки клиентов Милоан\nтел.: (044)337-36-67\n e-mail: info@miloan.ua';
                } else if (this.dataset.value == 'tengo'){
                    kek = 'С уважением,\nСлужба поддержки клиентов Тенго\nтел.: (044)337-00-37\ne-mail: info@tengo.ua';
                } else if (this.dataset.value == 'amigo'){
                    kek = 'С уважением,\nСлужба поддержки клиентов Амиго\nтел.: (044)337-00-33\ne-mail: info@amigo.com.ua';
                }
                copyWithSign(kek);
            }
        }
    })
}
