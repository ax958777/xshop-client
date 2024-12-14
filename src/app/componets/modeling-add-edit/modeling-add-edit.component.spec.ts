import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelingAddEditComponent } from './modeling-add-edit.component';

describe('ModelingAddEditComponent', () => {
  let component: ModelingAddEditComponent;
  let fixture: ComponentFixture<ModelingAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelingAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
