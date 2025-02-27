import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeSectionComponent } from './prize-section.component';

describe('PrizeSectionComponent', () => {
  let component: PrizeSectionComponent;
  let fixture: ComponentFixture<PrizeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrizeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
