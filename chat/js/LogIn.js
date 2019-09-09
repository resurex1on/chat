$("#btnLog").click(async function () {
    let value = await fetch("/logIn", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: $("#inplog").val(),
            password: $("#inppas").val()

        })  
    })
    let com = await value.json()
    if(com !== undefined){
        location.replace('/index.html')
    }
    
})