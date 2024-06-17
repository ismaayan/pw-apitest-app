import { expect, test } from '@playwright/test'


test('like counter increase', async ({page}) => {
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText(' Global Feed ').click()
    const firstLikeButton = page.locator('app-article-preview').first().locator('button')

    await expect(firstLikeButton).toContainText('0')
    await firstLikeButton.waitFor()
    await firstLikeButton.click()
    await expect(firstLikeButton).toContainText('1')





})