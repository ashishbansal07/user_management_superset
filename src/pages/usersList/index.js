import React, { Fragment, useEffect, useState } from 'react';
import "./usersLists.scss";
import {columns} from "./data";
import {ApiPaths} from "../../config/apiConfig";
import {env} from "../../config/env";
import API from "../../utilities/Api";
import Grid from "../../components/Grid";

function UsersList() {

    const [ users, setUsers] = useState([]);

    const fetchData = () => {
        const options = {
            url: `${env.apiDomain}${ApiPaths.fetchUsers}`
        }
        API.get(options).then(data => {
            setUsers(data.users);
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    useEffect(()=> {
        fetchData();
    }, []);

    return (
        <Fragment>
            <div className="card_container">
                <h1 className="page_title">Users List</h1>
                <Grid
                    columns={columns}
                    data = {users}
                    manualSortBy={true}
                    handleSortingChange={() => {}}
                />
            </div>            
        </Fragment>
    );
}

export default UsersList;
