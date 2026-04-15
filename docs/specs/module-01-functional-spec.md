# Especificación funcional

## Nombre del módulo

Módulo 01: lector de guías DOCX y generador de instrucciones para IA de traducción.

## Flujo funcional

1. El usuario carga un archivo `.docx`.
2. El sistema valida formato y disponibilidad del archivo.
3. El sistema extrae el contenido textual.
4. El sistema presenta el contenido extraído en un editor.
5. El usuario revisa, corrige o elimina texto irrelevante.
6. El usuario solicita el análisis con IA.
7. El sistema genera un listado estructurado de instrucciones.
8. El usuario revisa y edita la salida final.
9. El usuario copia o exporta el resultado.

## Componentes funcionales

### 1. Carga de documento

Responsabilidad:

- Permitir seleccionar y cargar un archivo `.docx`.

Reglas:

- Solo se acepta `.docx` en esta etapa.
- Si el archivo no puede procesarse, debe mostrarse un error claro.

### 2. Extracción de contenido

Responsabilidad:

- Convertir el `.docx` en texto editable.

Reglas:

- Debe priorizarse el contenido textual útil.
- Debe conservarse la separación básica entre títulos, párrafos y listas cuando sea posible.
- Si existen tablas, su contenido debe extraerse al menos como texto lineal.

### 3. Editor de contenido fuente

Responsabilidad:

- Permitir limpieza y curación del texto previo al análisis.

Acciones del usuario:

- Editar texto.
- Eliminar ruido.
- Añadir notas manuales.
- Reemplazar el contenido completo si lo necesita.

### 4. Análisis con IA

Responsabilidad:

- Detectar reglas de traducción presentes en el contenido.

Debe identificar, cuando existan:

- Tono y registro.
- Audiencia objetivo.
- Terminología preferida o prohibida.
- Reglas de consistencia.
- Tratamiento de marcas, nombres propios y siglas.
- Formato de fechas, números, unidades y puntuación.
- Restricciones de estilo.
- Instrucciones de localización.
- Excepciones o warnings.

### 5. Generación de instrucciones estilo prompt

Responsabilidad:

- Transformar el análisis en una lista operativa para otra IA.

Formato esperado:

- Lista clara de instrucciones accionables.
- Redacción imperativa o directiva.
- Sin ambigüedad innecesaria.
- Preferentemente agrupada por categoría.

### 6. Editor de salida final

Responsabilidad:

- Permitir ajustes finales sobre el prompt generado.

Acciones del usuario:

- Editar.
- Reordenar.
- Eliminar instrucciones.
- Añadir instrucciones manuales.

### 7. Acciones finales

Responsabilidad:

- Facilitar reutilización inmediata.

Acciones:

- Copiar al portapapeles.
- Exportar a texto o markdown en una iteración posterior.

## Historias de usuario

### HU-01

Como traductor, quiero subir una guía `.docx` para no reinterpretarla manualmente cada vez.

Criterios de aceptación:

- Puedo cargar un `.docx` válido.
- Veo el contenido extraído en pantalla.

### HU-02

Como traductor, quiero editar el contenido extraído antes del análisis para eliminar información irrelevante.

Criterios de aceptación:

- Puedo modificar el texto libremente.
- El análisis usa la versión editada y no solo el archivo original.

### HU-03

Como traductor, quiero que la IA convierta la guía en instrucciones concretas para otra IA traductora.

Criterios de aceptación:

- El resultado se entrega como lista de instrucciones.
- El resultado refleja tono, terminología y restricciones si están presentes en la fuente.

### HU-04

Como traductor, quiero editar el resultado final para adaptarlo a un proyecto puntual.

Criterios de aceptación:

- Puedo cambiar, agregar o borrar instrucciones antes de copiar/exportar.

## Estados del flujo

- `idle`: sin archivo cargado.
- `uploading`: archivo en proceso de carga.
- `extracting`: lectura y extracción del `.docx`.
- `ready_for_review`: texto extraído disponible para edición.
- `analyzing`: análisis IA en ejecución.
- `result_ready`: instrucciones generadas.
- `error`: error recuperable en cualquier etapa.

## Manejo de errores

- Archivo inválido o corrupto.
- Documento sin texto legible.
- Error de extracción.
- Error del servicio de IA.
- Resultado de IA vacío o insuficiente.

En todos los casos debe preservarse el trabajo manual del usuario siempre que sea posible.

## Criterios de salida aceptable

La salida final debe:

- Ser legible como prompt reutilizable.
- Estar orientada a traducción.
- Evitar repetir texto original sin síntesis.
- Hacer explícitas las reglas importantes.
- Permitir edición humana posterior.
