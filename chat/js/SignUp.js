$("#btnSign").click(async function () {
    if ($("#inppas").val() === $("#inpsub").val()) {
        let value = await fetch("/signUp", {
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
        // console.log(value)
        if(id !== undefined){
            location.replace('/index.html')
            localStorage.setItem('key', id)
        }
    }
    else {
        alert('Passwords do not match!')
    }

})