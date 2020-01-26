import React, { useState } from 'react';
import { InputBase, createMuiTheme, MuiThemeProvider, Button, ClickAwayListener, CheckBox, Checkbox } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import '../styles/newCheckList.scss';
import '../styles/takeNote.scss';

const theme = createMuiTheme({
    overrides: {
        MuiSvgIcon: {
            root: {
                width: '18px'
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.9rem',
                fontWeight: '100',
                color: 'black'
            }
        }
    }
})

let itemsArray = [];

function NewCheckList() {
    const [values, setValues] = useState({
        listItem: '',
        changeItem: '',
        isItemEnetered: false,
        listItems: []
    });


    const handleChange = event => {
        console.log(event.target.value);
        
        setValues({ ...values, listItem: event.target.value, isItemEnetered: true });
        itemsArray.push(values.event.target.value);
        setValues({ ...values, listItems:itemsArray, listItem:'' });

        console.log('array====>', values);
    };

    const handleClose = () => {
        setValues({ ...values, changeItem: '', isItemEnetered: false });
    }

    const handleClear = () => {
        itemsArray.push(values.changeItem);
        // console.log('array====>', itemsArray);

        setValues({ ...values, changeItem: '', isItemEnetered: false, listItems: itemsArray });
        // console.log('array pushed====>', values.listItems);
    }

    return (
        <div className='check-list-div'>
            <MuiThemeProvider theme={theme}>
                {values.isItemEnetered ?
                    values.listItems.map((data, index) => {
                        <div>
                            <Checkbox className='add-icon'
                                color='default' />
                            <InputBase
                                // placeholder='List item'
                                className='input-base-list'
                                value={data}
                                onChange={handleChange}
                                autoFocus={true}
                            ></InputBase>
                            <ClearOutlinedIcon className='add-icon' onClick={handleClose} />
                        </div>
                    })
                    :
                    null
                }
                <Divider />
                <AddOutlinedIcon className='add-icon' />
                <InputBase
                    placeholder='List item'
                    className='input-base-create'
                    value={values.listItem}
                    onChange={handleChange}
                    onClick={handleClear}
                    autoFocus={true}
                ></InputBase>
                <Divider />
            </MuiThemeProvider>
        </div>
    )
}

export default NewCheckList;
