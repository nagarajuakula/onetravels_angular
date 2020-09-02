import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarComponent ],
      imports: [ MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // debugger;
    expect(component).toBeTruthy();
  });
});
