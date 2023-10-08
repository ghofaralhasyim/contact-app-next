'use client'

import { useQuery } from '@apollo/client'
import { getContactListById } from '@/graphql/queries'
import ContactList from "@/components/ContactList"
import { Separator } from '@/shared/styles/component';
import { useEffect, useState } from 'react'

interface SearchData {
    keyword: string,
    state: boolean
}
interface FavoriteListProps {
    ids: string[],
    onToggleFavorite: (contact: string) => void,
    search: SearchData,
}

interface Phone {
  number: string
}

interface Contact {
  created_at: string;
  first_name: string;
  id: string,
  last_name: string,
  phones: Phone[]
}

const FavoriteList: React.FC<FavoriteListProps> = ({ ids, onToggleFavorite, search }) => {

    const [searchResult, setSearchResult] = useState<Contact[]>([]);
    const { loading, error, data, refetch } = useQuery(getContactListById, {
        variables: { ids: ids },
        fetchPolicy: 'network-only'
    });

    const favoritesContacts = data?.contact;

    const handleToggleFavorite = (contactId: string) => {
        onToggleFavorite(contactId);
    }
    
    useEffect(() => {
        if (search.keyword.length > 0) {
            const searchData = data?.contact.filter((item: Contact) => {
                return item.first_name.toLocaleLowerCase().includes(search.keyword.toLocaleLowerCase()) || item.last_name.toLocaleLowerCase().includes(search.keyword.toLocaleLowerCase())
            })
            setSearchResult(searchData);
        }
    }, [search, data]);

    if(!loading && favoritesContacts?.length !== 0) return (
        <>
            <Separator>
                <p>Favorite Contacts</p>
            </Separator>
            <ContactList isFavorite={true} showSeparator={false}
                contacts={search.state ? searchResult : favoritesContacts}
                onToggleFavorite={(contact) => handleToggleFavorite(contact.id)}
                onDelete={() => refetch()}
            />
        </>
    )
}

export default FavoriteList;