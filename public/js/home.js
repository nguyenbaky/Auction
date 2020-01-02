$( document ).ready(function() { 
    var point = 0

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
    // Upgrade account
    $('#upgrade').click(function (e) {
        var data = {}
        var id = $("#id").text()
        data.is_update = 1
        console.log(data)
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/request/' + id,						
            success: function(data) {
                if(data === "Thành công")  {
                    location.reload()
                }               
            }
        });
    })
    // Thêm vào yêu thích
    $('.favorite').click(function(e){
        e.preventDefault(); 
        var data = {}
        data.product_id = $("#product_id").text()
        var id = $("#id").text()
        if(id === "")
        {
            alert("You have to loggin first !!")
            return
        }
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/favorite/'+id,						
            success: function(data) {
                alert(data)                   
            }
        })         
    })
    // event click button Đấu giá
    $('.buy').click(function (e) {
        e.preventDefault();
        var user = $("#user").text()
        var seller = $('#seller').text()
        if(user === ""){
            $(this).removeAttr('data-target');
            alert("You have to loggin first to bid !!")       
            return
        }

        if(user === seller){
            $(this).removeAttr('data-target');
            alert("Không thể đấu giá sản phẩm của mình")
            return
        }
    })
    // Đánh giá người bán
    $("#up").click(function (e) {
        if($("#user").text() === ""){
            $(this).removeAttr('data-target');
            alert("You have to loggin first to comment seller !!")       
            return
        }
        point = 1
    })

    $("#down").click(function(e){
        if($("#user").text() === ""){
            $(this).removeAttr('data-target');
            alert("You have to loggin first to comment seller !!")       
            return
        }
        point = 0
    })
    // Gửi nhận xét người bán
    $('.cmt-btn').click(function (e) {
       var data = {}
       data.sender = $("#user").text()
       data.name = $("#seller").text()
       data.comment = $("#comment").val()
       data.point = point

       $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/comment',						
            success: function(data) {
                console.log(data)                   
            }
        });
    })

    $('#btn_danh_muc').click(function (e) {
        var cate_id = $("#cate").val()
        var id = $("#id").text()
        var url = "http://localhost:8000/product/add/"+cate_id+"/"+id
        window.location.replace(url)
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

function bid(gia_hien_tai,buoc_gia) {
    var value = parseInt(document.getElementById('number').value, 10);
    if(value < gia_hien_tai + buoc_gia) {
        alert("Bước giá thấp hơn qui định")
        return
    }

    var d = new Date();
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var day = d.getDate() 
    var h = d.getHours()
    var mi = d.getMinutes()
    var s = d.getSeconds()
    var n = y+"-"+m+"-"+day+" "+h+":"+mi+":"+s

    var data = {}
    var url = window.location.pathname.split("/")
    var id = url[2]
  
    data.Gia_Hien_Tai = value
    data.bidder = $("#user").text();
    data.thoi_diem = n

    $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/auction/'+id,						
        success: function(data) {
            alert(data);         
            if(data === "Giá không hợp lệ !!!"){
                location.reload()
            }             
        }
    });

    var data = {}
    data.product_id = $("#product_id").text()
    var id = $("#id").text()

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/auction/' + id,						
        success: function(data) {
            location.reload()     
        }
    });
}