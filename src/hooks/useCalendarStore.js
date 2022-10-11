import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user }= useSelector(state => state.auth)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        if( calendarEvent.id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent)

            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        }
    }

    const startDeletingEvent = async () => {
        // Todo: Llegar al backend


        dispatch( onDeleteEvent() );
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
