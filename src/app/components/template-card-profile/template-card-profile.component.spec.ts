import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCardProfileComponent } from './template-card-profile.component';

describe('TemplateCardProfileComponent', () => {
  let component: TemplateCardProfileComponent;
  let fixture: ComponentFixture<TemplateCardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateCardProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateCardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
