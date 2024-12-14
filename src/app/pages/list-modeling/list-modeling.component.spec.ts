import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModelingComponent } from './list-modeling.component';

describe('ListModelingComponent', () => {
  let component: ListModelingComponent;
  let fixture: ComponentFixture<ListModelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListModelingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
