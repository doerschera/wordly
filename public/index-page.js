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

})
