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
    let id = await value.json()
    
    if(id !== undefined){
        location.replace('/index.html')
        localStorage.setItem('key', id)
    }
    
})