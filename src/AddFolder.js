import React, {Component} from 'react';

//listen for event on NoteListNav
//import folderForm input value()
//export to POST /folders endpoint

export default class AddFolder extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: ''
            }
        }
    }
    render () {
        return (
            <form className='addFolder'>
                <label>
                    <input type='text' placeholder='Folder Name'/>
                    <button>Submit</button>
                </label>
            </form>
        )
    }
}