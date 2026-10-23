import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMatchesPage } from './user-matches-page';

describe('UserMatchesPage', () => {
  let component: UserMatchesPage;
  let fixture: ComponentFixture<UserMatchesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMatchesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMatchesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
