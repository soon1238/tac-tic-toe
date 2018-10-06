import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperComponentComponent } from './wrapper-component.component';

describe('WrapperComponentComponent', () => {
  let component: WrapperComponentComponent;
  let fixture: ComponentFixture<WrapperComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
