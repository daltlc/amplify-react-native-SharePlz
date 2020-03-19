/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
    }
  }
`;
export const onCreateMemeber = /* GraphQL */ `
  subscription OnCreateMemeber($owner: String!) {
    onCreateMemeber(owner: $owner) {
      id
      email
      owner
    }
  }
`;
export const onUpdateMemeber = /* GraphQL */ `
  subscription OnUpdateMemeber($owner: String!) {
    onUpdateMemeber(owner: $owner) {
      id
      email
      owner
    }
  }
`;
export const onDeleteMemeber = /* GraphQL */ `
  subscription OnDeleteMemeber($owner: String!) {
    onDeleteMemeber(owner: $owner) {
      id
      email
      owner
    }
  }
`;
