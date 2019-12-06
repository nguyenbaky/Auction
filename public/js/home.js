$( document ).ready(function() {    
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

    $('#upgrade').click(function (e) {
        var data = {}
        var id = $("#id").text()
        data.is_update = 1
        console.log(data)
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'request/' + id,						
            success: function(data) {
                if(data === "Thành công")  {
                    location.reload()
                }               
            }
        });
    })

}); 