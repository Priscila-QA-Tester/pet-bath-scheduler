const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { expect } = require('@playwright/test');

let browser;
let page;

// O 'Given' abre o site
// O 'Given' abre o site
Given('I navigate to the Pet Spa home page', async function () {
  // Se estiver na Nuvem (CI), roda invisível (headless: true). Se estiver no seu PC, abre a tela!
  const isCI = process.env.CI === 'true';
  browser = await chromium.launch({ headless: isCI }); 
  
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

// Os 'When' preenchem o formulário
When('I fill the Pet Owner field with {string}', async function (ownerName) {
  await page.fill('#owner-input', ownerName);
});

When('I fill the Phone field with {string}', async function (phone) {
  await page.fill('#phone-input', phone);
});

When('I fill the Pet Name field with {string}', async function (petName) {
  await page.fill('#pet-input', petName);
});

When('I fill the Breed field with {string}', async function (breed) {
  await page.fill('#breed-input', breed);
});

When('I fill the Weight field with {string}', async function (weight) {
  await page.fill('#weight-input', weight);
});

When('I set a valid business date', async function () {
  await page.fill('#date-input', '2026-10-15'); // Uma data fixa no futuro para teste
});

When('I select the time {string}', async function (time) {
  await page.selectOption('#time-input', time);
});

When('I select the service {string}', async function (service) {
  await page.selectOption('#service-input', service);
});

When('I check the aggressive pet checkbox', async function () {
  await page.check('#aggressive-input');
});

When('I click on Confirm Appointment', async function () {
  await page.click('#submit-button');
});

// Os 'Then' fazem as verificações (Asserts) para garantir que deu certo
Then('I should see the success toast message {string}', async function (message) {
  // Espera a mensagem de sucesso aparecer na tela
  const toast = page.locator('.bg-green-100');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText(message);
});

Then('the appointment for pet {string} owned by {string} with phone {string} should be displayed', async function (petName, ownerName, phone) {
  // Filtramos o card que contém o Nome do Pet E o Nome do Dono E o Telefone.
  // Como você rodou o teste várias vezes, a Priscila foi criada várias vezes no site! 
  // Então usamos o .first() no final para pegar a primeira cópia exata dela.
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .filter({ hasText: ownerName })
    .filter({ hasText: phone })
    .first();
  
  await expect(petCard).toBeVisible();
});

Then('the service {string} should be displayed on the appointment card for {string} owned by {string}', async function (service, petName, ownerName) {
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .filter({ hasText: ownerName })
    .first();
    
  await expect(petCard).toContainText(service);
});

Then('the appointment for {string} should be displayed in the schedule list', async function (petName) {
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .first();

  await expect(petCard).toBeVisible();
});

Then('the service {string} should be displayed on the {string} appointment card', async function (service, petName) {
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .first();

  await expect(petCard).toContainText(service);
});

Then('I should see the error toast message {string}', async function (message) {
  const toast = page.locator('.bg-red-100');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText(message);
});


After(async function () {
  if (browser) {

    await page.waitForTimeout(2000); 
    await browser.close();
  }
});
When('I set a weekend date', async function () {
  const dataAlvo = new Date(); // Pega o dia de hoje
  
  // Enquanto o dia da semana não for Sábado (dia da semana = 6), adiciona mais 1 dia
  while (dataAlvo.getDay() !== 6) {
    dataAlvo.setDate(dataAlvo.getDate() + 1);
  }
  
  // Formata a data no formato que o calendário do site espera: AAAA-MM-DD
  const ano = dataAlvo.getFullYear();
  const mes = String(dataAlvo.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
  const dia = String(dataAlvo.getDate()).padStart(2, '0');
  
  const dataFimDeSemana = `${ano}-${mes}-${dia}`;
  
  // Agora preenche o campo com esse sábado dinâmico do futuro!
  await page.fill('#date-input', dataFimDeSemana);
});