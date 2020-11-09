const puppeteer = require('puppeteer')

async function run(account, password) {
    try {
        
    } catch (error) {
        
    }
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width:1366,height:768}
    })
    const page = await browser.newPage()

    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator,'webdriver',{
            get: () => false
        })
    })

    
    await page.goto('https://login.aliexpress.com/?flag=1&return_url=http%3A%2F%2Fhome.aliexpress.com%2Fdropshippercenter%2Fproduct_find.htm#/search')
    await page.type('#fm-login-id', account)
    await page.type('#fm-login-password', password)
    await page.waitFor(2000)
    let element;
    try {
        element = await page.waitForSelector('#login-check-code',{ visible: true,timeout: 2000 })
    }  catch (e) {
        //console.log('Could NOT find a visible element ', e.message)
      }
    // 需要滑块验证
    if (element) {
        let sliderElement = await page.$('#nc_1_wrapper')
        if (sliderElement) {
            let slider = await sliderElement.boundingBox()
            let handleElement = await page.$('#nc_1_n1z')
            let handle = await handleElement.boundingBox()
            await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2)
            await page.mouse.down()
            await page.mouse.move(handle.x + slider.width,handle.y + handle.height / 2, {steps: 20})
            await page.mouse.up()
            await page.waitForFunction("document.querySelector('#nc_1__scale_text').innerText == 'Verified'")
        }
    }
 
    await page.click('.fm-button')
    await page.waitForNavigation()
    const cookies = await page.cookies()
    let result = '';
    cookies.forEach( (c) => {
        if (c.name == "xman_t") {
            console.log(c.value)
            result = c.value
        }
    })
    await browser.close();
    return result;
}
