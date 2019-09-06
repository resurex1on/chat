$("#btnLog").click(function(){
    var data = new FormData();
data.append( "json", JSON.stringify( payload ) );
    let data ={
        login: $("#inplog").text(),
       password: $("#inppas").text()
    }
   fetch("/",{
    method: "POST",
    body: data
})

})