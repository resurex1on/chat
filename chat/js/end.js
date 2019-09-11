let name = document.getElementById("userName")
let data = getData(val).then()

data.then(value => {
    for (let i = 0; i < value.friends.length; i++) {
        let chat = document.createElement('div')
        chat.id = 'chat'
        chat.classList.add('col')

        let chatAvatar = document.createElement('div')
        chatAvatar.id = 'chats-avatar'

        let lastMessage
        let nameFriend = document.createElement('h6')
        let img = document.createElement('img')
        nameFriend.id = 'nameFriend'
        img.id = 'chatAvatar'
        img.src = "https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg"
        img.classList = 'rounded-circle'
        nameFriend.textContent = value.friends[i]['name']
        chat.classList.add(value.friends[i]['id'])

        chatAvatar.appendChild(img)
        chat.appendChild(chatAvatar)
        chat.appendChild(nameFriend)

        document.getElementById("userName").innerHTML = value.user[0]['name']
        document.getElementById('friendList').appendChild(chat)
    }
})

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

$('body').on('click', '#chat', async function () {
    let value = await fetch("/getMessages", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: localStorage.getItem('key'),
            idFriend:(document.getElementById('chat').classList[1]),
            text: document.getElementById('chatPanel').text
        })
    })
    let data = await value.json()
})