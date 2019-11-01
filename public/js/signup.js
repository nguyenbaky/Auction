$( document ).ready(function() {
   
});

function check()
{
    var pw = document.getElementById("pw").value;
    var pw2 = document.getElementById("pw2").value;
    
    if(pw != pw2){
        alert("password not match !!!!");
        return false;
    }
   

}
 