import React from 'react'
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddNote extends React.Component{
  constructor() {
    super()
    this.state={
      foldersList:[],
      folderId: null,
      noteTitle: '',
      content: ''
    }
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({noteTitle: e.currentTarget.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/folders/add-folder`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        noteTitle: this.state.noteTitle})
      })
      .then(res => {
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
          })
      .catch(error => {
        console.error({ error })
      })
  }

    render(){
        return (
            <form className='addNote'>
                <input type='text' placeholder='Add note title'/>
                <br />
                <textarea placeholder='Add description'/>
                <div>
                    <select>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                    </select>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        )
    }
}