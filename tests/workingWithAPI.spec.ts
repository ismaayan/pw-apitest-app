import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach( async ({ page }) => {
  await page.route('*/**/api/tags', async route => {

      await route.fulfill({
        body: JSON.stringify(tags)
    })

  }) 

  
    await page.goto('https://conduit.bondaracademy.com/');
})
  

test('has title', async ({ page }) => {
    await page.route('*/**/api/articles*', async route => {
      const response = await route.fetch()
      const responseBody = await response.json()
      responseBody.articles[0].title = 'This is a MOCK test title'
      responseBody.articles[0].description = 'This is a MOCK test description' 
  
  
        await route.fulfill({
          body: JSON.stringify(responseBody)
      })
    })
  
    await page.getByText(' Global Feed ').click()  
    await expect (page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('.sidebar')).toContainText('Automation');
    await expect (page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title')
    await expect (page.locator('app-article-list p').first()).toContainText('This is a MOCK test description')
      
})

test ('delete artical', async({page, request}) => {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login/', {
      data: {
        "user" : {"email" : "maayanis@test.com", "password" : "1020304050"}
   

      }
    })

    const responseBody = await response.json()
    const accessToken = responseBody.user.token
    console.log('token:', accessToken)

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
      data: {
        "article" : {"title": "this a test title", "description": "this is a test descrption", "body": "this is a test body"}
      
        },
      headers : {
        Authorization : 'Token ${accessToken}'

      }
    })
    expect(articleResponse.status()).toEqual(201)


  })
  




