import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPeople = createAsyncThunk(
    'persons/fetchPeople',
    async (page: number = 1) => {
      const response = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
      const people = await response.json()
      console.log(people)
      return {
        persons: people.results,
        count: people.count,
        currentPage: page,
      }
    }
  );

export const searchPersons = createAsyncThunk(
  'persons/searchPersons',
  async (searchName: string) => {
    const response = await fetch(`https://swapi.py4e.com/api/people/?search=${searchName}`);
    const people = await response.json()
    return {
        persons: people.results,
        count: people.count,
    };
  }
);

export const fetchPerson = createAsyncThunk('persons/fetchPerson', async (name: string) => {
    const response = await fetch(`https://swapi.py4e.com/api/people/?search=${name}`);
    const people = await response.json()
    if (people.count > 0) {
      return people.results[0];
    }
    return null;
  });