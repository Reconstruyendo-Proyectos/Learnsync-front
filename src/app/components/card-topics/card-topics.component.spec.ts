import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTopicsComponent } from './card-topics.component';

describe('CardTopicsComponent', () => {
  let component: CardTopicsComponent;
  let fixture: ComponentFixture<CardTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTopicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
