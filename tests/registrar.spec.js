
import { test, expect } from '@playwright/test';

test.use({
    browserName: ('chromium', 'firefox', 'webkit'),
    headless: true,
});

test('Registro com sucesso', async ({ page }) => {
  await page.goto('https://front.serverest.dev/cadastrarusuarios');

  await page.fill('input[id="nome"]', 'Nom3 Teste 1', { delay: 100 });
  await page.fill('input[id="email"]', 'emailmuitoteste1@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  
  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('a.alert-link', { state: 'visible' });
  const errorMessages = await page.textContent('a.alert-link');
  expect(errorMessages).toContain('Cadastro realizado com sucesso');
  
  await page.waitForURL('https://front.serverest.dev/admin/home', { timeout: 5000 });
  expect(page.url()).toBe('https://front.serverest.dev/admin/home');
});

test('Registrar novamente um usuario', async ({ page }) => {
  await page.goto('https://front.serverest.dev/cadastrarusuarios');

  await page.fill('input[id="nome"]', 'Nom3 Teste 1', { delay: 100 });
  await page.fill('input[id="email"]', 'emailmuitoteste1@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  
  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Este email já está sendo usado');
});

test('Registrar sem nome', async ({ page }) => {
  await page.goto('https://front.serverest.dev/cadastrarusuarios');

  await page.fill('input[id="nome"]', '', { delay: 100 });
  await page.fill('input[id="email"]', 'emailteste1@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  
  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Nome é obrigatório');
});

test('Registrar sem email', async ({ page }) => {
  await page.goto('https://front.serverest.dev/cadastrarusuarios');

  await page.fill('input[id="nome"]', 'Nome Teste 1', { delay: 100 });
  await page.fill('input[id="email"]', '', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
  
  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Email é obrigatório');
});

test('Registrar sem senha', async ({ page }) => {
  await page.goto('https://front.serverest.dev/cadastrarusuarios');

  await page.fill('input[id="nome"]', 'Nome Teste 1', { delay: 100 });
  await page.fill('input[id="email"]', 'emailteste1@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', '', { delay: 100 });
  
  await page.click('id=administrador');
  await page.click('.btn-primary');

  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Password é obrigatório');
});

test('Registrar sem informar dados', async ({ page }) => {
  await page.goto('https://front.serverest.dev/cadastrarusuarios');
  
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