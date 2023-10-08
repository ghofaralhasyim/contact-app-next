import styled from "@emotion/styled";
import Image from 'next/image';
import { ButtonIcon, FormInput, Container } from "@/shared/styles/component";
import { ChangeEvent, FormEvent, useState } from "react";

const Search = styled.form`
    position: relative;
    display: flex;
    margin-bottom: 12px;

    & > input {
        border-radius: 18px;
        width: 100%;
    }
    & > button {
        background: transparent;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        background-color: #00aa5b;
    }
`

interface SearchData {
    keyword: string,
    state: boolean
}

interface SearchBarProps {
    onSearch: (keyword: string) => void,
    search: SearchData
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, search }) => {

    const [keyword,setKeyword] = useState('')
    
    const handleSearch = (event: FormEvent) => {
        event.preventDefault(); 
        if(keyword.length === 0) return
        onSearch(keyword);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length === 0 && search.state) onSearch(value);
        setKeyword(value);
    }
    return (
        <Search onSubmit={handleSearch}>
            <FormInput type="text" value={keyword} onChange={handleInputChange} name="keyword" placeholder="Search" />
            <ButtonIcon top="8px" type="submit">
                <Image src="./icons.svg" width={70} height={169} alt="Image" />
            </ButtonIcon>
        </Search>
    );
};

export default SearchBar;