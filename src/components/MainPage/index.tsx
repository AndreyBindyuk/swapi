import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom'
import { AppDispatch, RootState } from "../../store";
import { fetchPeople, searchPersons } from "../../store/actions";
import { Link } from "react-router-dom";
import { Button, CircularProgress, Pagination, TextField } from "@mui/material";

export const MainPage = () => {
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

    return (
        <div>
            <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            <Button variant="contained" onClick={handleSearch} style={{ marginBottom: 16 }}>
                Search
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                    {persons?.map((person) => (
                        <div key={person.name}>
                            <Link to={`/person/${person.name}`}>{person.name}</Link>
                        </div>
                    ))}
                </div>
            )}
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                style={{ marginTop: 16 }}
            />
        </div>
    )
}