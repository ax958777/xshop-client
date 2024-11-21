import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditShopComponent } from './credit-shop.component';

describe('CreditShopComponent', () => {
  let component: CreditShopComponent;
  let fixture: ComponentFixture<CreditShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
