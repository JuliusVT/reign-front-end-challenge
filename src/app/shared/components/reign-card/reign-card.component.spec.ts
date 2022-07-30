import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReignCardComponent } from './reign-card.component';

describe('ReignCardComponent', () => {
  let component: ReignCardComponent;
  let fixture: ComponentFixture<ReignCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReignCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
