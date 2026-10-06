import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShelterMatchesPage } from './shelter-matches-page';

describe('ShelterMatchesPage', () => {
  let component: ShelterMatchesPage;
  let fixture: ComponentFixture<ShelterMatchesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterMatchesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ShelterMatchesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
