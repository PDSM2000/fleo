const base = "https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc&page=1&per_page="
const fetchData = async function (options) {
    console.log(arguments)
    let option;
    if (typeof arguments[0] == typeof Function)
        option = arguments[1];
    else
        option = arguments[0];
    let { perPage, ascdsc, sort, page, language } = option
    let perPageNumber = 10;
    if (!isNaN(perPage)) {
        perPageNumber = parseInt(perPage)
    }

    if (!language)
        language = "cpp"
    let baseUrl = `https://api.github.com/search/repositories?q=language:${language}&order=${ascdsc}&page=${page}&per_page=${perPageNumber}&sort=${sort}`
    return fetch(baseUrl, {
        method: 'GET',
    }).then(res => {
        if (res.ok)
            return res.json()
        else {
            throw new Error('error');
        }
    }).then(res => {
        if (typeof arguments[0] == typeof Function) {
            if (res?.items?.length) {
                arguments[0](res?.items)
            }
        }
        return res
    }).catch(err => console.log())
}

function debounce(fn, delay) {
    let ref;
    return function () {
        let self = this;
        let argument = arguments;
        clearInterval(ref)
        ref = setTimeout(() => fn.apply(self, argument), delay);
    }
}

export { fetchData, debounce }