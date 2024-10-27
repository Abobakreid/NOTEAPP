/* eslint-disable prettier/prettier */
export const Set_note_Info = 'Set_note_Info';
export const Set_color_mode = 'Set_color_mode';

export const setNotes = notes => dispatch => {
  dispatch({
    type: Set_note_Info,
    payload: notes,
  });
};

