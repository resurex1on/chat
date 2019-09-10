let val = localStorage.getItem('key')

if (val === null || val === undefined) {
    location.replace('logIn.html')
} else {
    let value =  fetch("/getData", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: val
        })
    })
}

async function getData(){
    let data = await fetch("/getData", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: localStorage.getItem('key')
        })
    })
    data = data.json()
}

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

