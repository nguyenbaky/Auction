$(document).ready(function(){
    var is_edit = 0;
    var is_add = 0;
	// Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
	// Filter table rows based on searched term
    $("#search").on("keyup", function() {
        var term = $(this).val().toLowerCase();
        $("table tbody tr").each(function(){
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
        if(is_edit != 0) {
            alert("Please save before edit another one");
            return;
        }
        is_edit = 1;
        $(this).closest("tr").addClass("edited");
        $(this).closest("tr").find(".editRow").attr('contenteditable','true');
        $(this).closest("tr").find('[name="level"]').removeAttr('disabled')
        $(this).closest("tr").find(".editRow").first().focus();        
    });

    $(document).on('click', '.delete', function(e) {
        e.preventDefault();
        if(confirm("Are you sure you want to delete this?")){
            $(this).closest("tr").remove();
        }
        else{
            return false;
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
        if(is_add === 0 && is_edit === 0) return;
        if(is_add !== 0) {
            is_add = 0;
            $("#myTable").find("tr").last().find("td").attr('contenteditable','false');
            $("#myTable").find("tr").last().find('[name="level"]').attr('disabled','disabled');
        }
        if(is_edit !== 0) {
            is_edit = 0;
            $("#myTable").find(".edited").find(".editRow").attr('contenteditable','false');
            $("#myTable").find(".edited").find('[name="level"]').attr('disabled','disabled');
        }
    })

    $(".add_user").click(function(e){
        if(is_add != 0) return;
        is_add += 1;
        $("table tbody").append("<tr>");
        $("table tbody").find("tr").last().append('<td>'+ rows+'</td>');
            $("table tbody").find("tr").last().append('<td contenteditable="true" class="editRow"></td>');
            $("table tbody").find("tr").last().append('<td>'+
            '<select name="level" disabled>'+
                '<option value="Bidder">Bidder</option>'+
                '<option value="Seller">Seller</option>'+                       
            '</select>'+
        '</td>');
        $("table tbody").find("tr").last().append('<td contenteditable="true" class="editRow"></td>');
        $("table tbody").find("tr").last().append('<td>'+
        '<a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
        '<a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
        '</td>');
        $("table tbody").find("tr").last().append("</tr>");
    })

    $(".add").click(function(e){
        if(is_add != 0){
            alert("Please save before add another one !!!");
            return;
        } 
        is_add += 1;
        var rows = $("#myTable").find("tr").length;
        $("table tbody").append("<tr>");
        $("table tbody").find("tr").last().append('<td>'+ rows+'</td>');
        $("table tbody").find("tr").last().append('<td contenteditable="true" class="editRow"></td>');
        $("table tbody").find("tr").last().append('<td>'+
        '<a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
        '<a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
        '</td>');
        $("table tbody").find("tr").last().append("</tr>");
    })
});
