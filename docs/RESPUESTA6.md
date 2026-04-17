# Ejercicio 6 - Animación propia

## ¿Qué se ha implementado?
Se ha añadido una animación de pulso de color al título **JoseRecorder**. 
El texto cambia suavemente entre blanco y rojo en bucle continuo usando 
**React Native Reanimated**.

## ¿Cómo funciona?

### 1. Valor compartido
Se usa `useSharedValue` para controlar el valor de la animación entre 0 y 1:


const colorValue = useSharedValue(0);


### 2. Inicio de la animación
Con `useEffect` se lanza la animación al montar el componente. 
`withRepeat` hace que se repita infinitamente y `true` indica que 
vuelve hacia atrás (efecto de pulso):


useEffect(() => {
  colorValue.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
}, []);


### 3. Estilo animado
Se usa `useAnimatedStyle` para calcular el color del texto en cada frame 
interpolando entre blanco `rgb(255,255,255)` y rojo `rgb(192,0,0)`:


const animatedTitleStyle = useAnimatedStyle(() => ({
  color: `rgb(
    ${Math.round(255 - colorValue.value * 63)}, 
    ${Math.round(255 - colorValue.value * 255)}, 
    ${Math.round(255 - colorValue.value * 255)}
  )`,
}));


### 4. Aplicar al título
Se sustituye `Text` por `Animated.Text` para poder aplicar el estilo animado:


<Animated.Text style={[styles.title, animatedTitleStyle]}>
  JoseRecorder
</Animated.Text>


