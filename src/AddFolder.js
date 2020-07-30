import React, {Component} from 'react';

//listen for event on NoteListNav
//import folderForm input value()
//export to POST /folders endpoint

export default class AddFolder extends Component {
    render () {
        return (
            <form className='addFolder'>
                    <input type='text' placeholder='Folder Name'/>
                    <button onClick={() => console.log('hey')}>Submit</button>
            </form>
        )
    }
}