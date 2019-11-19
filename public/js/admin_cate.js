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
        var rows = $("#myTable").find("tr").length;
        var table = $("#myTable");
        table.find('tbody').append("<tr>");
        if(rows % 2 == 1){
            table.find('tbody').find("tr").last().append("<td contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9'>"+rows+"</td>");
            table.find('tbody').find("tr").last().append("<td class='editRow' contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9'></td>");
            table.find('tbody').find("tr").last().append("<td style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9'>"+
                '<select name="level">'+
                    '<option value="Bidder">Bidder</option>'+
                    '<option value="Seller">Seller</option>'+                     
                '</select>'+
            "</td>");
            table.find('tbody').find("tr").last().append("<td class='editRow' contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9'></td>");
            table.find('tbody').find("tr").last().append('<td class="editRow" style="padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9"><a href="#" class="edit" title="Edit" data-toggle="tooltip" "><i class="material-icons">&#xE254;</i></a><a href="#" class="delete" title="Delete" data-toggle="tooltip" style="padding-left:5px"><i class="material-icons">&#xE872;</i></a></td>');
        }
        else{
            table.find('tbody').find("tr").last().append("<td contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd'>"+rows+"</td>");
            table.find('tbody').find("tr").last().append("<td class='editRow' contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd'></td>");
            table.find('tbody').find("tr").last().append("<td style='padding:8px;padding-left:8px;border-top: 1px solid #ddd'>"+
                '<select name="level">'+
                    '<option value="Bidder">Bidder</option>'+
                    '<option value="Seller">Seller</option>'+                     
                '</select>'+
            "</td>");
            table.find('tbody').find("tr").last().append("<td class='editRow' contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd'></td>");
            table.find('tbody').find("tr").last().append('<td class="editRow" style="padding:8px;padding-left:8px;border-top: 1px solid #ddd"><a href="#" class="edit" title="Edit" data-toggle="tooltip" "><i class="material-icons">&#xE254;</i></a><a href="#" class="delete" title="Delete" data-toggle="tooltip" style="padding-left:5px"><i class="material-icons">&#xE872;</i></a></td>');
        }        
       table.find('tbody').append("</tr>");
    })

    $(".add").click(function(e){
        if(is_add != 0) return;
        is_add += 1;
        var rows = $("#myTable").find("tr").length;
        var table = $("#myTable");
        table.find('tbody').append("<tr>");
        if(rows % 2 == 1){
            table.find('tbody').find("tr").last().append("<td contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9'>"+rows+"</td>");
            table.find('tbody').find("tr").last().append("<td class='editRow' contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9'></td>");
            table.find('tbody').find("tr").last().append('<td class="editRow" style="padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9"><a href="#" class="edit" title="Edit" data-toggle="tooltip" "><i class="material-icons">&#xE254;</i></a><a href="#" class="delete" title="Delete" data-toggle="tooltip" style="padding-left:5px"><i class="material-icons">&#xE872;</i></a></td>');
        }
        else{
            table.find('tbody').find("tr").last().append("<td contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd'>"+rows+"</td>");
            table.find('tbody').find("tr").last().append("<td class='editRow' contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd'></td>");
            table.find('tbody').find("tr").last().append('<td class="editRow" style="padding:8px;padding-left:8px;border-top: 1px solid #ddd"><a href="#" class="edit" title="Edit" data-toggle="tooltip" "><i class="material-icons">&#xE254;</i></a><a href="#" class="delete" title="Delete" data-toggle="tooltip" style="padding-left:5px"><i class="material-icons">&#xE872;</i></a></td>');
        }        
       table.find('tbody').append("</tr>");
    })
    

});
