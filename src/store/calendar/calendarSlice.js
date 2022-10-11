import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        }
    }
});


export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;