import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacTicToeComponent } from './tac-tic-toe.component';

describe('TacTicToeComponent', () => {
  let component: TacTicToeComponent;
  let fixture: ComponentFixture<TacTicToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacTicToeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacTicToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
