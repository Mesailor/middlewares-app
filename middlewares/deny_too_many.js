const time = 60000;
const visitsCount = new Map();

module.exports = function (req, res, next) {
    const ip = req.ip;
    const count = visitCounter(ip);

    if (count > 3) {
        return res.status(429).send(429);
    }
    else {
        next();
    }
}

function visitCounter(ip) {
    let count = visitsCount.get(ip);
    if (count) {
        count++;
        visitsCount.set(ip, count);
        return count;
    }
    else {
        setTimeout(() => {
            visitsCount.delete(ip);
            console.log('ip deleted from map')
        }, time)
        count = 1;
        visitsCount.set(ip, count);
        return count;
    }   
}