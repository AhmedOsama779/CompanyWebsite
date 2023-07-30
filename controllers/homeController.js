
async function getHome(req, res, next) {
    await res.send('Home');
}


module.exports = {getHome};