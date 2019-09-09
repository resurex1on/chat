    let val = localStorage.getItem('key')

    if(val === null){
        location.replace('logIn.html')
    }else{
        let value = await fetch("/getData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: val
            })  
        })
        let data = await value.json()
    }

    $("#btnSend").click(async function () {
        let value = await fetch("/send", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:localStorage.getItem('key')
            })  
        })
        let id = await value.json()
        
        if(id !== undefined){
            location.replace('/index.html')
            localStorage.setItem('key', id)
        }
        
    })


