import React from 'react'
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddNote extends React.Component{
    static contextType = ApiContext
  
    constructor() {
    super()
    this.state={
      noteTitle: '',
      content: '',
      folder: ''
    }
  }

  updateTitle = (noteTitle) => {
    this.setState({ noteTitle })
  }

  updateContent = (content) => {
    this.setState({ content })
  }

  updateFolder = (folder) => {
    this.setState({ folder })
  }

  renderFolders = () => {
    return this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.folderTitle}
        </option>
      )
    })
  }

  validateNoteTitle () {
    const value = this.state.noteTitle
  }

  validateFolder = () => {
    return this.state.folder.value
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const { noteTitle, content, folder } = this.state
      fetch(`${config.API_ENDPOINT}/notes`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({
              title: noteTitle.value,
              content: content.value,
              folder: folder.value,
              modified: new Date(Date.now())
            })
      })
          .then(res => {
              if (!res.ok)
                  return res.json().then(e => Promise.reject(e))
              return res.json()
          })
          .then(res => this.context.addNote(res))
          .then(this.props.history.push('/'))
          .catch(error => {
              console.error({ error })
          })
  }

    render(){
        return (
            <form className='addNote' onSubmit={(e) => this.handleSubmit(e)}>
                <input type='text' placeholder='Add note title'onChange={(e) => this.updateTitle(e.target.value)}/>
                <br />
                <textarea placeholder='Add description' onChange={(e) => this.updateContent(e.target.value)}/>
                <div>
                    <select onChange={(e) => this.updateFolder(e.target.value)}>
                        <option value=''>
                            Pick a destination
                            {this.renderFolders}
                        </option>
                    </select>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        )
    }
}