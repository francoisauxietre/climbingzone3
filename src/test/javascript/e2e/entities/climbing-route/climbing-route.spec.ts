import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClimbingRouteComponentsPage, { ClimbingRouteDeleteDialog } from './climbing-route.page-object';
import ClimbingRouteUpdatePage from './climbing-route-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ClimbingRoute e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let climbingRouteComponentsPage: ClimbingRouteComponentsPage;
  let climbingRouteUpdatePage: ClimbingRouteUpdatePage;
  let climbingRouteDeleteDialog: ClimbingRouteDeleteDialog;

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

  it('should load ClimbingRoutes', async () => {
    await navBarPage.getEntityPage('climbing-route');
    climbingRouteComponentsPage = new ClimbingRouteComponentsPage();
    expect(await climbingRouteComponentsPage.getTitle().getText()).to.match(/Climbing Routes/);
  });

  it('should load create ClimbingRoute page', async () => {
    await climbingRouteComponentsPage.clickOnCreateButton();
    climbingRouteUpdatePage = new ClimbingRouteUpdatePage();
    expect(await climbingRouteUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /climbingzone3App.climbingRoute.home.createOrEditLabel/
    );
    await climbingRouteUpdatePage.cancel();
  });

  it('should create and save ClimbingRoutes', async () => {
    async function createClimbingRoute() {
      await climbingRouteComponentsPage.clickOnCreateButton();
      await climbingRouteUpdatePage.setNameInput('name');
      expect(await climbingRouteUpdatePage.getNameInput()).to.match(/name/);
      await climbingRouteUpdatePage.setBonusInput('bonus');
      expect(await climbingRouteUpdatePage.getBonusInput()).to.match(/bonus/);
      await climbingRouteUpdatePage.setLatitudeInput('5');
      expect(await climbingRouteUpdatePage.getLatitudeInput()).to.eq('5');
      await climbingRouteUpdatePage.setLongitudeInput('5');
      expect(await climbingRouteUpdatePage.getLongitudeInput()).to.eq('5');
      await climbingRouteUpdatePage.setDifficutyInput('difficuty');
      expect(await climbingRouteUpdatePage.getDifficutyInput()).to.match(/difficuty/);
      await climbingRouteUpdatePage.setStarInput('5');
      expect(await climbingRouteUpdatePage.getStarInput()).to.eq('5');
      await climbingRouteUpdatePage.setPhysicalInput('5');
      expect(await climbingRouteUpdatePage.getPhysicalInput()).to.eq('5');
      await climbingRouteUpdatePage.setTechnicalInput('5');
      expect(await climbingRouteUpdatePage.getTechnicalInput()).to.eq('5');
      await climbingRouteUpdatePage.setTacticalInput('5');
      expect(await climbingRouteUpdatePage.getTacticalInput()).to.eq('5');
      await climbingRouteUpdatePage.setMentalInput('5');
      expect(await climbingRouteUpdatePage.getMentalInput()).to.eq('5');
      await climbingRouteUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await climbingRouteUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30');
      await climbingRouteUpdatePage.setModifiedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await climbingRouteUpdatePage.getModifiedAtInput()).to.contain('2001-01-01T02:30');
      await climbingRouteUpdatePage.setDeletedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await climbingRouteUpdatePage.getDeletedAtInput()).to.contain('2001-01-01T02:30');
      await climbingRouteUpdatePage.routeTypeSelectLastOption();
      await climbingRouteUpdatePage.zouneTypeSelectLastOption();
      await waitUntilDisplayed(climbingRouteUpdatePage.getSaveButton());
      await climbingRouteUpdatePage.save();
      await waitUntilHidden(climbingRouteUpdatePage.getSaveButton());
      expect(await climbingRouteUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createClimbingRoute();
    await climbingRouteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await climbingRouteComponentsPage.countDeleteButtons();
    await createClimbingRoute();

    await climbingRouteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await climbingRouteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ClimbingRoute', async () => {
    await climbingRouteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await climbingRouteComponentsPage.countDeleteButtons();
    await climbingRouteComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    climbingRouteDeleteDialog = new ClimbingRouteDeleteDialog();
    expect(await climbingRouteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/climbingzone3App.climbingRoute.delete.question/);
    await climbingRouteDeleteDialog.clickOnConfirmButton();

    await climbingRouteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await climbingRouteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
