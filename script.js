// Basics
const offset = 1, limit = 2;
const random = Math.floor(
    Math.random() * (limit + 1)
) + offset; // min: 1, max: 1 + 2 = 3
console.log('random', random);

document.getElementById('random').innerText = random;

let promise = new Promise((resolve, reject) => {
    if (random <= 5) resolve(random);
    else reject(random);
});

promise.then((response) => console.log('promise success', response))
    .catch((error) => console.log('promise failure', error));

function callPromise() {
    return new Promise((resolve, reject) => {
        if (random < 5) resolve(random);
        else reject(random);
    });
}

callPromise()
    .then(response => console.log('success callPromise', response))
    .catch(error => console.log('failure callPromise', error));

let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('promise1-random:', random);
        resolve('promise1');
    }, (random) * 1000);
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('promise2-random:', random);
        resolve('promise2');
    }, (random * 1.5) * 1000);
});

let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('promise3-random:', random);
        resolve('promise3');
    }, (random * 2) * 1000);
});

const startAll = performance.now();
Promise.all([promise1, promise2, promise3])
    .then(response => {
        const endAll = performance.now();
        console.log('all-time', Math.floor((endAll - startAll) / 1000) + ' seconds');
    }).catch(error => console.error(error));

const startRace = performance.now();
Promise.race([promise1, promise2, promise3])
    .then(response => {
        const endRace = performance.now();
        console.log('race-time', Math.floor((endRace - startRace) / 1000) + ' seconds');
    }).catch(error => console.error(error));

// UI
function generateRandomNumber() {
    const offset = 1, limit = 2;
    const random = Math.floor(
        Math.random() * (limit + 1)
    ) + offset; // min: 1, max: 1 + 2 = 3

    return random;
}

function getPromise() {
    const time = generateRandomNumber();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time);
        }, time * 1000);
    });
}

function setValue(field, value) {
    document.getElementById(field).innerText = value;
}

function callPromiseOne() {
    const promise = getPromise();

    setValue('promise-type', 'one');
    setValue('promise-count', 1);
    setValue('response-time', 'processing...');

    const start = performance.now();
    promise.then(response => {
        const end = performance.now();
        setValue('response-time', Math.floor((end - start) / 1000) + ' seconds');
    }).catch(error => console.error(error));
}

function callPromiseAll() {
    const promiseCount = 3;
    let promises = [];

    for (let i = 0; i < promiseCount; i++) {
        promises.push(getPromise());
    }

    setValue('promise-type', 'all');
    setValue('promise-count', promiseCount);
    setValue('response-time', 'processing...');

    const start = performance.now();
    Promise.all(promises)
        .then(response => {
            const end = performance.now();
            setValue('response-time', Math.floor((end - start) / 1000) + ' seconds');
        }).catch(error => console.error(error));
}

function callPromiseRace() {
    const promiseCount = 3;
    let promises = [];

    for (let i = 0; i < promiseCount; i++) {
        promises.push(getPromise());
    }

    setValue('promise-type', 'race');
    setValue('promise-count', promiseCount);
    setValue('response-time', 'processing...');

    const start = performance.now();
    Promise.race(promises)
        .then(response => {
            const end = performance.now();
            setValue('response-time', Math.floor((end - start) / 1000) + ' seconds');
        }).catch(error => console.error(error));
}
