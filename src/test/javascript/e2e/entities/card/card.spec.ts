import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CardComponentsPage, { CardDeleteDialog } from './card.page-object';
import CardUpdatePage from './card-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Card e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cardComponentsPage: CardComponentsPage;
  let cardUpdatePage: CardUpdatePage;
  let cardDeleteDialog: CardDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Cards', async () => {
    await navBarPage.getEntityPage('card');
    cardComponentsPage = new CardComponentsPage();
    expect(await cardComponentsPage.getTitle().getText()).to.match(/Cards/);
  });

  it('should load create Card page', async () => {
    await cardComponentsPage.clickOnCreateButton();
    cardUpdatePage = new CardUpdatePage();
    expect(await cardUpdatePage.getPageTitle().getAttribute('id')).to.match(/climbingzone3App.card.home.createOrEditLabel/);
    await cardUpdatePage.cancel();
  });

  it('should create and save Cards', async () => {
    async function createCard() {
      await cardComponentsPage.clickOnCreateButton();
      await cardUpdatePage.setTitleInput('title');
      expect(await cardUpdatePage.getTitleInput()).to.match(/title/);
      await waitUntilDisplayed(cardUpdatePage.getSaveButton());
      await cardUpdatePage.save();
      await waitUntilHidden(cardUpdatePage.getSaveButton());
      expect(await cardUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCard();
    await cardComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await cardComponentsPage.countDeleteButtons();
    await createCard();

    await cardComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Card', async () => {
    await cardComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await cardComponentsPage.countDeleteButtons();
    await cardComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    cardDeleteDialog = new CardDeleteDialog();
    expect(await cardDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/climbingzone3App.card.delete.question/);
    await cardDeleteDialog.clickOnConfirmButton();

    await cardComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
