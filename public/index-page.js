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
  var dne = false;
  var currentUrl = window.location.origin;

  $('#word').on('blur', function() {
    var word = $(this).val().trim();
    var data = {type: 'validate', word: word};

    $.post(currentUrl, data).then(function(response) {
      console.log(response);
      if(!response) {
        $('#formError').html(word+' already exists!').removeClass('disable');
        $('#addButton').attr('disabled', 'disabled');
        return false;
      } else {
        dne = true;
        $('#formError').addClass('disable');
        if(isWord && hasDef && dne) {
          $('#addButton').removeAttr('disabled');
        } else {
          $('#addButton').attr('disabled', 'disabled');
        }
      }
    })

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
      if(typeof response == 'object') {
        isWord = true;
      }

      if(isWord && hasDef && dne) {
        $('#addButton').removeAttr('disabled');
      } else {
        $('#addButton').attr('disabled', 'disabled');
      }

      if(dne) {
        $('#formError').addClass('disable');
      }
    })
  })

  $('#definition').on('blur', function() {
    if($(this).val() != '') {
      hasDef = true;
    } else {
      hasDef = false;
    }
    if(isWord && hasDef && dne) {
      $('#addButton').removeAttr('disabled');
    } else {
      $('#addButton').attr('disabled', 'disabled');
    }
  })

  // add word submit button
  $('#addButton').on('click', function() {
    var data = {
      type: 'add',
      word: $('#word').val().trim(),
      definition: $('#definition').val().trim(),
      wordType: $('#wordType').val()
    }

    $.post(currentUrl, data).then(function(response) {
      console.log(response);
      $('#addForm').addClass('disable');
      $('#wordReview').removeClass('disable');
      $('#wordReview .card-title').html(response.word);
      $('#wordReview .type').html(response.type);
      $('#wordReview .definition').html(response.definition);
      setTimeout(function() {
        $('.sidebar').animate({right: '-50%'}, 750, function() {
          $('.filter, .main, .nav').css('opacity', '1');
        });
        $('.sidebar').fadeOut(750, function() {
          $('#wordReview').addClass('disable');
          $('#addForm').removeClass('disable');
          $('#word').val('');
          $('#definition').val('');
        });
      }, 3000);
    })
  })

  // like button
  $('.heart').on('click', function() {
    var id = $(this).attr('id');
    var counter = $(this).siblings('.counter');
    console.log(id);
    var data = {
      type: 'like',
      id: id
    }
    $.post(currentUrl, data).then(function(response) {
      console.log(response);
      counter.html(response.likes);
    })
  })

  // edit button
  $('.edit').on('click', function() {
    var id = $(this).attr('id');
    var data = {id: id};

    $.post(currentUrl+'/edit', data).then(function(response) {
      console.log(response);
      window.location = currentUrl +'/edit';
    })
  })

})
