import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesDetailsComponent } from './habitaciones-details.component';

describe('HabitacionesDetailsComponent', () => {
  let component: HabitacionesDetailsComponent;
  let fixture: ComponentFixture<HabitacionesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitacionesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitacionesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
