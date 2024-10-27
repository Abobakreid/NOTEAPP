/* eslint-disable prettier/prettier */
import {Set_note_Info} from './actions';

const initialState = {
  notes: [],
};

const noteInfo = (state = initialState, action) => {
  switch (action.type) {
    case Set_note_Info:
      return {...state, notes: action.payload};
    default:
      return state;
  }
};

export default noteInfo;
