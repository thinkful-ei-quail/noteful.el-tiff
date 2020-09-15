import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddFolder extends React.Component {

    static contextType = ApiContext

    handleSubmit = (e) => {
        e.preventDefault()
        const folderName = e.target.name.value
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({name: folderName})
        }
        fetch(`${config.API_ENDPOINT}/folders`, options)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(res => this.context.addFolder(res))
            .then(this.props.history.push('/'))
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        return (
            <form className='addFolder' onSubmit={(e) => this.handleSubmit(e)}>
                <input name='name' type='text' placeholder='Folder Name' required/>
                <button type='submit'>Submit</button>
            </form>
        )
    }
}