import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, AuthModule } from '@auth0/auth0-angular'; // Import AuthModule
import { AuthButtonComponent } from './auth-button.component';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {

    authServiceStub = {
      isAuthenticated$: of(true),
      loginWithRedirect: () => of(undefined),
      logout: () => of(undefined)
    };

    await TestBed.configureTestingModule({
      imports: [AuthModule, AuthButtonComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: DOCUMENT, useValue: document }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
