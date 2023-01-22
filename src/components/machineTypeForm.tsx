import { StyleSheet, View, Modal } from "react-native";
import {
  Dialog,
  TouchableRipple,
  Button,
  Card,
  Text,
  TextInput,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { MachineType } from "../store/machineTypeSlice";
import DropDownPicker from "react-native-dropdown-picker";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function MachineTypeForm({
  machine,
  onRemove,
  onUpdate,
}: {
  machine: MachineType;
  onRemove: () => void;
  onUpdate: (machine: MachineType) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [modelFieldDialog, setModelFieldDialog] = React.useState(false);

  const handleChange = () => {
    console.log("Change");
  };

  const onAddField = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleType = (type: string) => {
    console.log(type);
    const newMachine = {
      ...machine,
      fields: [
        ...machine.fields,
        {
          id: new Date().getTime().toString(),
          name: "",
          type,
        },
      ],
    };
    onUpdate(newMachine);
    setOpen(false);
  };

  const handleTextChange = (text: string, field: typeof machine.fields[0]) => {
    const newMachine = {
      ...machine,
      fields: machine.fields.map((f) => {
        if (f.id === field.id) {
          return {
            ...f,
            name: text,
          };
        }
        return f;
      }),
    };
    onUpdate(newMachine);
  };

  const handleRemoveField = (id: string) => {
    const newMachine = {
      ...machine,
      fields: machine.fields.filter((field) => field.id !== id),
    };
    onUpdate(newMachine);
  };

  const handleCategoryNameChange = (text: string) => {
    const newMachine = {
      ...machine,
      name: text,
    };
    onUpdate(newMachine);
  };

  const handleModelFieldDialogOpen = () => {
    setModelFieldDialog(true);
  };

  const handleModelFieldDialogClose = () => {
    setModelFieldDialog(false);
  };

  const handleModelFieldSelect = (id: string) => {
    const newMachine = {
      ...machine,
      modelField: id,
    };
    onUpdate(newMachine);
  };

  return (
    <React.Fragment>
      <Card style={{ margin: 20, width: "90%" }}>
        <Card.Title title={machine.name} />
        <Card.Content>
          <TextInput
            label="Category name"
            value={machine.name}
            onChangeText={(text) => handleCategoryNameChange(text)}
            style={{ marginBottom: 10 }}
          />
          {machine.fields.map((field) => (
            <View style={styles.machineFieldView}>
              <TextInput
                label="Field"
                value={field.name}
                onChangeText={(text) => handleTextChange(text, field)}
                key={field.id}
                style={{ width: "65%" }}
              />
              <Text
                style={{ textAlign: "center", textTransform: "capitalize" }}
              >
                {field.type}
              </Text>
              <IconButton
                icon="delete"
                onPress={() => handleRemoveField(field.id)}
                iconColor={MD3Colors.error50}
              />
            </View>
          ))}
          <Button onPress={() => handleModelFieldDialogOpen()}>
            Model Field:{" "}
            {
              machine.fields.find((field) => field.id === machine.modelField)
                ?.name
            }
          </Button>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button onPress={() => onAddField()}>Add Field</Button>
            <Button onPress={onRemove}>Remove</Button>
          </View>
        </Card.Content>
      </Card>
      <Modal style={{ zIndex: 9999 }} visible={open} onDismiss={onClose}>
        <Dialog.Title>Select field type</Dialog.Title>
        <Dialog.Content>
          <View>
            {["checkbox", "number", "text", "date"].map((type) => (
              <TouchableRipple
                onPress={() => handleType(type)}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.modalItem}
                key={type}
              >
                <Text style={{ textTransform: "uppercase" }}>{type}</Text>
              </TouchableRipple>
            ))}
          </View>
        </Dialog.Content>
      </Modal>
      {/** model field dialog */}
      <Modal visible={modelFieldDialog} onDismiss={handleModelFieldDialogClose}>
        <Dialog.Title>Select field</Dialog.Title>
        <Dialog.Content>
          <View>
            {machine.fields.map((field) => (
              <TouchableRipple
                onPress={() => handleModelFieldSelect(field.id)}
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.modalItem}
                key={field.id}
              >
                <Text style={{ textTransform: "capitalize" }}>
                  {field.name}
                </Text>
              </TouchableRipple>
            ))}
          </View>
        </Dialog.Content>
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  machineFieldView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default MachineTypeForm;
