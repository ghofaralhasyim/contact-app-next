import { useMutation, useQuery } from '@apollo/client'
import { addContact, getContactList } from '../graphql/queries'
import { useState, ChangeEvent, FormEvent } from 'react'
import styled from "@emotion/styled";
import Modal from './Modal';
import { Button, FormGroup, GhostButton } from '@/shared/styles/component';

const FormContact = styled.form`
    width: 320px;
    background: white;
    padding: 1em;
    border-radius: 8px;
    gap: 12px;
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
        justify-content: space-between;
        alignt-items: center;
        button { 
            cursor: pointer;
            background: transparent;
            border:none;
        }
    }
    .form-group { 
        display: flex;
        gap: 12px;
    }
    .phones {
        display: flex;
        input {
            width: 100%;
        }
    }
`

interface Phone {
  number: string
}

interface FormData {
    first_name: string,
    last_name: string,
    phones: Phone[],
}

interface ValidationError {
    first_name: string,
    last_name: string,
    phones: string[],
}

interface AddContactFormProps {
    onAddContact: () => void,
    isShow: boolean,
    closeModal: () => void
}

const AddContactForm: React.FC<AddContactFormProps> = ({onAddContact, closeModal, isShow}) => {
    const [add] = useMutation(addContact);

    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        phones: [{number: ''}]
    });

    const [errors, setErrors] = useState<ValidationError>({
        first_name: '',
        last_name: '',
        phones: ['']
    });
1

    const { first_name, last_name, phones } = formData;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({ ...errors, [name]: '' });
    };

    const handlePhoneChange = (index: number, value: string) => {
        const updatedPhones = [...formData.phones];
        updatedPhones[index].number = value;
        const errorPhones = [...errors.phones];
        errorPhones[index] = ''
        setErrors({ ...errors, phones: errorPhones });
        setFormData({
            ...formData,
            phones: updatedPhones
        });
    };

    const isPhoneNumberValid = (phoneNumber: string): boolean => {
       return /^\d{8,16}$/.test(phoneNumber);
    };

    const isValidName = (name: string): boolean => {
        return /^[a-zA-Z]+$/.test(name);
    }

    const validateData = (formData: FormData) => {
        const { first_name, last_name, phones } = formData;

        const newErrors = {
            first_name: '',
            last_name: '',
            phones: [''],
            error: false,
        };
        if (!first_name) {
            newErrors.first_name = 'First name is required';
            newErrors.error = true
        } else if(!isValidName(first_name)) {
            newErrors.first_name = 'Invalid name. Please use letters (a-z) only.';
            newErrors.error = true
        }
        if (!last_name) {
            newErrors.last_name = 'Last name is required.';
            newErrors.error = true
        }else if(!isValidName(last_name)) {
            newErrors.last_name = 'Invalid name. Please use letters (a-z) only.';
            newErrors.error = true
        }
        for (let i = 0; i < phones.length; i++) {
            const phone = phones[i].number;
            if (!phone) {
                newErrors.phones[i] = 'Phone number is required.'
                newErrors.error = true
            } else if (!isPhoneNumberValid(phone)) {
                newErrors.phones[i] = 'Please enter number only, with min. 8 length'
                newErrors.error = true
            }
        }
        
        if (newErrors.error) {
            setErrors(newErrors);
            return true;
        };
    }

    const resetForm = () => {
        setFormData({
            first_name: '',
            last_name: '',
            phones: [{number: ''}]
        })
        setErrors({
            first_name: '',
            last_name: '',
            phones: [''],
        })
    }

    const handleAddContact = async (event: FormEvent) => {
        event.preventDefault(); 
        if (validateData(formData)) return;
        try {
            const { data } = await add({
                variables: {
                    first_name: formData.first_name.toLocaleLowerCase(),
                    last_name: formData.last_name.toLocaleLowerCase(),
                    phones: formData.phones
                },
            });
            onAddContact();
            closeModal();
            resetForm();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const handleAddPhone = () => {
        setFormData({
            ...formData,
            phones: [...formData.phones, { number: '' }]
        });
    };

  return (
      <Modal show={isShow} closeModal={() => closeModal()}>
        <FormContact onSubmit={handleAddContact}>
            <div className="header">
                <span>Add New Contact</span>
                  <button type='button' onClick={() => { closeModal();  }}>x</button>
            </div>
              <FormGroup>
                <label>first name</label>
                <input
                    type="text"
                    name="first_name"
                    className={ errors.first_name ? 'input-error' : '' }
                    value={first_name}
                    placeholder='Enter first name'
                    onChange={handleInputChange}
                />      
                {errors.first_name && <span className='error-message'>{errors.first_name}</span>}
              </FormGroup>
              <FormGroup>
                <label>Last name</label>
                <input
                    type="text"
                    name="last_name"
                    className={ errors.last_name ? 'input-error' : '' }
                    value={last_name}
                    placeholder='Enter last name'
                    onChange={handleInputChange}
                />
                {errors.last_name && <span className='error-message'>{errors.last_name}</span>}
            </FormGroup>
            {phones.map((phone, index) => (
                <FormGroup key={index}>
                    <label>Phone number</label>
                    <input
                        type="number"
                        value={phone.number}
                        className={ errors.phones[index] ? 'input-error' : '' }
                        placeholder='Enter phone number'
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                    />
                    {errors.phones[index] && <span className='error-message'>{errors.phones[index]}</span>}        
                </FormGroup>
            ))}
            <GhostButton bg='#00aa5b' type="button" onClick={handleAddPhone}>
                Add other number phone
            </GhostButton>
            <Button bg='#00aa5b' type='submit'>Save</Button>
        </FormContact>
    </Modal>
  );
};

export default AddContactForm;