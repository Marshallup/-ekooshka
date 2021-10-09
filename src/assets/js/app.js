const mainSlider = $('#main-slider');

mainSlider.on('init', function(event, slick) {
  const slideCount = slick.slideCount;
  $('#count-end').text('0' + slideCount);
})
mainSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  const nextSlideInc = nextSlide + 1;
  $('#count-start').text('0' + nextSlideInc);
  console.log(event, slick, currentSlide, nextSlide)
})
mainSlider.slick({
  dots: true,
  infinite: true,
  speed: 300,
  appendArrows: '.main-slider__arrows',
  appendDots: '.main-slider__dots',
  slidesToShow: 1,
  adaptiveHeight: true
});