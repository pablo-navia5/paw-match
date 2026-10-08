import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShelterProfilePage } from './shelter-profile-page';

describe('ShelterProfilePage', () => {
  let component: ShelterProfilePage;
  let fixture: ComponentFixture<ShelterProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterProfilePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ShelterProfilePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
