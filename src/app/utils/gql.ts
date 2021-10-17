export const gql =
  (strs: TemplateStringsArray) => (variables: Record<string, any>) => ({
    query: `${strs[0]}`,
    variables,
  });
