import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchPerson } from "../../store/actions";
import { Person, cancelEditingPerson, startEditingPerson, updatePerson } from "../../store/peopleSlice";
import { TextField, Button, CircularProgress } from "@mui/material";

export const PersonPage = () => {
    const { name } = useParams<{ name: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { person, loading } = useSelector((state: RootState) => state.people);
    const editingPerson = useSelector((state: RootState) => state.people.editingPerson);
    const [editedPerson, setEditedPerson] = useState<Person | null>(null);

    const handleEditClick = () => {
        person && dispatch(startEditingPerson(person));
        person && setEditedPerson({ ...person });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editedPerson) {
            setEditedPerson({ ...editedPerson, [event.target.name]: event.target.value });
        }
    };

    const handleSaveClick = () => {
        if (editedPerson) {
            dispatch(updatePerson(editedPerson));
        }
    };

    const handleCancelClick = () => {
        dispatch(cancelEditingPerson());
    };

    useEffect(() => {
        name && dispatch(fetchPerson(name));
    }, [dispatch, name]);
    return (
        <div>
            <div>
                {loading ? <CircularProgress /> : (
                    <>{editingPerson ? (
                        <div>
                            <h2>Edit Person: {person?.name}</h2>
                            <TextField
                                label="Height"
                                name="height"
                                value={editedPerson?.height || ''}
                                onChange={handleInputChange}
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="Mass"
                                name="mass"
                                value={
                                    editedPerson?.mass || ''}
                                onChange={handleInputChange}
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="Gender"
                                name="gender"
                                value={editedPerson?.gender || ''}
                                onChange={handleInputChange}
                                variant="outlined"
                                size="small"
                            />
                            <Button variant="contained" onClick={handleSaveClick}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <h2 aria-label="name">{person?.name}</h2>
                            <p aria-label="height">Height: {person?.height}</p>
                            <p aria-label="mass">Mass: {person?.mass}</p>
                            <p aria-label="gender">Gender: {person?.gender}</p>
                            <Button variant="contained" onClick={handleEditClick}>
                                Edit
                            </Button>
                        </div>
                    )}
                    </>
                )}

            </div>
        </div>
    )
}