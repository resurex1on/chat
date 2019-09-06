$("#btnLog").click(function () {
    fetch("/logIn", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            user:{
                login: $("#inplog").val(),
                password: $("#inppas").val()
            }
            
        })
    })

})