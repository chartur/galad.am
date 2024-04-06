import { CustomPricePipe } from './custom-price.pipe';

describe('CustomPricePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomPricePipe();
    expect(pipe).toBeTruthy();
  });
});
