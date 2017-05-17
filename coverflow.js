$(document).ready(function() {
window.log(it's working!);
 $('#coverflowadult div, #coverflowadult').fadeIn();


$('#ya').click(function(e) {
    $('#ya').addClass('active');
    $("#religion").removeClass("active");
    $("#fiction").removeClass("active");
    $("#nonfiction").removeClass("active");
    

    $('#coverflowrel div, #coverflowrfic div, #coverflowrnonfic div, #coverflowrel, #coverflowfic, #coverflowrnonfic').fadeOut('fast', function() {
      $('#coverflowya div, #coverflowya').fadeIn('fast');
    })
  });

  $('#fiction').click(function(e) {
      
    $('#fiction').addClass('active');
    $("#religion").removeClass("active");
    $("#ya").removeClass("active");
    $("#nonfiction").removeClass("active");
    
    $('#coverflowrel div, #coverflowya div, #coverflowrnonfic div, #coverflowrel, #coverflowya, #coverflowrnonfic').fadeOut('fast', function() {
    
      $('#coverflowrfic div, #coverflowrfic').fadeIn('fast');
    })
  });
  
  $('#nonfiction').click(function(e) {
    $('#nonfiction').addClass('active');
   $("#religion").removeClass("active");
    $("#fiction").removeClass("active");
    $("#ya").removeClass("active");
    
   $('#coverflowrel div, #coverflowya div, #coverflowrfic div, #coverflowrel, #coverflowya, #coverflowrfic').fadeOut('fast', function() {
      $('#coverflowrnonfic div, #coverflowrnonfic').fadeIn('fast');
    });
  });
  
    $('#religion').click(function(e) {
   
    $('#religion').addClass('active');
    $("#ya").removeClass("active");
    $("#fiction").removeClass("active");
    $("#nonfiction").removeClass("active");
    
    $('#coverflowya div, #coverflowrfic div, #coverflowrnonfic div, #coverflowya, #coverflowrfic, #coverflowrnonfic').fadeOut('fast', function() {
      $('#coverflowrel div, #coverflowrel').fadeIn('fast');
    });
  });

});
