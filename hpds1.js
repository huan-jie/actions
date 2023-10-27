const axios = require('axios')

let token = `ob_ru4rA-3jw4Senu6AOLCEYdVt0
    ob_ru4gKhCb-kEhE8-2umpY46fwk
    ob_ru4qM-fPxJFAompw9NChwgqpk
    ob_ru4mnMc3qLfyKTuhOEEbl6kMI
    ob_ru4hlav8akbk-DqrDlT7272aE
    ob_ru4suZlnegQWpP18W3BhHsrI4
    ob_ru4rNXqCrcCxVCEVxcmG9lGxQ`
let tokenArr = []
let userid = []
let httpResult = null


!(async () => {
    if (!await checkToken()) return
    console.log(`一共${tokenArr.length}个账号\n`)
    console.log(tokenArr)
    for (let index = 0; index < tokenArr.length; index++) {
        let openid = tokenArr[index]
        let userIndex = index + 1

        await getInfoNoSign(openid, userIndex)
        await sign(openid)
        await task1(openid)
        await task2(openid)
        await task3(openid)
        await task6(openid)
    }
    //await showmsg()

})().catch((e) => console.log('error: ', e))
    .finally(() => console.log('done'))

// 检查 token
async function checkToken() {
    if (token) {
        if (token.indexOf('@') > -1) {
            console.log('你使用的是@分割')
            let tokens = token.split('@')
            for (let i = 0; i < tokens.length; i++) {
                tokenArr.push(tokens[i])
            }
        } else if (token.indexOf('\n') > -1) {
            console.log('你使用的是\\n分割')
            let tokens = token.split('\n')
            for (let i = 0; i < tokens.length; i++) {
                tokenArr.push(tokens[i].trim())
            }
        } else {
            tokenArr.push(token)
        }
    } else {
        console.log('没有找到账号数据')
        return false
    }

    return true
}

// 获取用户信息
async function getInfoNoSign(openid, userIndex) {
    let url = `https://server.happy-ti.com/index.php?r=api/server/v1/integral/getinfonosign&openId=${openid}&app=QRCODEMINI&type=signin&saler=undefined`
    let urlObject = populateUrlObject(url)
   await httpRequest('get', urlObject)
    let result = httpResult

    console.log(`=============== 账号[${userIndex}] ===============`)
    console.log(`账号[${result.data.userid}]登录成功，积分${result.data.total}`)
}

// 签到 + 观看签到视频
async function sign(openid) {
    console.log('执行签到：')
    let url = `https://server.happy-ti.com/index.php?r=api/server/v1/integral/sign&openId=${openid}&app=QRCODEMINI&type=signin&saler=undefined`
    let urlObject = populateUrlObject(url)
    await httpRequest('get', urlObject)
    // let result = JSON.parse(httpResult)
    let result = httpResult

    if (result.code == 0) {
        console.log('签到成功\n')
        // 等待20~40秒
        let waitTime = Math.floor(Math.random() * 20000) + 20000
        console.log(`等待${waitTime / 1000}秒，然后执行观看签到视频：`)
        // await $.wait(waitTime)
        await delay(waitTime)

        let url2 = `https://server.happy-ti.com/index.php?r=api/server/v1/integral/done&openId=${openid}&app=QRCODEMINI&advId=undefined&type=task_8&check=1&saler=undefined`
        let urlObject2 = populateUrlObject(url2)
        await httpRequest('get', urlObject2)
        // let result2 = JSON.parse(httpResult)
        let result2 = httpResult

        if (result2.code == 0) {
            console.log('观看签到视频成功\n')
        } else {
            console.log(result.msg + '\n')
        }
    } else {
        console.log(result.msg + '\n')
    }
}

// 观看视频得积分（5次）
async function task1(openid) {
    let url = `https://server.happy-ti.com/index.php?r=api/server/v1/integral/done&openId=${openid}&app=QRCODEMINI&advId=adunit-0efa14d5619db2f2&type=task_1&check=1&saler=undefined`
    let urlObject = populateUrlObject(url)

    for (let i = 1; i <= 5; i++) {
        let waitTime = Math.floor(Math.random() * 20000) + 20000
        console.log(`等待${waitTime / 1000}秒，执行第${i}次观看视频得积分：`)
        // await $.wait(waitTime)
        await delay(waitTime)

        await httpRequest('get', urlObject)
        let result = httpResult
        
        if (result.code == 0) {
            console.log('获取积分成功\n')
        } else {
            console.log(result.msg + '，退出任务\n')
            break
        }
    }
}

