# IMPLEMENTACIÓN DE DISEÑO DE PANTALLAS

## Pantalla

![Captura de pantalla de diseño implementado](../assets/Diseño_implementado.jpg)

## ¿Qué hemos hecho para que tenga ese diseño?

Para realizar este diseño en react native, he hecho uso de las etiquetas View de react native,
que igualan a las etiquetas <div> de html (contenedores). También, usé las eitquetas <TouchableOpacity> que simulan las de un botón para realizar el botón de grabación de nuestra
aplicación. Ese botón, al pulsarlo, tendra un cambio en su interior de texto, pasará de "grabar" a 
"parar", indicándole así, al usuario de la app que si pulsa de nuevo el botón terminará de grabar su audio.

Por otro lado, tenemos otras dos etiquetas de texto en nuestra app, aparte de las del botón de grabación que sirven como decoración e identificación de nuestra App, estas son: 

<Text>JoseRecorder</Text> en la esquina superior izquierda, a modo de decoración/nombre de nuestra aplicación -> JoseRecorder. Jose, mi nombre. Y "recorder" (Grabadora) en español, queriendo decir algo como: 
"La grabadora de Jose" 💥🔊🔥 - En mi mente quedó de locos Adri.

Por otro lado, tenemos la etiqueta de texto: <Text>Audios</Text> que simboliza el titulo de la sección de audios que se van guardando, los cuales podemos elimnar o re-escuchar las veces que queramos.

Por penúltimo, pero no menos importante en la parte superior derecha, tenemos hecho un <TouchableOpacity> con el emoticono de la luna representando la funcionalidad que tendrá la aplicación de cambiar de color claro a color oscuro cuando el usuario lo desee.

Por último, la parte inferior de nuestra aplicación de grabadora de audio se encuentra la sección de audios grabados, tal y como se nombró anteriormente, pudiendo reproducir y borrar los audios obtenidos. Se compone de una etiqueta view,