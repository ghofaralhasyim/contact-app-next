import styled from "@emotion/styled";
import { useState, useRef } from "react";
import Image from 'next/image';
import { ButtonIcon } from "@/shared/styles/component";
import useOnClickOutside from '@/utils/onClickOutside';

const Popup = styled.div`
    z-index: 10;
    position: absolute;
    bottom: -100%;
    right: 24px;
    border-radius: 4px;
    min-width: 120px;
    border: 1px solid #f2f2f2;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    padding: 6px;
    background: white;

    button {
        cursor: pointer;
        background: white;
        border: none;
        padding: 8px 12px;
        text-align: left;
        &:not(:last-child){
            border-bottom: 1px solid rgba(176, 174, 174, 0.1);
        }
    }
`

interface PopoverProps {
    onClickFavorite: () => void,
    onClickDelete: () => void,
    isFavorite?: boolean,
}

const ContactActionMenu: React.FC<PopoverProps> = ({ isFavorite, onClickFavorite, onClickDelete }) => {
    const [isShow, setIsShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = () => {
        setIsShow(false);
    }

    useOnClickOutside(ref, handleClickOutside);

    return (
        <div ref={ref} style={{position: 'relative'}}>
            {isShow && 
                <Popup>
                    {/* <button onClick={() => { console.log('edit') }}>Edit</button> */}
                    <button onClick={() => { setIsShow(false); onClickDelete() }}>Delete</button>
                </Popup>
             }
            <ButtonIcon  top={isFavorite ? '-48px' : '-16px'} onClick={() => { setIsShow(false); onClickFavorite() }}>
                <Image src="./icons.svg" width={70} height={160} alt="Image" />
            </ButtonIcon>
            <ButtonIcon  top="-104px" onClick={() => setIsShow(!isShow)}>
                <Image src="./icons.svg" width={70} height={160} alt="Image" />
            </ButtonIcon>
        </div>
    )
}

export default ContactActionMenu;