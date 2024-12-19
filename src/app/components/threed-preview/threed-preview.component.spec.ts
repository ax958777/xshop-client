import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedPreviewComponent } from './threed-preview.component';

describe('ThreedPreviewComponent', () => {
  let component: ThreedPreviewComponent;
  let fixture: ComponentFixture<ThreedPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreedPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreedPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