// 收取福利（5次）
async function task2(openid) {
    let url = `https://server.happy-ti.com/index.php?r=api/server/v1/integral/done&openId=${openid}&app=QRCODEMINI&advId=adunit-e0ca101cd6c49786&type=task_2&check=1&saler=undefined`
    let urlObject = populateUrlObject(url)

    for (let i = 1; i <= 5; i++) {
        let waitTime = Math.floor(Math.random() * 20000) + 20000
        console.log(`等待${waitTime / 1000}秒，执行第${i}次收取福利：`)
        // await $.wait(waitTime)
        await delay(waitTime)

        await httpRequest('get', urlObject)
        let result = httpResult

        if (result.code == 0) {
            console.log('获取积分成功\n')
        } else {
            console.log(result.msg + '，退出任务\n')
            break
        }
    }
}

// 轻松一下（5次）
async function task3(openid) {
    let url = `https://server.happy-ti.com/index.php?r=api/server/v1/integral/done&openId=${openid}&app=QRCODEMINI&advId=adunit-b1ceff4cd76ae605&type=task_3&check=1&saler=undefined`
    let urlObject = populateUrlObject(url)

    for (let i = 1; i <= 5; i++) {
        let waitTime = Math.floor(Math.random() * 20000) + 20000
        console.log(`等待${waitTime / 1000}秒，执行第${i}次轻松一下：`)
        // await $.wait(waitTime)
        await delay(waitTime)

        await httpRequest('get', urlObject)
        let result = httpResult

        if (result.code == 0) {
            console.log('获取积分成功\n')
        } else {
            console.log(result.msg + '，退出任务\n')
            break
        }
    }
}

// 赢取更多福利（5次）
async function task6(openid) {
    let url = `https://server.happy-ti.com/index.php?r=api/server/v1/integral/done&openId=${openid}&app=QRCODEMINI&advId=adunit-bd160b617c13a181&type=task_6&check=1&saler=undefined`
    let urlObject = populateUrlObject(url)

    for (let i = 1; i <= 5; i++) {
        let waitTime = Math.floor(Math.random() * 20000) + 20000
        console.log(`等待${waitTime / 1000}秒，执行第${i}次赢取更多福利：`)
        // await $.wait(waitTime)
        await delay(waitTime)
        
        await httpRequest('get', urlObject)
        let result = httpResult

        if (result.code == 0) {
            console.log('获取积分成功\n')
        } else {
            console.log(result.msg + '，退出任务\n')
            break
        }
    }
}

function populateUrlObject(url, body = '') {
    let urlObject = {
        url: url,
        headers: {
            "Accept-Encoding": "gzip,compress,br,deflate",
            "Connection": "keep-alive",
            "Host": "server.happy-ti.com",
            "Content-Type": "application/json",
            "Referer": "https://servicewechat.com/wx41fee98a1835ec1c/99/page-frame.html",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.25(0x18001927) NetType/WIFI Language/en"
        }
    }
    if (body) urlObject.body = body
    return urlObject;
}

async function httpRequest(method, urlObject) {
    httpResult = null
    return new Promise((resolve) => {
        axios.get(urlObject.url, {
            headers:　urlObject.headers
        }).then(response => {
            console.log(response.data)
            httpResult = response.data
            resolve()
        }).catch(err => {
            console.log(err)
        })
    })

    // return new Promise((resolve) => {
    //     $[method](url, async (err, resp, data) => {
    //         try {
    //             if (err) {
    //                 console.log(`${method}请求失败`);
    //                 console.log(JSON.stringify(err));
    //             } else {
    //                 httpResult = resp;
    //             }
    //         } catch (e) {
    //           console.log(e)
    //         } finally {
    //             resolve();
    //         }
    //     });
    // });
}

async function delay(ms) {
    return new Promise ((resolve) => {
        setTimeout(resolve, ms)
    })
}
