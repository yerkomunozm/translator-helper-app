# Módulo 01: inicio del flujo de traducción desde PDF

## Objetivo

Definir el primer módulo de la aplicación de apoyo a traductores profesionales. Este módulo debe permitir cargar un archivo `.pdf` con instrucciones de cliente, guías de estilo, glosarios o criterios editoriales para iniciar el flujo desde el documento entregado por el cliente.

## Problema a resolver

Los traductores profesionales suelen recibir lineamientos en archivos compartidos por clientes antes de cualquier procesamiento posterior. Si la aplicación no puede iniciar correctamente desde ese documento fuente, el flujo se vuelve frágil, ambiguo y dependiente de pasos manuales innecesarios.

## Resultado esperado

El usuario puede:

1. Subir un archivo `.pdf` con instrucciones de traducción.
2. Recibir validación inmediata del archivo seleccionado.
3. Ver el estado de carga o procesamiento inicial.
4. Confirmar visualmente que el archivo quedó listo para continuar.

## Usuarios objetivo

- Traductores freelance.
- Equipos de localización.
- Project managers lingüísticos.
- Revisores que preparan instrucciones para motores de traducción asistida.

## Alcance de este módulo

Incluye:

- Carga de archivos `.pdf`.
- Validación de existencia, formato, MIME type cuando aplique, tamaño y archivo no vacío.
- Estados visibles de carga o procesamiento inicial.
- Confirmación visual del archivo válido.
- Conservación del archivo válido en el estado de la pantalla para el siguiente paso.

No incluye aún:

- Extracción de contenido del PDF.
- Análisis con IA.
- Edición de contenido extraído.
- Exportación de resultados.
- Soporte para otros formatos distintos de PDF.

## Casos de uso principales

### CU-01: Iniciar el flujo desde un PDF del cliente

El traductor carga un `.pdf` recibido del cliente y deja el archivo listo para el siguiente paso del flujo.

### CU-02: Detectar errores antes de continuar

El traductor recibe mensajes claros cuando el archivo no es válido y evita avanzar con un documento incorrecto o incompleto.

## Requisitos de producto

### Requisitos funcionales

- RF-01: El sistema debe aceptar archivos `.pdf`.
- RF-02: El sistema debe rechazar formatos no soportados con mensaje claro.
- RF-03: El sistema debe validar que el archivo no esté vacío.
- RF-04: El sistema debe validar el tamaño máximo permitido.
- RF-05: El sistema debe validar el MIME type cuando el navegador entregue esa información.
- RF-06: El sistema debe mostrar estado de carga o procesamiento inicial.
- RF-07: El sistema debe conservar el archivo válido para el siguiente paso del flujo.
- RF-08: El sistema no debe permitir continuar sin un archivo válido.

### Requisitos no funcionales

- RNF-01: La interfaz debe priorizar claridad y revisión humana.
- RNF-02: El procesamiento inicial debe ser observable para el usuario.
- RNF-03: El flujo debe ser usable con teclado.
- RNF-04: Los errores deben ser visibles y comprensibles.
- RNF-05: El módulo debe quedar preparado para soportar procesamiento posterior del archivo sin obligar a una nueva selección.

## Entradas y salidas

### Entrada principal

- Archivo `.pdf` con lineamientos lingüísticos o instrucciones de traducción.

### Salidas esperadas

- Validación del archivo seleccionado.
- Estado visual del flujo de carga inicial.
- Referencia al archivo válido disponible para el siguiente paso.

## Criterios de éxito

- El usuario puede iniciar el flujo desde un archivo `.pdf`.
- La aplicación impide avanzar cuando el archivo no cumple las validaciones.
- El usuario comprende el estado actual del proceso y los errores cuando ocurren.

## Riesgos de producto

- Usuarios que intenten cargar formatos no soportados.
- Archivos vacíos o incorrectos con apariencia de PDF.
- Confusión si la aplicación sugiere que ya interpreta el contenido cuando aún no lo hace.

## Supuestos

- Esta primera historia valida y retiene el archivo, pero no interpreta su contenido.
- El procesamiento real del PDF pertenece a una historia posterior.
- El valor principal de esta entrega es asegurar un inicio de flujo claro y confiable.
