$(document).ready(function(){
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    ClassicEditor
    .create( document.querySelector( '#editor' ) )
    .then( editor => {
            console.log( editor );
    } )
    .catch( error => {
            console.error( error );
    } );


    $("#datepicker").datepicker({         
        "autoclose": true,         
        "format":"yyyy-mm-dd"
    })
    $("#date").click(function(e){
        $(this).attr("readonly","true")
    })

    $("#Submit").click(function(e){
        var file = $("#files")
        var numFiles = file[0].files.length
        if(numFiles < 3){
            alert("Đăng ít nhất 3 ảnh")
            return false;
        }
        var data ={}
        data.name = $("#name").text()
        data.price = $("#price").text()
        data.step = $("#step").text()
        data.category = $("#category option:selected").attr('id')

        var date = $("#datepicker").datepicker("getDate")
        var hour = $("#hour option:selected").text()
        var min = $("#min option:selected").text()
        var year = date.getFullYear()  
        var month = date.getMonth()+1  
        var day = date.getDate()
        date = year+"-"+month+"-"+day
        data.date_end = date + " "+ hour+":"+min

        
        date = new Date()
        year = date.getFullYear()  
        month = date.getMonth()+1  
        day = date.getDate() 
        hour = date.getHours()
        min = date.getMinutes()
        date = year+"-"+month+"-"+day
        data.date_begin = date + " "+ hour+":"+min

        data.description = $("#editor").text()
        var url = window.location.pathname.split("/")
        data.Seller = url[3]
        
        $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/product/add/'+data.Seller,						
        success: function(data) {
            alert(data);                        
        }
    });
    })


})
