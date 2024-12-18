import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAddEditDialogComponent } from './model-add-edit-dialog.component';

describe('ModelAddEditDialogComponent', () => {
  let component: ModelAddEditDialogComponent;
  let fixture: ComponentFixture<ModelAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelAddEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
