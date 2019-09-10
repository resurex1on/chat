let val = localStorage.getItem('key')

async function getData(val) {
    if (val === null || val === undefined) {
        location.replace('logIn.html')
    } else {
        let value =await  fetch("/getData", {
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

let data = getData(val)

// $("#panel").




$("#btnSend").click(async function () {
    let value = await fetch("/send", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: localStorage.getItem('key'),
            idchat: document.getElementById('chatPanel').attributes['name'].value,
            text: document.getElementById('chatPanel').text
        })
    })
    let data = await value.json()
})

