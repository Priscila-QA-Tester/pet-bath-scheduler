import re
from playwright.sync_api import Page, expect

def test_has_title(page: Page):
    page.goto('https://playwright.dev/')
    
    # Verifica se o título contém a palavra Playwright
    expect(page).to_have_title(re.compile(r"Playwright"))

def test_get_started_link(page: Page):
    page.goto('https://playwright.dev/')
    
    # Clica no link Get started
    page.get_by_role('link', name='Get started').click()
    
    # Verifica se a página possui um cabeçalho com o nome Installation
    expect(page.get_by_role('heading', name='Installation')).to_be_visible()
