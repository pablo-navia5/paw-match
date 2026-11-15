import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePetPageComponent } from './create-pet-page';

describe('CreatePetPage', () => {
  let component: CreatePetPageComponent;
  let fixture: ComponentFixture<CreatePetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePetPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePetPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
