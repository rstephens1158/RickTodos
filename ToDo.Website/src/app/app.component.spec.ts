import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserOnlyAuthService} from "./browser-only-auth-service.service";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (name: string) => 'value'
    }
  },
  queryParams: of({key: 'value'}),
  params: of({id: '123'})
};

class MockAuthService {
  // Simulate the methods you use from the AuthService
  isAuthenticated$ = of(true);  // Adjust as necessary for your tests
  user$ = of({ name: 'Test User', email: 'test@example.com' });
  loginWithRedirect = jasmine.createSpy('loginWithRedirect');
  logout = jasmine.createSpy('logout');
}

class MockBrowserOnlyAuthService {
  loginWithRedirect = jasmine.createSpy('loginWithRedirect');
  logout = jasmine.createSpy('logout');
}

describe('AppComponent', () => {
  let mockAuthService: MockBrowserOnlyAuthService;

  beforeEach(async () => {
    mockAuthService = new MockBrowserOnlyAuthService();

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgbModule,
        NgbNavModule,
        NgbCollapseModule, AppComponent
      ],
      providers: [
        { provide: BrowserOnlyAuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AuthService, useValue: new MockAuthService() }  // Provide the mock AuthService
      ],
      declarations: [] // Ensure you declare the component since it is standalone
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ToDo.Website' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ToDo.Website');
  });

  it('should call loginWithRedirect on login', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.login();
    expect(mockAuthService.loginWithRedirect).toHaveBeenCalled();
  });

  it('should call logout on logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
