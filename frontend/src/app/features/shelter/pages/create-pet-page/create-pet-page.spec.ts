import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePetPage } from './create-pet-page';

describe('CreatePetPage', () => {
  let component: CreatePetPage;
  let fixture: ComponentFixture<CreatePetPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePetPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePetPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
