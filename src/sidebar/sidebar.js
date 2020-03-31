import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            addingNote: false,
            title: null
        }
    }
    

    render() {

        const {notes,classes,selectedNoteIndex} = this.props;
        if(notes){
            return (
                <div className={classes.sidebarContainer}>
                    <Button
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}
                    >{this.state.addingNote ? 'Cancel' : 'New Note'}</Button>
                    {
                        this.state.addingNote ?
                        <div>
                            <input type="text"
                                className = {classes.newNoteInput}
                                placeholder='Enter Note Title'
                                onKeyUp={(e) => this.updateTitle(e.target.value)}
                            />
                            <Button 
                                className={classes.newNoteSubmitBtn}
                                onClick={this.newNote}>
                                   Submit Button 
                            </Button>
                        </div> :
                        null
                    }
                    <List>
                        {
                            notes.map((_note,_index)=>{
                                return (
                                    <div key={_index}>
                                        <SidebarItemComponent
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={this.selectNote}
                                        deleteNote={this.deleteNote}>
                                        </SidebarItemComponent>
                                        <Divider></Divider>
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }

    newNoteBtnClick = () => {
        console.log(`NEW BTN CLICKED`)
        this.setState({title: null,addingNote: !this.state.addingNote})
    }

    updateTitle = (txt) => {
        // console.log(`Here it is: ${txt}`)
        this.setState({title:txt})
    }

    newNote =() =>{
        this.props.newNote(this.state.title);
        this.setState({title: null,addingNote: false})
    }

    selectNote =(_note,_index) => {
        this.props.selectNote(_note,_index);
    }

    deleteNote =(_note) => {
        this.props.deleteNote(_note);
    }
}

export default withStyles(styles)(SidebarComponent)
