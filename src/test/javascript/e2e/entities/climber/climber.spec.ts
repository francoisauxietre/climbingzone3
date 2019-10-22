import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClimberComponentsPage, { ClimberDeleteDialog } from './climber.page-object';
import ClimberUpdatePage from './climber-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Climber e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let climberComponentsPage: ClimberComponentsPage;
  let climberUpdatePage: ClimberUpdatePage;
  let climberDeleteDialog: ClimberDeleteDialog;

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

  it('should load Climbers', async () => {
    await navBarPage.getEntityPage('climber');
    climberComponentsPage = new ClimberComponentsPage();
    expect(await climberComponentsPage.getTitle().getText()).to.match(/Climbers/);
  });

  it('should load create Climber page', async () => {
    await climberComponentsPage.clickOnCreateButton();
    climberUpdatePage = new ClimberUpdatePage();
    expect(await climberUpdatePage.getPageTitle().getAttribute('id')).to.match(/climbingzone3App.climber.home.createOrEditLabel/);
    await climberUpdatePage.cancel();
  });

  it('should create and save Climbers', async () => {
    async function createClimber() {
      await climberComponentsPage.clickOnCreateButton();
      await climberUpdatePage.setFirstNameInput('firstName');
      expect(await climberUpdatePage.getFirstNameInput()).to.match(/firstName/);
      await climberUpdatePage.setLastNameInput('lastName');
      expect(await climberUpdatePage.getLastNameInput()).to.match(/lastName/);
      await climberUpdatePage.setBirthInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await climberUpdatePage.getBirthInput()).to.contain('2001-01-01T02:30');
      await climberUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await climberUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30');
      await climberUpdatePage.setModifiedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await climberUpdatePage.getModifiedAtInput()).to.contain('2001-01-01T02:30');
      await climberUpdatePage.setDeletedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await climberUpdatePage.getDeletedAtInput()).to.contain('2001-01-01T02:30');
      await climberUpdatePage.languageSelectLastOption();
      await climberUpdatePage.cardsSelectLastOption();
      await climberUpdatePage.openBySelectLastOption();
      // climberUpdatePage.friendsSelectLastOption();
      await waitUntilDisplayed(climberUpdatePage.getSaveButton());
      await climberUpdatePage.save();
      await waitUntilHidden(climberUpdatePage.getSaveButton());
      expect(await climberUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createClimber();
    await climberComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await climberComponentsPage.countDeleteButtons();
    await createClimber();

    await climberComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await climberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Climber', async () => {
    await climberComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await climberComponentsPage.countDeleteButtons();
    await climberComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    climberDeleteDialog = new ClimberDeleteDialog();
    expect(await climberDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/climbingzone3App.climber.delete.question/);
    await climberDeleteDialog.clickOnConfirmButton();

    await climberComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await climberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
