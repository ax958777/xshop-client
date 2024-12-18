import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyThreedModelsComponent } from './my-threed-models.component';

describe('MyThreedModelsComponent', () => {
  let component: MyThreedModelsComponent;
  let fixture: ComponentFixture<MyThreedModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyThreedModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyThreedModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
