import style from './UsersPage.module.css'
import { useState, useEffect } from 'react';
import { Search } from '../../components/SearchComponent/Search';

export function UsersPage() {
    const [users, setUsers] = useState([]);
    async function fetchUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        setUsers(users);
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const [query, setQuery] = useState('');
    function handleChange(e) {
        setQuery(e.target.value);
    }
    const filteredProducts = users.filter((user) => {
        return user.name.toLowerCase().includes(query.toLowerCase());
    })
    return (
        <>

            <div className="container mt110">
                <Search handleChange={handleChange} />
                <div className={style.flex}>
                    {
                        filteredProducts.length ?
                            filteredProducts.map((user) => {
                                return (
                                    <>
                                        <div key={user.id} className={style.item}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
                                            <div className="user">{user.name}</div>
                                        </div>
                                    </>
                                )
                            })
                            :
                            <p className="error">Ничего не найдено по запросу "{query}"</p>
                    }

                </div>
            </div>
        </>
    )
}