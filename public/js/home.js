$( document ).ready(function() {
    if(typeof(message) !== 'undefined'){
        alert(message);
    }
    
    
    $("#profile-tab").click(function(e){
        $("#profile-tab").addClass("active");
        $("#profile").removeClass("fade");
        $("#score-tab").removeClass("active");
        $("#profile").fadeIn();
        $("#home").hide();
        $("#score").hide();
        $("#home-tab").removeClass("active");
    })

    $("#home-tab").click(function(e){
        $("#profile-tab").removeClass("active");
        $("#score-tab").removeClass("active");
        $("#profile").hide();
        $("#score").hide();
        $("#home").fadeIn();
        $("#home-tab").addClass("active");
    })

    $("#score-tab").click(function(e){
        $("#profile-tab").removeClass("active");
        $("#home-tab").removeClass("active");
        $("#profile").hide();
        $("#home").hide();
        $("#score").removeClass("fade");
        $("#score").fadeIn();
        $("#score-tab").addClass("active");
    })

}); 