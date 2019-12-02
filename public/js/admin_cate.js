$(document).ready(function(){
    var is_edit = 0;
    var is_add = 0;
	// Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();
	// Filter table rows based on searched term
    $("#search").on("keyup", function() {
        var term = $(this).val().toLowerCase();
        $("#myTable tr").each(function(){
            $row = $(this);
            var name = $row.find("td:nth-child(2)").text().toLowerCase();
            console.log(name);
            if(name.search(term) < 0){                
                $row.hide();
            } else{
                $row.show();
            }
        });
    });

    $(document).on('click', '.edit', function(e) {
        e.preventDefault();
        if(is_edit !== 0) {
            alert("Save trước khi edit thêm !!!");
            return;
        }

        if(is_add !== 0) {
            alert("Save trước khi add thêm !!!");
            return;
        }

        is_edit = 1;
        $(this).closest("tr").addClass("edited");
        $(this).closest("tr").find(".editRow").attr('contenteditable','true');
        $(this).closest("tr").find('[name="level"]').removeAttr('disabled')
        $(this).closest("tr").find(".editRow").first().focus();        
    });

    $(document).on('click', '.delete_category', function(e) {
        e.preventDefault();
        console.log(is_edit)
        console.log(is_add)
        if(is_edit !== 0){
            //// Kiem tra đang xóa cái đang edit hoac add hay không 
            if(!$(this).closest("tr").hasClass("edited")){
                alert("Edit trước khi xóa !!!");
                return;
            }
        }
        // Xoa cái đang add (khong can sua trong db)
        if($(this).closest("tr").find(".id").text() === ""){
            if(confirm("Bạn có chắc muốn xóa? ")){
                $(this).closest("tr").remove();
            }
            else{
                return false;
            }
        } // Xoa thay doi trong db 
        else{
            if(confirm("Bạn có chắc muốn xóa? ")){
                var data = {}
                data.id = $(this).closest("tr").find(".id").text();
                $.ajax({
                    type: 'DELETE',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: '/admin/category',						
                    success: function(data) {
                        alert(data);                                
                    }
                });

                $(this).closest("tr").remove();
            }
            else{
                return false;
            }  
        }
        is_edit = 0;
    });

    $(document).on('click', '.delete_user', function(e){
        e.preventDefault();
        if(confirm("Bạn có chắc muốn xóa? ")){
            var data = {}
            data.email = $(this).closest("tr").find('[name="email"]').text();
            $.ajax({
                type: 'DELETE',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/admin/users',						
                success: function(data) {
                    alert(data);                                
                }
            });
            $(this).closest("tr").remove();
        }
        
    });

    $(".accept").click(function(e){
        e.preventDefault();
        if(confirm("Accept request?")){
            $(this).closest("tr").remove();
        }
    })

    $(".decline").click(function(e){
        e.preventDefault();
        if(confirm("Decline request?")){
            $(this).closest("tr").remove();
        }
    })

    $(".save").click(function(e){
        console.log(is_add)
        if(is_add === 0 && is_edit === 0) return;
        
        // Kiểm tra chưa nhập thông tin 
        if(is_add !== 0) {
            $("#myTable").find("tr").last().find("td").attr('contenteditable','false');
            $("#myTable").find("tr").last().find('[name="level"]').attr('disabled','disabled');
        }

        if(is_edit !== 0) {
            if($("#myTable").find(".edited").find('[name="name"]').text() === "") {
                alert("Nhập đủ thông tin !!!");
                return;
            }
            $("#myTable").find(".edited").find(".editRow").attr('contenteditable','false');
            $("#myTable").find(".edited").find('[name="level"]').attr('disabled','disabled');
        }
    })

    $(".save_catergary").click(function(e){
        ///////////////////////////////////////// ADD ///////////////////////////////////
        if(is_add !== 0){     
            var data = {}
            data.name = $("#myTable").find("tr").last().find(".editRow").text();
            if(data.name === "") {
                alert("Nhập đủ thông tin !!!");
                $("#myTable").find("tr").last().find(".editRow").attr('contenteditable','true');
                $("#myTable").find("tr").last().find(".editRow").focus();
                return;
            }
            is_add = 0; 
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/admin/category',						
                success: function(data) {
                    alert(data);             
                    if(data === "Category đã tồn tại !!!"){
                        is_edit = 1;
                        $("#myTable").find("tr").last().addClass("edited");
                        $("#myTable").find("tr").last().find(".editRow").attr('contenteditable','true');
                        $("#myTable").find("tr").last().find(".editRow").first().focus();
                    }    
                    location.reload();                
                }
            });
        }

        ///////////////////////////////////////// EDIT //////////////////////////////////
        if(is_edit !== 0){
            is_edit = 0;
            console.log($("#myTable").find(".edited").find(".id").text());
            var data = {}
            data.name = $("#myTable").find(".edited").find(".editRow").text();
            data.id = $("#myTable").find(".edited").find(".id").text();
            $.ajax({
                type: 'PUT',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/admin/category',						
                success: function(data) {
                    alert(data);
                    if(data === "Category đã tồn tại !!!"){
                        is_edit = 1;
                        $("#myTable").find(".edited").find(".editRow").attr('contenteditable','true');
                        $("#myTable").find(".edited").find(".editRow").first().focus();
                    }
                    if(data === "Sửa thành công"){
                        $("#myTable").find(".edited").removeClass("edited");
                    }
                    location.reload();  
                }
            });
        }

       
    })

    $(".save_user").click(function (e) {
        if(is_edit !== 0){
            is_edit = 0
            var data = {}
            level = $("#myTable").find(".edited").find('[name="level"] option:selected').text();
            data.email = $("#myTable").find(".edited").find('[name="email"]' ).text();
            if(level === "Bidder") data.level = 1;
            else data.level = 2;
            $.ajax({
                type: 'PUT',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/admin/users',						
                success: function(data) {
                    alert(data);             
                    location.reload();                
                }
            });
            $("#myTable").find("tr").last().find('[name="level"]').attr("disabled","disabled");
        }
    })
    /// thêm category
    $(".add").click(function(e){
        if(is_add !== 0){
            alert("Save trước khi thêm !!!");
            return;
        } 
        if(is_edit !== 0){
            alert("Edit trước khi thêm !!!");
            return;
        }
        is_add += 1;
        var rows = $("#myTable").find("tr").length;
        $("#myTable").append("<tr>");
        $("#myTable").find("tr").last().append('<td>'+ rows+'</td>');
        $("#myTable").find("tr").last().append('<td></td>');
        $("#myTable").find("tr").last().append('<td name="name" contenteditable="true" class="editRow" tabindex="1"></td>');
        $("#myTable").find("tr").last().append('<td>'+
        '<a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
        '<a href="#" class="delete delete_category" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
        '</td>');
        $("#myTable").find("tr").last().append("</tr>");
        $("#myTable").find("tr").last().find(".editRow").focus();

    })

    $("[name='category']").click(function(e){
        e.preventDefault();
    })
});
