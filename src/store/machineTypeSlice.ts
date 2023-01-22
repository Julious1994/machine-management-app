import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStorage } from "./storage";

interface Field {
  id: string;
  name: string;
  type: string;
}

export interface MachineType {
  id: string;
  name: string;
  fields: Field[];
  modelField: string;
}

interface MachinesState {
  machines: MachineType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MachinesState = {
  machines: [],
  isLoading: false,
  error: null,
};

const machinesSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    fetchMachinesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMachinesSuccess: (state, action: PayloadAction<MachineType[]>) => {
      state.machines = action.payload;
      state.isLoading = false;
    },
    fetchMachinesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addMachine: (state, action: PayloadAction<MachineType>) => {
      state.machines.push(action.payload);
    },
    updateMachine: (state, action: PayloadAction<MachineType>) => {
      const index = state.machines.findIndex(
        (machine) => machine.id === action.payload.id
      );
      state.machines[index] = action.payload;
    },
    deleteMachine: (state, action: PayloadAction<string>) => {
      const index = state.machines.findIndex(
        (machine) => machine.id === action.payload
      );
      console.log(index);
      state.machines.splice(index, 1);
    },
  },
});

export const {
  fetchMachinesStart,
  fetchMachinesSuccess,
  fetchMachinesError,
  addMachine,
  updateMachine,
  deleteMachine,
} = machinesSlice.actions;

export const fetchMachines = () => async (dispatch: any) => {
  try {
    dispatch(fetchMachinesStart());
    const machines = await getStorage("machineTypes");
    if (machines) {
      dispatch(fetchMachinesSuccess(JSON.parse(machines)));
    } else {
      throw new Error("No machines found in async storage");
    }
  } catch (error: any) {
    dispatch(fetchMachinesError(error.message));
  }
};

export default machinesSlice.reducer;
