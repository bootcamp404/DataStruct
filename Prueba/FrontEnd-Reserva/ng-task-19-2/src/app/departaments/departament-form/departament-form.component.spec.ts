import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentFormComponent } from './departament-form.component';

describe('DepartamentFormComponent', () => {
  let component: DepartamentFormComponent;
  let fixture: ComponentFixture<DepartamentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
