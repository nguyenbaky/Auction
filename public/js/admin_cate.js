$(document).ready(function(){
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
        $(this).closest("tr").find(".editRow").attr('contenteditable','true');
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

    $(".save").click(function(e){

    })

    $(".add").click(function(e){
        var cols = $("#myTable").find("th").length;
        var rows = $("#myTable").find("tr").length;
        var table = $("#myTable");
        table.find('tbody').append("<tr>");
        if(rows % 2 == 1){
            table.find('tbody').find("tr").last().append("<td contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9'>"+rows+"</td>");
        }
        else{
            table.find('tbody').find("tr").last().append("<td contenteditable='true' style='padding:8px;padding-left:8px;border-top: 1px solid #ddd'>"+rows+"</td>");
        }

        for(var i = 1;i < cols - 1;i++){
            if(rows % 2 == 1){
                table.find('tbody').find("tr").last().append("<td style='padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9' contenteditable='true'></td>");
            }
            else{
                table.find('tbody').find("tr").last().append("<td style='padding:8px;padding-left:8px;border-top: 1px solid #ddd' contenteditable='true'></td>");
            }
        }

        if(rows % 2 == 1){
            table.find('tbody').find("tr").last().append('<td style="padding:8px;padding-left:8px;border-top: 1px solid #ddd;background-color:#f9f9f9"><a href="#" class="edit" title="Edit" data-toggle="tooltip" "><i class="material-icons">&#xE254;</i></a><a href="#" class="delete" title="Delete" data-toggle="tooltip" style="padding-left:5px"><i class="material-icons">&#xE872;</i></a></td>');
        }
        else{
            table.find('tbody').find("tr").last().append('<td style="padding:8px;padding-left:8px;border-top: 1px solid #ddd"><a href="#" class="edit" title="Edit" data-toggle="tooltip" "><i class="material-icons">&#xE254;</i></a><a href="#" class="delete" title="Delete" data-toggle="tooltip" style="padding-left:5px"><i class="material-icons">&#xE872;</i></a></td>');
        }
       table.find('tbody').append("</tr>");

    })

    
});
