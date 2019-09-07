$("#btnSign").click(function () {
    if ($("#inppas").val() === $("#inpsub").val()) {
        fetch("/signUp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: $("#inplog").val(),
                password: $("#inppas").val()
            })
        })
    }
    else {

        alert('Passwords do not match!')
    }

})