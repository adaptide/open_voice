import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrganizationComponent } from './show-organization.component';

describe('ShowOrganizationComponent', () => {
  let component: ShowOrganizationComponent;
  let fixture: ComponentFixture<ShowOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOrganizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
