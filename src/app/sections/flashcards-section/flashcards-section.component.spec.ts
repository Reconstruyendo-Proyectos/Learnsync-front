import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsSectionComponent } from './flashcards-section.component';

describe('FlashcardsSectionComponent', () => {
  let component: FlashcardsSectionComponent;
  let fixture: ComponentFixture<FlashcardsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
