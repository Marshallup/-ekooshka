jQuery(document).ready(function($) {
  const htmlBody = $("html, body");
  const mainSlider = $('#main-slider');

  mainSlider.on('init', function(event, slick) {
    const slideCount = slick.slideCount;
    $('#count-end').text('0' + slideCount);
  });
  mainSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    const nextSlideInc = nextSlide + 1;
    $('#count-start').text('0' + nextSlideInc);
  });
  mainSlider.slick({
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    dots: true,
    infinite: true,
    speed: 800,
    appendArrows: '.main-slider__arrows',
    appendDots: '.main-slider__dots',
    slidesToShow: 1,
    adaptiveHeight: true
  });

// label animations
  const inputWraps = $('.section-form-item__input-wrap');

  inputWraps.each((idx, item) => {
    const $item = $(item);
    const $input = $item.find('.section-form-item__input');
    const $label = $item.find('.section-form-item__input-label');

    $input.on('focus', function() {
      $label.addClass('active');
    });

    $input.on('focusout', function() {
      if (!$input.val()) {
        $label.removeClass('active');
      }
    })
  });

// Слайдеры в секции сравнения
  const comparisonSliders = $('.comparison-slider-wrap');

  comparisonSliders.each((idx, item) => {
    const $item = $(item);
    const $slider = $item.find('.comparison-slider');

    $slider.on('init', function(event, slick) {
      const slideCount = slick.slideCount;
      $item.find('.comparison-slider-controlls-count__end').text('0' + slideCount);
    });
    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      const nextSlideInc = nextSlide + 1;
      $item.find('.comparison-slider-controlls-count__start').text('0' + nextSlideInc);
    });

    $slider.slick({
      fade: true,
      infinite: true,
      speed: 600,
      appendArrows: $item.find('.comparison-slider-controlls-arrows'),
      slidesToShow: 1,
      adaptiveHeight: true
    });
  });

  // AOS инициализация
  AOS.init();

  // Inputs mask
  Inputmask({ mask: '(+7 |8 )999 (999) 99 99', greedy: true, showMaskOnHover: false,}).mask('#phone_order');

  const emailOrder = document.getElementById('email_order');
  emailOrder.removeAttribute('type');
  Inputmask({ mask: '*{1,20}@*{3,20}.a{2,3}', greedy: false, showMaskOnHover: false,}).mask(emailOrder);
// Кнопка в футере
  const btnTop = $('.eko-btn-top');
  const btnTopIcon = btnTop.find('.eko-btn-top__wrap');
  const btnTopText = btnTop.find('.eko-btn-top__text');

  btnTopText.on('mouseenter', function() {
    btnTopIcon.addClass('active');
  });
  btnTopText.on('mouseleave', function() {
    btnTopIcon.removeClass('active');
  });
  btnTopText.on('click', function() {
    htmlBody.animate({ scrollTop: 0 }, 1000);
  });
  btnTopIcon.on('click', function() {
    htmlBody.animate({ scrollTop: 0 }, 1000);
  });

// Читать дальше
  const readMore = $('.presentation-item__read-more');
  const readMoreText = readMore.parent().find('.presentation-item-text');
  const readedClass = 'readed';
  const activeClass = 'text-slice';

  window.onload = initSpliceText

  $(window).resize(initSpliceText);
  initSpliceText();
  readMore.on('click', expandText);

  function initSpliceText() {
    readMoreText.each(function() {
      const $this = $(this);
      const $thisBtnReadMore = $this.parent().find('.presentation-item__read-more');
      const textBlocks = $this.children();
      const firstTextBlock = textBlocks.first();
      const firstTextBlockHeight = firstTextBlock.outerHeight();
      if (window.innerWidth < 575) {
        if (!firstTextBlock.hasClass(activeClass) && textBlocks.length > 1) {
          $this.css('height', firstTextBlockHeight);
          spliceText(firstTextBlock, activeClass);
        }

        if (textBlocks.length < 2 && $thisBtnReadMore.length) {
          $thisBtnReadMore.remove();
        }
      } else {
        $this.css('height', 'auto');
        if (firstTextBlock.hasClass(activeClass)) {
          readMore.removeClass(readedClass);
          returnText(firstTextBlock, activeClass);
        }
      }
    });
  }

  /**
   *
   * @param {HTMLElement} firstTextBlock
   * @param {string} activeClass
   * @description Обрезает текст по первому элементу, заменяет на 3 ..., добавляет класс, что текст обрезан на первый элемент
   */
  function spliceText(firstTextBlock, activeClass) {
    const htmlText = firstTextBlock.html();
    const replaceText = htmlText.substring(0, htmlText.length - 1) + '...';

    firstTextBlock.attr('data-text', htmlText);
    firstTextBlock.html(replaceText);
    firstTextBlock.addClass(activeClass);
  }

  /**
   *
   * @param {HTMLElement} firstTextBlock
   * @param {string} activeClass
   * @description Возвращает оригинальный текст, убирает класс у первого элемента
   */
  function returnText(firstTextBlock, activeClass) {
    const htmlText = firstTextBlock.data('text');

    firstTextBlock.html(htmlText);
    firstTextBlock.removeClass(activeClass);
  }

  /**
   *
   * @description По клику раскрывает текст, добавляет класс на прочитанный текст
   */
  function expandText() {
    const $this = $(this);
    const textBlock = $this.parent().find('.presentation-item-text');
    const curHeight = textBlock.outerHeight();
    const firstTextBlock = textBlock.children().first();
    const dataText = firstTextBlock.data('text');
    firstTextBlock.html(dataText);

    textBlock.css('height', 'auto');
    const autoHeight = textBlock.outerHeight();

    textBlock.css('height', curHeight);
    textBlock.animate({height: autoHeight}, 1000, function() {
      $this.addClass(readedClass);
      textBlock.css('height', 'auto');
    });
  }

  // Бургер
  const burger = $('.banner-top__burger');
  const mobileMenu = $('.header-menu--mobile-wrapper');
  const mobileLinks = mobileMenu.find('.header-menu__link');

  burger.click(function() {
    toggleMenu($(this));
  });
  mobileLinks.click(function() {
    toggleMenu(burger);
  });

  function toggleMenu($burger) {
    $burger.toggleClass('active');

    if ($burger.hasClass('active')) {
      htmlBody.animate({ scrollTop: 0 }, 200, function() {
        htmlBody.addClass('lock');
        mobileMenu.addClass('show');
      });
    } else {
      htmlBody.removeClass('lock');
      mobileMenu.removeClass('show');
    }
  }

  // Кнопки якоря
  const anchorLinks = $('.eko__anchor');
  anchorLinks.click(function(e) {
    e.preventDefault();
    animateAnchorLink($(this));
  });


  function animateAnchorLink($link) {
    const searchId = $link.attr('href');
    if (searchId) {
      const $searchEl = $(searchId);
      htmlBody.animate({ scrollTop: $searchEl.position().top }, 1000)
    }
  }

});