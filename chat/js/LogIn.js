$("#btnLog").click(function () {
    fetch("/logIn", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: $("#inplog").val(),
            password: $("#inppas").val()

        })
    })
})