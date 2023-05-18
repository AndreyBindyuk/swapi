import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { PersonPage } from '..'
import { peopleSlice } from '../../../store/peopleSlice';

const person = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    gender: 'male',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: ''
};

const initialState = {
    persons: [],
    person: person,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    editingPerson: null,
};

describe('PersonPage component', () => {
    const setup = async () => {
        const store = configureStore({
            reducer: {
                people: peopleSlice.reducer
            },
            preloadedState: {
                people: { ...initialState }
            }
        });
        render(
            <Provider store={store}>
                <PersonPage />
            </Provider>
        );
    }

    it('should render the person details', async () => {
        await setup()
        expect(screen.getByText(person.name)).toBeInTheDocument();
        expect(screen.getByText(`Height: ${person.height}`)).toBeInTheDocument();
        expect(screen.getByText(`Mass: ${person.mass}`)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${person.gender}`)).toBeInTheDocument();
    });

    it('should allow editing the person details', async () => {
        await setup()

        // Click the "Edit" button
        fireEvent.click(screen.getByText('Edit'));

        // Modify the input field values
        fireEvent.change(screen.getByLabelText('Height'), { target: { value: '180' } });
        fireEvent.change(screen.getByLabelText('Mass'), { target: { value: '80' } });
        fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } });

        // Click the "Save" button
        fireEvent.click(screen.getByText('Save'));

        // Verify that the updated details are displayed
        expect(screen.getByText('Height: 180')).toBeInTheDocument();
        expect(screen.getByText('Mass: 80')).toBeInTheDocument();
        expect(screen.getByText('Gender: male')).toBeInTheDocument();
    });
})