import { Sample } from './sample';

describe('Sample', () => {
  it('should create an instance', () => {
    expect(new Sample()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const sample = new Sample({
      description: 'sample'
    });
    expect(sample.description).toEqual('sample');
  })
});
