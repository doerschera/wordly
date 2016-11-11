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
  $('#add').on('click', function() {
    sidebar('#addForm', '#favoriteWords');
  })

  $('#favorites').on('click', function() {
    sidebar('#favoriteWords', '#addForm');
  })

  $(document).on('click', '#cards', function() {
    $('.sidebar').animate({right: '-50%'}, 750, function() {
      $('.filter, .main, .nav').css('opacity', '1');
    });
    $('.sidebar').fadeOut(750);
  })

  function sidebar(show, hide) {
    $(show).removeClass('disable');
    $(hide).addClass('disable');
    $('.sidebar').fadeIn(750);
    $('.sidebar').animate({right: '0px'}, 750, function() {
      $('.filter, .main, .nav').css('opacity', '0.5');
    });
  }

  // add word validation
  var isWord = false;
  var hasDef = false;

  $('#word').on('blur', function() {
    var word = $(this).val().trim();
    console.log(word);

    $.ajax({
      url: 'https://wordsapiv1.p.mashape.com/words/'+word+'/definitions',
      method: 'GET',
      beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'gMOuYDtbPVmshXbyfdvdY5QxS77qp1zwbX1jsnLdvVsABNFARQ')},
      statusCode: {
        404: function() {
          $('#formError').html('Oops! '+word+' is not a valid word.').removeClass('disable');
          isWord = false;
          $('#addButton').attr('disabled', 'disabled');
        }
      }
    }).done(function(response) {
      $('#formError').addClass('disable');
      
      if(typeof response == 'object') {
        isWord = true;
      }

      if(isWord && hasDef) {
        $('#addButton').removeAttr('disabled');
      } else {
        $('#addButton').attr('disabled', 'disabled');
      }
    })
  })

  $('#definition').on('blur', function() {
    if($(this).val() != '') {
      hasDef = true;
    } else {
      hasDef = false;
    }
    if(isWord && hasDef) {
      $('#addButton').removeAttr('disabled');
    } else {
      $('#addButton').attr('disabled', 'disabled');
    }
  })

})
