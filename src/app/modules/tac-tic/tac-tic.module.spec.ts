import { TacTicModule } from './tac-tic.module';

describe('TacTicModule', () => {
  let tacTicModule: TacTicModule;

  beforeEach(() => {
    tacTicModule = new TacTicModule();
  });

  it('should create an instance', () => {
    expect(tacTicModule).toBeTruthy();
  });
});
