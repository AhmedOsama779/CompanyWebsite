
async function getAbout(req, res, next) {
    await res.send('About us');
}


module.exports = {getAbout};