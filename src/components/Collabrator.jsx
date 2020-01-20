import React from 'react';
import {connect } from 'react-redux';
import { Card } from '@material-ui/core';
import '../styles/displayNotes.scss';

function Collabrator() {
    return (
        <Card id={props.reduxState.state.displayCardList} style={{ background: props.note.color }}>
        <div className='create-note-card'>
            {/* <Typography
                className={classes.inputTitle}
                onClick={handleEditClose}
            >{props.note.title}</Typography>

            {props.note.isPined ?
                <img src={Pin} className='pin-icon' onClick={handleSetPin} />
                :
                <img src={Unpin} className='pin-icon' onClick={handleSetPin} />
            }
        </div>
        {values.isCheckList ?
            <NewCheckList />
            :
            <Typography
                className={classes.inputTitle}
                onClick={handleEditClose}
            >{props.note.description}</Typography>
        }
        <div style={{ padding: '10px' }}>
            {label}
        </div>
        <div style={{ padding: '10px' }}>
            {reminderChip}
        </div>
        {!props.note.isDeleted ?

            <div className='display-icons-div'>
                {/* <ReminderIcon className='icons-padding' className={classes.svgIcon} /> */}
              {/*  <Reminder
                    handleSetReminder={handleSetReminder}
                />

                <PersonAdd className='icons-padding' className={classes.svgIcon} />
                <Color className='icons-padding' className={classes.svgIcon}
                    onClick={changeNoteColor}
                // onMouseLeave={() => colorMenuRef.current.handleClose()}
                />
                <Image className='icons-padding' className={classes.svgIcon} />
                {props.note.isArchived ?
                    <Tooltip title='Unarchive'>
                        <Unarchive className='icons-padding' className={classes.svgIcon} onClick={handleSetArchive} />
                    </Tooltip>
                    :
                    <Tooltip title='Archive'>
                        <Archive className='icons-padding' className={classes.svgIcon} onClick={handleSetArchive} />
                    </Tooltip>

                }
                <More className='icons-padding' className={classes.svgIcon}
                    onClick={(event) => labelMenuRef.current.handleOpenMenu(event)}
                />
            </div>
            :
            <div className='display-bin-icons-div'>
                <Tooltip title='Delete forever'>
                    <DeleteForeverIcon className='icons-padding' className={classes.svgIcon} onClick={handleDeleteForever} />
                </Tooltip>
                <Tooltip title='Restore'>
                    <RestoreFromTrashIcon className='icons-padding' className={classes.svgIcon} onClick={handleRestore} />
                </Tooltip> */}
            </div>
    </Card>
    )
}

const mapStateToProps = (state) => {

    return {
        reduxState: {
            state
        }
    }
}

export default connect(mapStateToProps)(Collabrator);
