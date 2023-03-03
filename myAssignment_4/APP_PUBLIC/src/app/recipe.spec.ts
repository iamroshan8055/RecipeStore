import { Recipe } from './models/recipe';

describe('Recipe', () => {
  it('should create an instance', () => {
    expect(new Recipe()).toBeTruthy();
  });
});
