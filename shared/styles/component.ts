import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface StyledComponentProps {
    bg?: string;
    top?: string;
}

export const Container = styled.div`
  width: 92%;
  max-width: 620px;
  margin: 0 auto;
`;

export const ButtonIcon = styled.button<StyledComponentProps>`
  position: relative;
  height: 35px;
  width: 35px;
  padding: 0;
  overflow: hidden;
  background-color: ${(props) => props.bg || 'transparent'};
  border: none;
  cursor: pointer;

  & > img {
    position: absolute;
    top: ${(props) => props.top || "8px"};
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const FormInputStyle = css`
    padding: 10px 20px;
    border: solid 1px #ccc;
    border-radius: 6px;
    font-family: inherit;
    background: #fff;
    box-shadow: none;
    font-weight: 400;
    
    &:focus {
		border-color: rgba(0, 170, 91, 0.3);
		outline: none;
	}
`

export const FormInput = styled.input`
    ${FormInputStyle};
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    input {
        ${FormInputStyle};
    }
    .input-error {
        border-color: red;
        &:focus{
            border-color: red;
        }
    }
    .error-message {
        font-size: 80%;
        color: red;
    }
    label {
        font-size: 80%;
        text-transform: capitalize;
    }
`

export const Separator = styled.div`
    width: 100%;
    font-size: 80%;
    padding: 12px 0;
    color: #8f8f8f;
    border-bottom: 1px solid rgba(0,0,0, 0.1);
    margin-bottom: 12px;

    p {
        margin: 0;
        text-transform: capitalize;
    }
`

export const BaseButton = css`
    display: inline-block;
    padding: 9px 16px 7px;
    border: none;
    font-family: inherit;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    &:focus {
        outline: none;
    }
    &[disabled],
    &.disabled {
        cursor: not-allowed;
        pointer-events: none;
    }
`

export const GhostButton = styled.button<StyledComponentProps>`
    ${BaseButton};
    color: ${(props) => props.bg || 'white'};
    background-color: white;
    border: 1px solid ${(props) => props.bg || 'white'};
    border-radius: 4px;
`

export const Button = styled.button<StyledComponentProps>`
    ${BaseButton};
    background-color: ${(props) => props.bg || 'white'}; 
    color: white;
`

export const ContentWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 80px;
    background: linear-gradient(to bottom, #00aa5b 50px, white 50px);

    .wrapper{
        position: relative;
        padding: 20px 0;
        border-radius: 12px 12px 0 0;
        background-color: white;
        max-width: 620px;
        margin: 0 auto;
        @media (min-width: 768px) {
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(150,150,150,0.2);
        }
    }
`

export const Header = styled.header`
    background-color: #00aa5b;
    color: white;
    
    .wrapper {
        display: flex;
        height: 70px;
        justify-content: space-between;
        padding: 32px 0 16px 0;
        h1 {
            margin: 0;
            font-size: 1.5em;
        }
        p {
            font-size: 80%;
        }
         button {
            border-radius: 50%;
            border: 1px solid #f2f2f2;
            box-shadow: 0px 0px 4px rgba(0,0,0,0.1);
        }
    }
`;