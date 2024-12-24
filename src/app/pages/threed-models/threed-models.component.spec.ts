import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedModelsComponent } from './threed-models.component';

describe('ThreedModelsComponent', () => {
  let component: ThreedModelsComponent;
  let fixture: ComponentFixture<ThreedModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreedModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreedModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
