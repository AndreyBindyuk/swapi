import { TextField, CircularProgress } from "@mui/material";
import styles from './PersonPage.module.css'
import { usePersonPage } from './usePersonPage'

export const PersonPage = () => {
    const {
        editingPerson,
        handleCancelClick,
        handleEditClick,
        handleInputChange,
        handleSaveClick,
        loading,
        editedPerson,
        person,
    } = usePersonPage()

    return (
        <div className={styles.root}>
            {loading ? <CircularProgress /> : (
                <>{editingPerson ? (
                    <div>
                        <h2 className={styles.header}>Edit Person: {person?.name}</h2>
                        <div className={styles.body}>
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
                        </div>
                        <button className={styles.button} onClick={handleSaveClick}>Save</button>
                        <button className={styles.button} onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <h2 className={styles.text} aria-label="name">{person?.name}</h2>
                        <p className={styles.text} aria-label="height">Height: {person?.height}</p>
                        <p className={styles.text} aria-label="mass">Mass: {person?.mass}</p>
                        <p className={styles.text} aria-label="gender">Gender: {person?.gender}</p>
                        <button className={styles.button} onClick={handleEditClick}>Edit</button>
                    </div>
                )}
                </>
            )}
        </div>
    )
}