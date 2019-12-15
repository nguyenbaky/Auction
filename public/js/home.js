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

    $('.favorite').click(function(e){
        e.preventDefault();
        
    })

    $('.buy').click(function (e) {
        e.preventDefault();
    })

   
}); 

function increaseValue(buoc_gia) {
    var value = parseInt(document.getElementById('number').value, 10);
    value += buoc_gia;
    document.getElementById('number').value = value;
  }
  
function decreaseValue(gia_hien_tai,buoc_gia) {
    var value = parseInt(document.getElementById('number').value, 10);
    value -= buoc_gia
    value < gia_hien_tai ? value = gia_hien_tai: value
    document.getElementById('number').value = value;
}

function bid(gia_hien_tai) {
    var value = parseInt(document.getElementById('number').value, 10);
    if(value < gia_hien_tai) {
        alert("Bước giá thấp hơn qui định")
        return
    }
    var d = new Date();
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var day = d.getDate() 
    var h = d.getHours()
    var mi = d.getMinutes()
    var n = y+"-"+m+"-"+day+" "+h+":"+mi

    var data = {}
    var url = window.location.pathname.split("/")
    var id = url[2]
  
    data.Gia_Hien_Tai = value
    data.bidder = document.getElementById("bidder").textContent;
    data.thoi_diem = n

    $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/product/'+id,						
        success: function(data) {
            alert(data);    
            location.reload();                    
        }
    });
}