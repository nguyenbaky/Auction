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
        "format":"dd-mm-yyyy"
    })
    $("#date").click(function(e){
        $(this).attr("readonly","true")
    })
})

function validate() {
    var file = $("#files")
    var numFiles = file[0].files.length
    if(numFiles < 3){
        alert("Đăng ít nhất 3 ảnh và nhiều nhất 5 ảnh !!")
        return false;
    }
    return true
}
