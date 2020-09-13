import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

//listen for event on NoteListNav
//import folderForm input value()
//export to POST /folders endpoint

export default class AddFolder extends React.Component {
  static contextType = ApiContext  
    static defaultProps = {
    history: {
      push: () => {}
    },
  }
    
  constructor(props){
    super(props)
    this.state = {
      folderTitle:''
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({folderTitle: e.currentTarget.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/folders/add-folder`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        folderTitle: this.state.folderTitle})
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
  
    render () {
        return (
          <ApiContext.Consumer> 
            {() => {
                return (
                  <form className='addFolder' onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type='text'placeholder='Folder Name'/>
                    <button>Submit</button>
                  </form> 
                )
            }}
          </ApiContext.Consumer>
        )
    }
}
