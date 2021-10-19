const mainSlider = $('#main-slider');

mainSlider.on('init', function(event, slick) {
  const slideCount = slick.slideCount;
  $('#count-end').text('0' + slideCount);
})
mainSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  const nextSlideInc = nextSlide + 1;
  $('#count-start').text('0' + nextSlideInc);
})
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

})