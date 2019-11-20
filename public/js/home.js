$( document ).ready(function() {
    if(typeof(message) !== 'undefined'){
        alert(message);
    }
    
    
    $("#profile-tab").click(function(e){
        $("#profile-tab").addClass("active");
        $("#profile").removeClass("fade");
        $("#profile").fadeIn();
        $("#home").hide();
        $("#home-tab").removeClass("active");
    })

    $("#home-tab").click(function(e){
        $("#profile-tab").removeClass("active");
        $("#profile").hide();
        $("#home").fadeIn();
        $("#home-tab").addClass("active");
    })

}); 