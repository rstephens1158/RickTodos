import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserProfileComponent} from './user-profile.component';
import {AuthService} from '@auth0/auth0-angular';
import {of} from 'rxjs';

class MockAuthService {
  // Mock user observable
  user$ = of({
    name: 'Test User'
  });
}


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Test User');
  });
});
