// /src/stores/generalSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores/store';

// Définition du type d'état
interface GeneralState {
  eventCode: string | null;
}

const initialState: GeneralState = {
  eventCode: null,
};

const slice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    /**
     * Définit ou met à jour le code de l'événement actuellement sélectionné/actif.
     */
    setEventCode: (state, action: PayloadAction<string | null>) => {
      state.eventCode = action.payload;
    },
    
    /**
     * Efface le code de l'événement.
     */
    clearEventCode: (state) => {
      state.eventCode = null;
    }
  },
  // Pas besoin de extraReducers pour cet état simple, car il ne répond à aucune API.
});

// Exportation des actions
export const { setEventCode, clearEventCode } = slice.actions;

// Exportation du reducer
export default slice.reducer;

/**
 * Sélecteur pour récupérer le code de l'événement à partir du store.
 */
export const selectEventCode = (state: RootState) => state.general.eventCode;