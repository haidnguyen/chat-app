import { gql } from './gql';

describe('gql Utilities', () => {
  it('should return query and variable provided', () => {
    const query = `
      query test($a: String!) {
        something(a: $a) {
          id
        }
      }
    `;
    const variables = {
      a: 'test',
    };

    const queryResult = gql`
      query test($a: String!) {
        something(a: $a) {
          id
        }
      }
    `(variables);

    expect(queryResult.query).toEqual(`${query}`);
    expect(queryResult.variables).toEqual(variables);
  });
});
