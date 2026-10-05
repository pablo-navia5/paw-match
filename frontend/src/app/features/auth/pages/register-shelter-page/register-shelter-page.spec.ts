import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterShelterPage } from './register-shelter-page';

describe('RegisterShelterPage', () => {
  let component: RegisterShelterPage;
  let fixture: ComponentFixture<RegisterShelterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterShelterPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterShelterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
