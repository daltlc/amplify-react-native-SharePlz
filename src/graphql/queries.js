/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      item
      id
      name
      zip
      phoneNumber
      description
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        item
        id
        name
        zip
        phoneNumber
        description
      }
      nextToken
    }
  }
`;
export const getMemeber = /* GraphQL */ `
  query GetMemeber($id: ID!) {
    getMemeber(id: $id) {
      id
      email
      owner
    }
  }
`;
export const listMemebers = /* GraphQL */ `
  query ListMemebers(
    $filter: ModelMemeberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMemebers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        owner
      }
      nextToken
    }
  }
`;
