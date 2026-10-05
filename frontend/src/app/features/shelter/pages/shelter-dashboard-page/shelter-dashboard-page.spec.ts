import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShelterDashboardPage } from './shelter-dashboard-page';

describe('ShelterDashboardPage', () => {
  let component: ShelterDashboardPage;
  let fixture: ComponentFixture<ShelterDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ShelterDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
