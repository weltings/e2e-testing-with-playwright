import { test, expect } from '@playwright/test';

test.describe('isolated tests', () => {
  test('add', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('link', { name: 'add' }).click();
    await page.getByLabel('Title').fill('Smells like teen spirit');
    await page.getByLabel('Artist').fill('Nirvana');
    await page.getByLabel('Genre').fill('Hardrock');
    await page.getByLabel('Album', { exact: true }).fill('Nevermind');
    await page.getByLabel('Album Image Url').fill('www.google.com');
    await page.getByLabel('YouTube ID').fill('www.youtube.nl');
    await page.getByLabel('Tab').fill('main');
    await page.getByLabel('Lyrics').fill('yeah yeah');
    await page.getByRole('button', { name: 'Create Song' }).click();
    await expect(page.getByRole('main')).toContainText('Smells like teen spirit');
    // await page.goto('http://localhost:8081/reset')
  });

  test('change', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('link', { name: 'add' }).click();
    await page.getByLabel('Title').fill('Smells like teen spirit');
    await page.getByLabel('Artist').fill('Nirvana');
    await page.getByLabel('Genre').fill('Hardrock');
    await page.getByLabel('Album', { exact: true }).fill('Nevermind');
    await page.getByLabel('Album Image Url').fill('www.google.com');
    await page.getByLabel('YouTube ID').fill('www.youtube.nl');
    await page.getByLabel('Tab').fill('main');
    await page.getByLabel('Lyrics').fill('yeah yeah');
    await page.getByRole('button', { name: 'Create Song' }).click();
    await expect(page.getByRole('main')).toContainText('Smells like teen spirit');
  
    await page.goto('http://localhost:8080/');
    await page.goto('http://localhost:8080/#/');
    await page.goto('http://localhost:8080/#/songs');
    await page.locator('div:nth-child(6) > .layout > div > .cyan').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByLabel('Tab').click();
    await page.getByLabel('Tab').fill('main updated updated');
    await page.getByRole('button', { name: 'Save Song' }).click();
    // await page.goto('http://localhost:8081/reset')
  });
});


test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  await page.goto('http://localhost:8081/reset')

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});