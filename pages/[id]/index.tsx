import { useRouter } from 'next/router'
import styled from "@emotion/styled"
import { formatDate } from "@/utils/helpers"
import Image from 'next/image'
import { ButtonIcon, Separator, Header, ContentWrapper, Container } from "@/shared/styles/component"
import { useQuery } from '@apollo/client'
import { getContactListById } from '@/graphql/queries'
import Link from 'next/link'

const Profile = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    .picture{
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
        &.date {
             font-size: 80%;
            color: #8f8f8f;
        }
    }
    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        .name {
            width: 100%;
            text-transform: capitalize;
        }
    }
    .numbers:last-child{
        margin-bottom: 16px;
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

const DetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const { loading, error, data, refetch } = useQuery(getContactListById, {
        variables: { ids: [id] },
        fetchPolicy: 'network-only'
    });

    const contact: Contact = data?.contact[0]
    
    if (error) return <p>Error: {error.message}</p>;

    if (!loading && contact) return (
        <>
            <Header>
                <Container className="wrapper">
                    <Profile>
                        <div className="info">
                             <div className="picture">
                                {contact.first_name[0]}
                            </div>
                            <div className='name'>
                                <h1>{contact.first_name + ' ' + contact.last_name}</h1>
                                <p>Created at: { formatDate(contact.created_at) }</p>
                            </div>
                        </div>
                    </Profile>
                    <Link href={`/`}>
                        <ButtonIcon top="-132px" bg="white">
                            <Image src="./icons.svg" width={70} height={160} alt="Image" />
                        </ButtonIcon>
                    </Link>
                </Container>
            </Header>
            <ContentWrapper>
                <div className="wrapper">
                    <Container>
                        { contact.phones.length == 0 && (
                            <Separator><p>Phone number not found.</p></Separator>
                        )}
                        <Profile>
                            {contact.phones.map((phone, index) => (
                                <div key={index} className="numbers">
                                    <Separator><p>Phone number { contact.phones.length > 1 && (index + 1) }</p></Separator>
                                    <p>{ phone.number }</p>
                                </div>
                            ))}
                        </Profile>
                    </Container>
                </div>
            </ContentWrapper>
        </>
    )
}

export default DetailPage;