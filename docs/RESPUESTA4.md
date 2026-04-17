# RECUPERACIÓN DE AUDIOS POR CIERRE DE SESIÓN (PERSISTENCIA)

## ¿Qué se ha implementado?
Se ha implementado la persistencia de los audios grabados entre sesiones 
usando AsyncStorage. De esta forma, al cerrar y volver a abrir la app, 
los audios grabados anteriormente siguen disponibles.

## ¿Cómo funciona?

### 1. StorageService
Se ha creado un servicio genérico para gestionar el guardado y recuperación 
de datos con AsyncStorage. Contiene métodos genéricos reutilizables y métodos 
específicos para audios:

#### métodos genéricos
const save = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const get = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

#### Métodos específicos para audios
const saveAudios = (audios: string[]) => save('audios', audios);
const getAudios = () => get('audios');


### 2. Guardado al parar la grabación
Cuando el usuario para la grabación, la URI del audio se guarda 
automáticamente en AsyncStorage:


await audioRecorder.stop();
const uri = audioRecorder.uri;
const newAudio = { id: Date.now().toString(), uri };
const updatedAudios = [newAudio, ...audios];
setAudios(updatedAudios);
await StorageService.saveAudios(updatedAudios);


### 3. Recuperación al abrir la app
Al montar el componente, un `useEffect` recupera automáticamente los 
audios guardados en sesiones anteriores:


useEffect(() => {
  const loadAudios = async () => {
    const saved = await StorageService.getAudios();
    if (saved) setAudios(saved);
  };
  loadAudios();
}, []);


El array vacío `[]` como dependencia garantiza que solo se ejecuta 
una vez, al arrancar la app.

## Demostración gráfica: 

Es necesario que usted descargue el vídeo a continuación:
![Video-Demostracion](../assets/video.mov)
