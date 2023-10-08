import { useQuery } from '@apollo/client'
import { getContactList } from '../graphql/queries'
import { useState, useRef, useEffect } from 'react'
import styled from "@emotion/styled"

import { Container, Separator, ContentWrapper, ButtonIcon, Header } from '@/shared/styles/component'
import ContactList from "@/components/ContactList"
import AddContact from "@/components/AddContact"
import FavoriteList from '@/components/FavoriteList'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image';

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

const PAGE_SIZE = 10;
const MIN_HEIGHT_CONTAINER = 520;

const ContactListContainer = styled.div`
    height: ${MIN_HEIGHT_CONTAINER}px;
    overflow: auto;
    .search-keyword {
        color: #8f8f8f;
        margin: 0 0 12px 0;
        p {
            margin: 0;
        }
        span {
            font-size: 80%;
        }
    }
`

const HomePage: React.FC = () => {
    const [offset, setOffset] = useState(0);
    const [isReachLastPage, setReachLastPage] = useState(false);
    const contactListContainer = useRef<HTMLDivElement>(null);
    const [isModalAddShow, setModalAddShow] = useState(false);
    
    const { loading, error, data, fetchMore, refetch } = useQuery(getContactList, {
        variables: {
            limit: PAGE_SIZE,
            order_by: [{ first_name: 'asc' }],
            offset: 0
        },
        fetchPolicy: 'network-only'
    });
    
    const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
     
            const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            return savedFavorites;
        } else {
            return [];
        }
    });

    const regularContacts = data?.contact.filter(
        (contact: Contact) => !favorites.includes(contact.id)
    );

    const handleToggleFavorite = (contactId: string) => {
        const updatedFavorites = favorites.includes(contactId)
            ? favorites.filter((id) => id !== contactId)
            : [...favorites, contactId];

        setFavorites(updatedFavorites);

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        const container = contactListContainer.current;
        const handleScroll = () => {
            if(isReachLastPage) return
            const container = contactListContainer.current;
            if (container) {
                const { scrollTop, scrollHeight, clientHeight } = container;
                if (scrollTop + clientHeight >= scrollHeight) {
                    fetchMore({
                        variables: {
                            offset: offset + PAGE_SIZE,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            if (!fetchMoreResult.contact.length) setReachLastPage(true);
                            return {
                                contact: [...prev.contact, ...fetchMoreResult.contact],
                            };
                        },
                    });
                    setOffset(offset + PAGE_SIZE);
                }
            }
        };

        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };           
    }, [fetchMore, data, offset, isReachLastPage]);

    const handleRefetchAllData = () => {
        refetch({
            limit: offset === 0 ? 20 : offset,
            offset: 0,
            orderBy: [{ first_name: 'asc' }],
            where: {}
        });
    };

    const [searchState, setSearchState] = useState({
        state: false,
        keyword: ''
    });

    const handleSearch = (keyword: string) => {
        if (keyword.length > 0) {
            setSearchState({
                state: true,
                keyword: keyword
            });

            refetch({
            limit: offset === 0 ? 20 : offset,
            offset: 0,
            orderBy: [{ first_name: 'asc' }],
            where: {
                    "_or": [
                        { "first_name": { "_like": `%${keyword}%` } },
                        { "last_name": { "_like": `%${keyword}%` } }
                    ]
                },
            });
        } else {
            setSearchState({
                state: false,
                keyword: ''
            });
            handleRefetchAllData();
        }
    }
    
    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Header>
                <Container className="wrapper">
                    <div>
                        <h1>Contacts</h1>    
                        <p>Keep in touch with your contacts!</p>
                    </div>
                    <ButtonIcon top="-76px" bg="white" onClick={() => setModalAddShow(true)}>
                        <Image src="./icons.svg" width={70} height={160} alt="Image" />
                    </ButtonIcon>
                </Container>
            </Header>
            <ContentWrapper>
                <div className="wrapper">
                    <Container>
                    <SearchBar onSearch={handleSearch} search={ searchState } />
                    <AddContact isShow={ isModalAddShow } closeModal={() => setModalAddShow(false)} onAddContact={() => handleRefetchAllData() }/>
                    <ContactListContainer ref={contactListContainer}>
                            {
                                searchState.state &&
                                (<div className="search-keyword">
                                    <p>Search result for `{searchState.keyword}`</p>
                                    <span>( Search for regular contacts is case sensitive. )</span>
                                </div>)
                            }
                            <FavoriteList search={searchState} ids={favorites} onToggleFavorite={(contactId) => handleToggleFavorite(contactId)} />
                            <Separator><p>contacts</p></Separator>
                            <ContactList showSeparator={true}
                                contacts={regularContacts}
                                refetchData={handleRefetchAllData}
                                onToggleFavorite={(contact) => handleToggleFavorite(contact.id)}
                            />
                    </ContactListContainer>
                    </Container>
                </div>
            </ContentWrapper>
        </>
    )
}

export default HomePage;