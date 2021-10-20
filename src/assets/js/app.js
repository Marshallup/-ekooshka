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
  fade: true,
  dots: true,
  infinite: true,
  speed: 600,
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