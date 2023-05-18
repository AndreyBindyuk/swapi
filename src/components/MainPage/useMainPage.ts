import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchPeople, searchPersons } from "../../store/actions";

export const useMainPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (searchParams.get('page')) {
            const page = searchParams.get('page');
            dispatch(fetchPeople(Number(page)))
        } else {
            dispatch(fetchPeople());
        }
    }, [dispatch, searchParams])

    const { loading, persons, currentPage, totalPages } = useSelector(
        (state: RootState) => state.people
    );

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(fetchPeople(page));
        navigate({
            search: `?${createSearchParams({ page: page.toString() })}`
        })
    };

    const handleSearch = () => {
        dispatch(searchPersons(searchTerm));
    };

    return {
        handleSearch,
        handlePageChange,
        loading,
        persons,
        currentPage,
        totalPages,
        setSearchTerm,
        searchTerm
    }
}