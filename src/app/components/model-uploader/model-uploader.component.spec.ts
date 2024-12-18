import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUploaderComponent } from './model-uploader.component';

describe('ModelUploaderComponent', () => {
  let component: ModelUploaderComponent;
  let fixture: ComponentFixture<ModelUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
