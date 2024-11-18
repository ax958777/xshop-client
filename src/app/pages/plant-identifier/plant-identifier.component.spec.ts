import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantIdentifierComponent } from './plant-identifier.component';

describe('PlantIdentifierComponent', () => {
  let component: PlantIdentifierComponent;
  let fixture: ComponentFixture<PlantIdentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantIdentifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
