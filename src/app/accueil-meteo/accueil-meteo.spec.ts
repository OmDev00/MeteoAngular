import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilMeteo } from './accueil-meteo';

describe('AccueilMeteo', () => {
  let component: AccueilMeteo;
  let fixture: ComponentFixture<AccueilMeteo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilMeteo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilMeteo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
