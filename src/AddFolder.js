import React, {Component} from 'react';
import ApiContext from './ApiContext'

//listen for event on NoteListNav
//import folderForm input value()
//export to POST /folders endpoint

export default class AddFolder extends Component {

    render () {
  
        return (
            <form className='addFolder'>
                <input onChange={this.handleChange} type='text' placeholder='Folder Name'/>
                <button>Submit</button>
            </form>
        )
    }
}