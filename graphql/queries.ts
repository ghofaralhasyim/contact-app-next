import { gql } from '@apollo/client';

const getContactList = gql`
  ${require('./queries/getContactList.graphql')}
`;

const addContact = gql`
  ${require('./queries/addContact.graphql')}
`;

const getContactListById = gql`
 ${require('./queries/getContactListById.graphql')}
`;

const deleteContact = gql`
  ${require('./queries/deleteContact.graphql')}
`;

export {  getContactList, addContact, getContactListById, deleteContact };