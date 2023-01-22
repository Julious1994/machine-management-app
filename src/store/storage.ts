import storage from "@react-native-async-storage/async-storage";

export const getStorage = async (key: string) => {
  try {
    const value = await storage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const setStorage = async (key: string, value: string) => {
  try {
    await storage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
