import AsyncStorage from '@react-native-async-storage/async-storage';


const save = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error guardando:', error);
  }
};


const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error recuperando:', error);
    return null;
  }
};

// Elimina un valor
const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error eliminando:', error);
  }
};

// Específico: guardar lista de URIs de audios
const saveAudios = (audios: string[]) => save('audios', audios);

// Específico: recuperar lista de URIs de audios
const getAudios = () => get('audios');

export default { save, get, remove, saveAudios, getAudios };