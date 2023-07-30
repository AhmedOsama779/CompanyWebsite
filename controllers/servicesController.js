
async function getServices(req, res, next) {
    await res.send('Services');
}


module.exports = {getServices};