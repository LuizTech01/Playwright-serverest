
import { test, expect } from '@playwright/test';

test.use({
    browserName: ('chromium', 'firefox', 'webkit'),
    headless: false,
});

test.beforeEach(async ({ page }) => {
    await page.goto('https://front.serverest.dev/cadastrarusuarios');

    await page.fill('input[id="nome"]', 'Nome Teste 2', { delay: 100 });
    await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
    await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
    
    await page.click('id=administrador');
    await page.click('.btn-primary');

    await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
    const errorMessage = await page.textContent('.alert span:not(button span)');
    expect(errorMessage).toContain('Cadastro realizado com sucesso');
});

test('Cadastrar um usuario com sucesso', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  await page.click('.btn');

  await page.click('a:has-text("Cadastrar")');

  await page.fill('input[id="nome"]', 'Nome Teste 3', { delay: 100 });
  await page.fill('input[id="email"]', 'emailteste3@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste12', { delay: 100 });

  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForTimeout(20000)

  const url = await page.url();
  expect(url).toBe('https://front.serverest.dev/admin/listarusuarios');

  await expect(page.locator('table')).toContainText('Nome Teste 3');
});
  
test('Cadastrar um usuario sem nome', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  await page.click('.btn');

  await page.click('a:has-text("Cadastrar")');
  
  await page.fill('input[id="email"]', 'emailteste3@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste12', { delay: 100 });

  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Nome é obrigatório');
});

test('Cadastrar um usuario sem email', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  await page.click('.btn');

  await page.click('a:has-text("Cadastrar")');
  
  await page.fill('input[id="nome"]', 'Nome Teste 3', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste12', { delay: 100 });

  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Email é obrigatório');
});

test('Cadastrar um usuario sem senha', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  await page.click('.btn');

  await page.click('a:has-text("Cadastrar")');
  
  await page.fill('input[id="nome"]', 'Nome Teste 3', { delay: 100 });
  await page.fill('input[id="email"]', 'emailteste3@gmail.com', { delay: 100 });

  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Password é obrigatório');
});

test('Cadastrar usuario sem informar os dados', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  await page.click('.btn');

  await page.click('a:has-text("Cadastrar")');

  await page.click('id=administrador');
  await page.click('.btn-primary');

  const expectedMessages = [
    'Nome é obrigatório',
    'Email é obrigatório',
    'Password é obrigatório'
  ];

  for (let i = 0; i < expectedMessages.length; i++) {
    const alertSelector = `.alert:nth-of-type(${i + 1}) span:not(button span)`;
    await page.waitForSelector(alertSelector, { state: 'visible' });
    const errorMessage = await page.textContent(alertSelector);
    expect(errorMessage).toContain(expectedMessages[i]);
  }
});