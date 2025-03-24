
import { test, expect } from '@playwright/test';

test.use({
    browserName: ('chromium', 'firefox', 'webkit'),
    headless: true,
});

/*test.beforeEach(async ({ page }) => {
    await page.goto('https://front.serverest.dev/cadastrarusuarios');

    await page.fill('input[id="nome"]', 'Nome Teste 2', { delay: 100 });
    await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
    await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
    
    await page.click('id=administrador');
    await page.click('.btn-primary');

    await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
    const errorMessage = await page.textContent('.alert span:not(button span)');
    expect(errorMessage).toContain('Cadastro realizado com sucesso');
});*/

test('Login com sucesso', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
    
  await page.click('.btn');
  
  await page.waitForTimeout(20000)

  const url = await page.url();
  expect(url).toBe('https://front.serverest.dev/admin/home');
});
  
test('Login sem email', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });
    
  await page.click('.btn');
  
  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Email é obrigatório');
});

test('Login sem senha', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
  
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
    
  await page.click('.btn');
  
  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Password é obrigatório');
});

test('Login sem informar dados', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
    
  await page.click('.btn');
  
  const expectedMessages = [
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

test('Login errando dados', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
    
  await page.fill('input[id="email"]', 'emailteste2@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', '11111111', { delay: 100 });

  await page.click('.btn');
    
  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Email e/ou senha inválidos');
});

test('Login com usuario nao registrado', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');
    
  await page.fill('input[id="email"]', 'emailteste5@gmail.com', { delay: 100 });
  await page.fill('input[id="password"]', 'senhateste1', { delay: 100 });

  await page.click('.btn');
    
  await page.waitForSelector('.alert span:not(button span)', { state: 'visible' });
  const errorMessage = await page.textContent('.alert span:not(button span)');
  expect(errorMessage).toContain('Email e/ou senha inválidos');
});