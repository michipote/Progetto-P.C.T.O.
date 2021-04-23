module.exports = {
    postData,
    getData
}

// POST: spedisce dei dati al server
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

// GET: recupero di dati dal server
async function getData(url = '') {
    const response = await fetch(url);
    return response.json();
}