import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasesCollectionComponent } from './phrases-collection.component';

describe('PhrasesCollectionComponent', () => {
  let component: PhrasesCollectionComponent;
  let fixture: ComponentFixture<PhrasesCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhrasesCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhrasesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
