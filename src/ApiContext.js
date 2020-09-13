import React from 'react'

export default React.createContext({
  notes: [],
  folderTitle: '',
  foldersList: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})
