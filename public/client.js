function update_status(status)
{
    document.getElementById("status").innerText = status;
}

function fetch_onMessage()
{
    console.log("clicked on");

    fetch('/clickon', {method: 'POST'})
    .then(async response => {
        let text = await response.text();
        console.log(`Text: ${text}`);
        update_status(text);
    })
    .catch(e => {
        console.log(e);
    });
}

function fetch_offMessage()
{
    console.log("clicked off");

    fetch('/clickoff', {method: 'POST'})
    .then(async response => {
        let text = await response.text();
        console.log(`Text: ${text}`);
        update_status(text);
    })
    .catch(e => {
        console.log(e);
    });
}

function close_connection()
{
    console.log("closing connection");

    fetch('/clickclose', {method: 'POST'})
    .then(res => {
        console.log("sent close message");
    })
    .catch(e => {
        console.log(e);
    });
}