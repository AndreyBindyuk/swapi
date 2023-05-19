import { Link } from "react-router-dom";
import { CircularProgress, Pagination } from "@mui/material";
import styles from './MainPage.module.css'
import { useMainPage } from './useMainPage'

export const MainPage = () => {
    const {
        currentPage,
        handlePageChange,
        handleSearch,
        loading,
        persons,
        updateSearchValue,
        totalPages,
        searchTerm,
    } = useMainPage()

    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <input
                    value={searchTerm}
                    onChange={updateSearchValue}
                    className={styles.textField}
                />
                <button className={styles.button} onClick={handleSearch}>Search</button>
            </div>
            <div className={styles.body}>
                {loading ? (
                    <CircularProgress color="warning" />
                ) : (
                    <div className={styles.persons}>
                        {persons?.map((person) => (
                            <Link className={styles.link} to={`/person/${person.name}`}>
                                <div className={styles.person} key={person.name}>
                                    {person.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Pagination
                className={styles.pagination}
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />
        </div>
    )
}