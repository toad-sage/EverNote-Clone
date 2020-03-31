import React, { Component } from 'react'
import './App.css'
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'

const firebase = require('firebase');

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes:null
    }
  }
  
  componentDidMount = () =>{
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        // console.log(serverUpdate.docs)
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        })
        this.setState({notes: notes});
        console.log(notes);
        if(notes){
          console.log('Eneterd')
          this.selectNote(this.state.notes[0],0);
        }
      })
  }

  selectNote = (_note,_index) =>{
    this.setState({selectedNoteIndex: _index , selectedNote: _note})
  }

  deleteNote = async (_note) =>{
    if(window.confirm(`Are you sure you want to delete: ${_note.title}`)){
      console.log(`delete note`);
      const noteIndex=  this.state.notes.indexOf(_note);
      // console.log('noteindex',noteIndex)
      // await this.setState({ notes: this.state.notes.filter(note => note !== _note) });
      if(this.state.selectedNoteIndex === noteIndex){
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      }else{
       this.state.notes.length > 1 ? 
       this.selectNote(this.state.notes[this.state.selectedNoteIndex ], this.state.selectedNoteIndex ) :
       this.setState({ selectedNoteIndex: null, selectedNote: null });
      }
    }

    await this.setState({ notes: this.state.notes.filter(note => note !== _note) });

    firebase
      .firestore()
      .collection('notes')
      .doc(_note.id)
      .delete();
  }

  newNote = async (title) => {
      const note = {
        title: title,
        body: ''
      }
      const newFromDB = await firebase
        .firestore()
        .collection('notes')
        .add({
          ...note,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

      const newId = newFromDB.id;
      await this.setState({ notes: [...this.state.notes,note] });
      const newNodeIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newId)[0]);
      console.log(newNodeIndex);
      this.setState({ selectedNote: this.state.notes[newNodeIndex], selectedNoteIndex: newNodeIndex });
  }

  noteUpdate = (id,nodeObj) => {
    // console.log(id,nodeObj);
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        ...nodeObj,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  render() {
    return (
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote = {this.newNote}
        />
        {
          this.state.selectedNote ? 
          (<EditorComponent selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          noteUpdate = {this.noteUpdate}
          notes={this.state.notes}/> ): null 
        }
      </div>
    )
  }
}

export default App

