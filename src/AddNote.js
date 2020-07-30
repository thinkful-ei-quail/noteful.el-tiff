import React from 'react'

export default class AddNote extends React.Component{
    render(){
        return (
            <form className='addNote'>
                <input type='text' placeholder='Add note title'/>
                <textarea placeholder='Add description'/>
                <div>
                    <select>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                        <option>lfkdg</option>
                    </select>
                    <button>Submit</button>
                </div>
            </form>
        )
    }
}