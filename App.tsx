import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Provider, useSelector } from "react-redux";
import { getStorage } from "./src/store/storage";
import store, { RootState, useAppDispatch } from "./src/store";
import { fetchMachines, addMachine } from "./src/store/machineTypeSlice";
import MachineTypeView from "./src/pages/machineTypeView";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Sidebar from "./src/components/sidebar";

function AppContent() {
  const dispatch = useAppDispatch();
  const { ...data } = useSelector((state: RootState) => state.machineType);
  console.log(data);
  useEffect(() => {
    dispatch(fetchMachines());
  }, []);
  return <MachineTypeView />;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
