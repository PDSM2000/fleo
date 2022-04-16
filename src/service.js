const baseUrl = "https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc&page=1&per_page=10"
export async function fetchData() {
    return fetch(baseUrl, {
        method: 'GET',
    }).then(res => {
        if (res.ok)
            return res.json()
        else {
            throw new Error('error');
        }
    }).then(res => {
        return res
    })
}
