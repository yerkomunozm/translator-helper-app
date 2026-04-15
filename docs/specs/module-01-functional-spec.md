# Especificación funcional

## Nombre del módulo

Módulo 01: carga inicial de guías PDF para flujo de traducción.

## Flujo funcional

1. El usuario selecciona un archivo `.pdf`.
2. El sistema valida que exista un archivo seleccionado.
3. El sistema valida extensión `.pdf`, MIME type cuando el navegador lo informa, tamaño máximo permitido y que el archivo no esté vacío.
4. El sistema muestra estado de carga o procesamiento inicial.
5. Si el archivo es válido, el sistema lo guarda en el estado de la pantalla y habilita el avance al siguiente paso.
6. Si el archivo no es válido, el sistema muestra un error claro y bloquea el avance.

## Componentes funcionales

### 1. Carga de documento PDF

Responsabilidad:

- Permitir seleccionar y cargar un archivo `.pdf`.

Reglas:

- El selector debe restringir la selección a archivos `.pdf` desde la UI.
- El input debe tener un label claro y usable con teclado.

### 2. Validación de archivo

Responsabilidad:

- Validar el archivo seleccionado antes de permitir continuar.

Reglas:

- Debe existir un archivo seleccionado.
- El archivo debe tener extensión `.pdf`.
- El sistema debe validar MIME type `application/pdf` cuando el navegador lo entregue.
- El archivo no debe estar vacío.
- El archivo no debe superar el tamaño máximo definido por la aplicación.

### 3. Estado visual del flujo

Responsabilidad:

- Informar al usuario el estado actual de la carga inicial.

Comportamientos esperados:

- Mostrar un estado inicial sin archivo cargado.
- Mostrar un estado de carga o procesamiento inicial cuando corresponda.
- Mostrar mensajes de error claros y visibles.
- Mostrar confirmación visual cuando el archivo quede válido.

### 4. Preparación para el siguiente paso

Responsabilidad:

- Dejar el archivo válido disponible para el siguiente paso del flujo.

Reglas:

- El archivo válido debe guardarse en el estado de la pantalla.
- El usuario no debe poder continuar si no existe un archivo válido.
- Esta historia no extrae contenido del PDF ni ejecuta análisis todavía.

## Historia de usuario

### HU-01

Como traductor, quiero subir un archivo PDF con instrucciones de traducción para iniciar el flujo desde el documento entregado por el cliente.

Criterios de aceptación:

- Puedo cargar un `.pdf` válido.
- El sistema rechaza formatos no soportados con un mensaje claro.
- Veo el estado de carga o procesamiento inicial.
- Veo una confirmación visual del archivo cargado.
- El archivo válido queda disponible para el siguiente paso del flujo.
- No puedo continuar si el archivo no es válido.

## Estados del flujo

- `idle`: no hay archivo seleccionado.
- `file_selected`: existe un archivo elegido y se prepara la validación o visualización de sus datos básicos.
- `processing`: el sistema muestra carga o procesamiento inicial.
- `ready_to_continue`: el archivo fue validado y quedó listo para el siguiente paso.
- `error`: ocurrió un error de validación o de procesamiento inicial.

## Manejo de errores

- Archivo no seleccionado.
- Formato no soportado.
- MIME type inválido cuando exista información de tipo.
- Archivo vacío.
- Archivo que supera el tamaño máximo permitido.
- Error inesperado al validar el archivo.

Mensajes esperados:

- "Solo se permiten archivos PDF".
- "El archivo está vacío".
- "El archivo supera el tamaño máximo permitido".
- "No se pudo validar el archivo seleccionado".

## Criterios de salida aceptable

La salida de esta historia debe:

- Confirmar que el usuario pudo seleccionar un `.pdf`.
- Validar correctamente el archivo antes de avanzar.
- Mostrar errores claros cuando corresponda.
- Mantener el archivo válido en estado para el siguiente paso.
- Bloquear el avance cuando no haya un archivo válido.

Esta historia no incluye:

- Extracción de texto.
- Edición de contenido fuente.
- Análisis con IA.
- Generación de instrucciones estilo prompt.
