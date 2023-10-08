/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Homepage from '@/pages/index'
import "@testing-library/jest-dom";
import { useQuery } from '@apollo/client';

jest.mock('@apollo/client');

jest.mock('@/components/AddContact', () => jest.fn(() => require('@/components/AddContact')));
jest.mock('@/components/FavoriteList', () => jest.fn(() => require('@/components/FavoriteList')));
jest.mock('@/components/ContactList', () => jest.fn(() => require('@/components/ContactList')));

const mockData = {
  "contact": [
    {
      "created_at": "2023-10-08T13:01:23.026801+00:00",
      "first_name": "John",
      "id": 28401,
      "last_name": "test7",
      "phones": [
          {
              "number": "+62929292345678",
          }
      ],
    },
  ]
}

describe('MyComponent', () => {
  it('renders loading state', () => {
    // @ts-ignore
    useQuery.mockReturnValueOnce({ loading: true });
    
    const { getByText } = render(<Homepage />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders data', () => {
    // @ts-ignore
    useQuery.mockReturnValue({ loading: false, data: mockData, error: undefined });

    render(<Homepage />);

    expect(screen.getByRole('heading')).toHaveTextContent('Contacts');
  });
});