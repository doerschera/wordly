$(document).ready(function() {

  // filter dropdown show/hide
  var filter = false;

  $('.dropdown').on('click', function() {
    if(!filter) {
      $('#filter').slideDown(function() {
        filter = true;
        $('#droparrow').html('arrow_drop_up');
      });
    } else {
      $('#filter').slideUp(function() {
        filter = false;
        $('#droparrow').html('arrow_drop_down');
      });
    }
  })

  // favorite button color
  $('.heart').on('click', function() {
    $(this).html('favorite');
  })

  // navigation buttons
  $('#favorites').on('mouseenter', function() {
    $('#buttonInfo > p').html('view favorites');
    $('#buttonInfo').slideDown();
  })
  $('#favorites').on('mouseleave', function() {
    $('#buttonInfo').slideUp();
  })

  $('#add').on('mouseenter', function() {
    $('#buttonInfo > p').html('add a word');
    $('#buttonInfo').slideDown();
  })
  $('#add').on('mouseleave', function() {
    $('#buttonInfo').slideUp();
  })

  // sidebar animation
  var currentUrl = window.location.origin;
  $('#add').on('click', function() {
    $('#addForm').removeClass('disable');
    $('#favoriteWords').addClass('disable');
    $('.sidebar').fadeIn(750);
    $('.sidebar').animate({right: '0px'}, 750, function() {
      $('.filter, .main, .nav').css('opacity', '0.5');
    });
  })

  $('#favorites').on('click', function() {
    $('#favoriteWords').removeClass('disable');
    $('#addForm').addClass('disable');
    $('.sidebar').fadeIn(750);
    $('.sidebar').animate({right: '0px'}, 750, function() {
      $('.filter, .main, .nav').css('opacity', '0.5');
    });
  })

  $(document).on('click', '#cards', function() {
    $('.sidebar').animate({right: '-50%'}, 750, function() {
      $('.filter, .main, .nav').css('opacity', '1');
    });
    $('.sidebar').fadeOut(750);
  })


})
