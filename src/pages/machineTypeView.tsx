import React from "react";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import store, { RootState, useAppDispatch } from "../store";
import {
  fetchMachines,
  addMachine,
  deleteMachine,
  updateMachine,
} from "../store/machineTypeSlice";
import MachineTypeForm from "../components/machineTypeForm";
import { SafeAreaView } from "react-native-safe-area-context";

function MachineTypeView() {
  const dispatch = useAppDispatch();
  const { machines } = useSelector((state: RootState) => state.machineType);
  console.log(machines);
  const handleAddMachineType = () => {
    const machineType = {
      id: new Date().getTime().toString(),
      name: "Machine 1",
      fields: [],
      modelField: "",
    };
    dispatch(addMachine(machineType));
  };

  const handleRemove = (id: string) => {
    console.log(id);
    dispatch(deleteMachine(id));
  };

  const handleUpdate = (machine: any) => {
    console.log(machine);
    dispatch(updateMachine(machine));
  };

  useEffect(() => {
    dispatch(fetchMachines());
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          {machines.map((machine) => {
            return (
              <MachineTypeForm
                onRemove={() => handleRemove(machine.id)}
                machine={machine}
                key={machine.id}
                onUpdate={handleUpdate}
              />
            );
          })}
        </ScrollView>
        <Button
          buttonColor="green"
          textColor="white"
          style={{ borderRadius: 0, padding: 5 }}
          onPress={handleAddMachineType}
        >
          Add New Category
        </Button>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingTop: 100,
  },
  scrollView: {},
});

export default MachineTypeView;
