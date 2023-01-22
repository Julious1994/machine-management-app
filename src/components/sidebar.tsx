import { View, Text } from "react-native";
import { Drawer } from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import store, { RootState, useAppDispatch } from "../store";

function Sidebar() {
  const { machines } = useSelector((state: RootState) => state.machineType);

  return (
    <Drawer.Section title="Some title">
      {machines
        .filter((machine) => machine.name)
        .map((machine) => (
          <Drawer.Item
            key={machine.id}
            label={machine.name}
            onPress={() => console.log(machine.name)}
          />
        ))}
      <Drawer.Item label="Second Item" onPress={() => console.log("second")} />
    </Drawer.Section>
  );
}

export default Sidebar;
