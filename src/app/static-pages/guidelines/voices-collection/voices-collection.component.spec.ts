import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicesCollectionComponent } from './voices-collection.component';

describe('VoicesCollectionComponent', () => {
  let component: VoicesCollectionComponent;
  let fixture: ComponentFixture<VoicesCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoicesCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
