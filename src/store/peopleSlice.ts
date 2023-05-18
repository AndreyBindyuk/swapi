import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPeople, fetchPerson, searchPersons } from './actions';

export type Person = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}


interface PersonsState {
    persons: Person[];
    person: Person | null;
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    editingPerson: Person | null;
  }
  
  const initialState: PersonsState = {
    persons: [],
    person: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    editingPerson: null,
  };

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
      startEditingPerson: (state, action: PayloadAction<Person>) => {
        state.editingPerson = action.payload;
      },
      updatePerson: (state, action: PayloadAction<Person>) => {
        if (state.editingPerson) {
          const updatedPerson = { ...state.editingPerson, ...action.payload };
          state.person = updatedPerson
          state.editingPerson = null;
        }
      },
      cancelEditingPerson: (state) => {
        state.editingPerson = null;
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPeople.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchPeople.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentPage = action.payload.currentPage;
            state.persons = action?.payload?.persons;
            state.totalPages = Math.ceil(action?.payload?.count / 10);
        }).addCase(fetchPeople.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
          }).addCase(searchPersons.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(searchPersons.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.persons = action.payload.persons;
            state.totalPages = Math.ceil(action.payload.count / 10);
          }).addCase(searchPersons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
          }).addCase(fetchPerson.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.person = null;
          }).addCase(fetchPerson.fulfilled, (state, action) => {
             state.loading = false;
             state.error = null;
             state.person = action.payload;
          }).addCase(fetchPerson.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message || null;
              state.person = null;
          });
    }
})

export const { startEditingPerson, updatePerson, cancelEditingPerson } = peopleSlice.actions;