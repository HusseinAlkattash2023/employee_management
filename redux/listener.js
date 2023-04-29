import {createListenerMiddleware} from '@reduxjs/toolkit';
import {toggleChangeAction , updateAction} from "./reducer";

const ListenerMiddleware = createListenerMiddleware();

ListenerMiddleware.startListening({
    actionCreator:toggleChangeAction,
    effect:async(action , listenerApi)=>{
        listenerApi.dispatch(updateAction(action.payload))
    }
});

export default ListenerMiddleware;