import { gql } from 'apollo-angular';

export const loadCharacters = gql`
  query load($page: Int, $name: String, $gender: String) {
    characters(page: $page, filter: { name: $name, gender: $gender }) {
      results {
        name
        id
        gender
        species
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

export const loadCharactersByIds = gql`
  query load($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      name
      id
      gender
      species
    }
  }
`;

export const loadOneCharacter = gql`
  query load($id: ID!) {
    character(id: $id) {
      name
      id
      image
      gender
      species
      status
      type
      created
      origin {
        name
      }
    }
  }
`;
