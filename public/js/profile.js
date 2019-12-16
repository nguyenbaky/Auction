$( document ).ready(function() {    
    $("#save").click(function(e){
        var data = {}
        data.username = $("#user_name").text()
        data.ho_ten = $("#name").text()
        data.email = $("#email").text()
        data.dia_chi = $("#address").text()
        if(data.username === "" || data.ho_ten === "" || data.email === "" || data.dia_chi === ""){
            alert("Nhập đủ thông tin")
            return
        }  
        var url = window.location.pathname.split("/")
        id = url[2]     
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/profile/'+id,						
            success: function(data) {
                alert(data);                       
            }
        });
    })

    $("#reset").click(function(e){
        $("#user_name").val("")
        $("#name").val("")
        $("#email").val("")
        $("#address").val("")
    })

    $("#change").click(function(e){
        var oldpassword = $("#oldpassword").text()
        var newpassword = $("#newpassword").text()
        var confirmnewpassword = $("#confirmnewpassword").text()
        if(oldpassword === "" || newpassword === "" || confirmnewpassword === ""){
            alert("Nhập đủ thông tin")
            return 
        }
        if(newpassword !== confirmnewpassword){
            alert("password not match")
            return
        }
        var data = {}
        data.password = newpassword
        data.oldpassword = oldpassword
        var url = window.location.pathname.split("/")
        id = url[2] 
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/change_password/'+id,						
            success: function(data) {
                alert(data);                       
            }
        });
    })
})