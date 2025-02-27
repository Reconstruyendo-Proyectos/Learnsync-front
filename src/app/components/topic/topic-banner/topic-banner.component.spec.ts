import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicBannerComponent } from './topic-banner.component';

describe('TopicBannerComponent', () => {
  let component: TopicBannerComponent;
  let fixture: ComponentFixture<TopicBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
