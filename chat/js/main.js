let val = localStorage.getItem('key')

async function getData(val) {
    if (val === null || val === undefined) {
        location.replace('logIn.html')
    } else {
        let value = await  fetch("/getData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: val
            })
        })
        return await value.json()
    } 
}   



