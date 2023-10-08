'use client'

import { useMutation } from '@apollo/client'
import { deleteContact } from '../graphql/queries'
import styled from "@emotion/styled"
import ContactActionMenu from './ContactActionMenu'
import Link from 'next/link'

const List = styled.li`
  position: relative;
  .list-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    a {
      flex-grow: 1;
    }
    .profile {
      display: flex;
      align-items: center;
      column-gap: 12px;
      &-picture{
          width: 38px;
          height: 38px;
          background-color: #d7ffec;
          color: #00341e;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      p {
        margin: 0;
        text-transform: capitalize;
        font-size: .95em;
      }
      .number{
        font-size: 80%;
        color: #8f8f8f;
        margin-top: 4px;
      }
    }
  }
`

interface Phone {
  number: string
}

interface Contact {
  created_at: string,
  first_name: string,
  id: string,
  last_name: string,
  phones: Phone[]
}

interface ContactListProps {
  contacts: Contact[],
  onToggleFavorite: (contact: Contact) => void,
  refetchData?: () => void,
  showSeparator: boolean,
  isFavorite?: boolean,
  onDelete?: () => void
}

const ContactList: React.FC<ContactListProps> = ({ contacts, isFavorite, onToggleFavorite, showSeparator, refetchData, onDelete }) => {

  const [delete_contact] = useMutation(deleteContact);

  const handleDeleteContact = async (id: string) => {
    try {
        const { data } = await delete_contact({
          variables: {
            id: id
          }
        });
      if (refetchData) refetchData();
      if (isFavorite && onDelete) onDelete();
    } catch (error) { 
        console.error('Error delete contact:', error);
    }
  }

 if(contacts) return (
    <ul>
     {contacts.map((contact, index) => (
        <List key={index}>
         <div className="list-item">
            <Link  href={`/${contact.id}`}>
              <div className='profile'>
              <div className="profile-picture">
                {contact.first_name[0].toLocaleUpperCase()}
              </div>
              <div className="info">
                <p>{contact.first_name + ' ' + contact.last_name}</p>
                <p className="number">{ contact.phones[0].number }</p>
              </div>
             </div>
            </Link>
              <ContactActionMenu isFavorite={isFavorite} onClickFavorite={() => onToggleFavorite(contact)} onClickDelete={() => handleDeleteContact(contact.id)}/>
          </div>
         </List>
      ))}
    </ul>
  );
};

export default ContactList;