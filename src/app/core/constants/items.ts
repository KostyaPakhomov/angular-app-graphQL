import { gql } from 'apollo-angular';

export const itemsQuery: any = gql`
  query load(
    $page: Int
    $perPage: Int
    $unitPrice: Float
    $supplierID: Float
    $categoryID: Float
    $OR: [FilterFindManyProductInput!]
  ) {
    viewer {
      productPagination(
        page: $page
        perPage: $perPage
        filter: {
          unitPrice: $unitPrice
          categoryID: $categoryID
          OR: $OR
          supplierID: $supplierID
        }
      ) {
        items {
          name
          unitPrice
          quantityPerUnit
          productID
          supplier {
            companyName
            supplierID
            address {
              country
              city
              region
              street
              postalCode
              phone
            }
          }
          category {
            name
            categoryID
            description
          }
        }
        count
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export const loadProducts = gql`
  query load(
    $page: Int
    $perPage: Int
    $unitPrice: Float
    $supplierID: Float
    $categoryID: Float
    $OR: [FilterFindManyProductInput!]
  ) {
    viewer {
      productPagination(
        page: $page
        perPage: $perPage
        filter: {
          unitPrice: $unitPrice
          categoryID: $categoryID
          OR: $OR
          supplierID: $supplierID
        }
      ) {
        items {
          name
          unitPrice
          productID
          supplier {
            companyName
            supplierID
          }
          category {
            name
            categoryID
          }
        }
        count
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export const loadOneProduct = gql`
  query load($productID: Float) {
    viewer {
      product(filter: { productID: $productID }) {
        name
        unitPrice
        quantityPerUnit
        productID
        supplier {
          companyName
          supplierID
          address {
            country
            city
            region
            street
            postalCode
            phone
          }
        }
        category {
          name
          categoryID
          description
        }
      }
    }
  }
`;
