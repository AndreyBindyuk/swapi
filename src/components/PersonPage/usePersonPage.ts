import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchPerson } from "../../store/actions";
import { Person, startEditingPerson, updatePerson, cancelEditingPerson } from "../../store/peopleSlice";

export const usePersonPage = () => {
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

    return {
        handleCancelClick,
        handleSaveClick,
        handleInputChange,
        handleEditClick,
        editingPerson,
        loading,
        editedPerson,
        person
    }
}