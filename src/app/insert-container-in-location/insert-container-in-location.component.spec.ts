import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertContainerInLocationComponent } from './insert-container-in-location.component';

describe('InsertContainerInLocationComponent', () => {
  let component: InsertContainerInLocationComponent;
  let fixture: ComponentFixture<InsertContainerInLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertContainerInLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertContainerInLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
