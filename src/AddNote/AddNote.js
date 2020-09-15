import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddNote extends React.Component{
    static contextType = ApiContext
  
    constructor() {
    super()
    this.state={
      name: { value: '', touched: false },
      content: { value: '', touched: false },
      folder: { value: '' }
    }
  }

  updateName = (name) => {
    this.setState({ name: { value: name, touched: true } })
  }

  updateContent = (content) => {
    this.setState({ content: { value: content, touched: true } })
  }

  updateFolder = (id) => {
    this.setState({ folder: { value: id, touched: true } })
  }

  renderFolders = () => {
    return this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      )
    })
  }

  validateNoteName () {
    const { value, touched } = this.state.name
    return typeof value === 'string' & value.length > 0 && touched
  }

  validateFolder = () => {
    return this.state.folder.value
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const { name, content, folder } = this.state
      const options =  {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            content: content.value,
            folderId: folder.value,
            modified: new Date(Date.now())
          })
    }
      fetch(`${config.API_ENDPOINT}/notes`, options)
          .then(res => {
              if (!res.ok) {
                  return res.json().then(e => Promise.reject(e))
              }
              return res.json()
          })
          .then(res => this.context.addNote(res))
          .then(this.props.history.push('/'))
          .catch(error => {
              console.error({ error })
          })
  }

    render() {
        return (
            <form className='addNote' onSubmit={(e) => this.handleSubmit(e)}>
                <input name='name' type='text' placeholder='Add note title'onChange={(e) => this.updateName(e.target.value)} required/>
                {this.state.name.touched && !this.validateNoteName()
                ? <p>Name required</p> 
                : null
                }
                <br />
                <textarea placeholder='Add description' onChange={(e) => this.updateContent(e.target.value)}/>
                <div>
                    <select name='folder' onChange={(e) => this.updateFolder(e.target.value)} required>
                        <option value=''>
                            Pick a destination
                        </option>
                        {this.renderFolders()}
                    </select>
                    {this.state.folder.touched && !this.validateFolder()
                    ? <p>Folder required</p>
                    : null
                    }
                    <button disabled={!this.validateNoteName || !this.validateFolder} type='submit'>Submit</button>
                </div>
            </form>
        )
    }
}