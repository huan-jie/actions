const axios = require('axios')
let httpResult = null
let type = 2
let sourceId = 8
let courseSectionId = 47
let courseId = 18
let time = 240

!(async () => {
    for (let i = 0; i < 60; i++) {
        await delay(60000)
        await addLeanLog()
        time += 60
    }
})().catch((e) => console.log('error: ', e))
    .finally(() => console.log('done'))

async function addLeanLog() {
    let url = `https://api.peixun.ynhr.com/course-center/user/learn-log?type=${type}&sourceId=${sourceId}&courseSectionId=${courseSectionId}&courseId=${courseId}&time=${time}&lastPlayTime=${time}`
    let urlObject = populateUrlObject(url)
    httpResult　＝　await httpRequest('post', urlObject)
    let result = JSON.parse(httpResult.body)

    if (result.error == 0) {
        console.log('保存成功\n')
    } else {
        console.log(result.msg + '\n')
    }
}

function populateUrlObject(url, body = '') {
    let urlObject = {
        url: url,
        headers: {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnBlaXh1bi55bmhyLmNvbS8vdXNlci9hdXRoL3Ntcy1jb2RlIiwiaWF0IjoxNzAxMTMyODcwLCJleHAiOjE3MDEyMTkyNzAsIm5iZiI6MTcwMTEzMjg3MCwianRpIjoibUNXRjhRMTBxTXVsNUxFTCIsInN1YiI6IjEwNzE2IiwicHJ2IjoiYTVlMTkyODk5NWFkMmI4MmRiNTkyMDY5NjU3ODRmYmEyMGFlMDRmNCIsInVzZXJfdHlwZSI6NCwiY29tcGFueV9pZCI6MTN9.JbWn9u60wq3QOi-Dplu-pZ_Iq85P5VKDXF1qpcWlIRIngNlUskzSu9OXq11rslpsacT25plOhM9_x6DnsMj_Tw",
            "Content-Length": "0",
            "Origin": "https://peixun.ynhr.com",
            "Referer": "https://peixun.ynhr.com/",
            "sec-ch-ua": `"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"`,
            "sec-ch-ua-paltform": `"Windows"`,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    }
    if (body) urlObject.body = body
    return urlObject;
}

async function httpRequest(method, urlObject) {
    return new Promise((resolve) => {
        axios.post(urlObject.url, {
            headers:　urlObject.headers
        }).then(response => {
            console.log(response.data)
            resolve()
        }).catch(err => {
            console.log(err)
        })
    })
}

async function delay(ms) {
    return new Promise ((resolve) => {
        setTimeout(resolve, ms)
    })
}
