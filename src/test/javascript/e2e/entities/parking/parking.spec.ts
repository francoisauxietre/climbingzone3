import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ParkingComponentsPage, { ParkingDeleteDialog } from './parking.page-object';
import ParkingUpdatePage from './parking-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Parking e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parkingComponentsPage: ParkingComponentsPage;
  let parkingUpdatePage: ParkingUpdatePage;
  let parkingDeleteDialog: ParkingDeleteDialog;

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

  it('should load Parkings', async () => {
    await navBarPage.getEntityPage('parking');
    parkingComponentsPage = new ParkingComponentsPage();
    expect(await parkingComponentsPage.getTitle().getText()).to.match(/Parkings/);
  });

  it('should load create Parking page', async () => {
    await parkingComponentsPage.clickOnCreateButton();
    parkingUpdatePage = new ParkingUpdatePage();
    expect(await parkingUpdatePage.getPageTitle().getAttribute('id')).to.match(/climbingzone3App.parking.home.createOrEditLabel/);
    await parkingUpdatePage.cancel();
  });

  it('should create and save Parkings', async () => {
    async function createParking() {
      await parkingComponentsPage.clickOnCreateButton();
      await parkingUpdatePage.setNameInput('name');
      expect(await parkingUpdatePage.getNameInput()).to.match(/name/);
      await parkingUpdatePage.setDescriptionInput('description');
      expect(await parkingUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(parkingUpdatePage.getSaveButton());
      await parkingUpdatePage.save();
      await waitUntilHidden(parkingUpdatePage.getSaveButton());
      expect(await parkingUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createParking();
    await parkingComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await parkingComponentsPage.countDeleteButtons();
    await createParking();

    await parkingComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await parkingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Parking', async () => {
    await parkingComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await parkingComponentsPage.countDeleteButtons();
    await parkingComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    parkingDeleteDialog = new ParkingDeleteDialog();
    expect(await parkingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/climbingzone3App.parking.delete.question/);
    await parkingDeleteDialog.clickOnConfirmButton();

    await parkingComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await parkingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
