function fetch_onMessage()
{
    console.log("clicked on");

    fetch('/clickon', {method: 'POST'})
    .then(res => {
        console.log("sent on");
    })
    .catch(e => {
        console.log(e);
    });
}

function fetch_offMessage()
{
    console.log("clicked off");

    fetch('/clickoff', {method: 'POST'})
    .then(res => {
        console.log("sent off");
    })
    .catch(e => {
        console.log(e);
    });
}