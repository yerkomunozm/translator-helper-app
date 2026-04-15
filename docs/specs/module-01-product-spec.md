# Módulo 01: Generador de instrucciones de traducción desde DOCX

## Objetivo

Definir el primer módulo de la aplicación de apoyo a traductores profesionales. Este módulo debe permitir cargar un archivo `.docx` con instrucciones de cliente, guías de estilo, glosarios y criterios editoriales, analizar su contenido con IA y generar un listado de instrucciones estilo prompt para reutilizarse en otro flujo de traducción asistida por IA.

## Problema a resolver

Los traductores profesionales suelen recibir lineamientos en documentos Word desestructurados o semi-estructurados. Esos lineamientos contienen decisiones críticas de tono, terminología, exclusiones, audiencia y formato, pero convertirlos manualmente en prompts reutilizables consume tiempo y genera inconsistencias.

## Resultado esperado

El usuario puede:

1. Subir un `.docx` con lineamientos de traducción.
2. Revisar y editar el contenido extraído.
3. Ejecutar un análisis asistido por IA sobre ese contenido.
4. Obtener un listado de instrucciones claras, accionables y reutilizables.
5. Copiar, exportar o reutilizar ese listado como prompt base para otra IA traductora.

## Usuarios objetivo

- Traductores freelance.
- Equipos de localización.
- Project managers lingüísticos.
- Revisores que preparan instrucciones para motores de traducción asistida.

## Alcance de este módulo

Incluye:

- Carga de archivos `.docx`.
- Extracción de texto legible del documento.
- Edición manual del contenido extraído.
- Análisis con IA del contenido textual.
- Generación de instrucciones estructuradas estilo prompt.
- Edición manual del resultado generado.
- Copia/exportación del resultado.

No incluye aún:

- Traducción automática del contenido fuente.
- Memorias de traducción.
- Integraciones CAT tools.
- Versionado avanzado de guías.
- Comparación entre múltiples guías.
- Ingesta de PDF, XLSX o TXT.

## Casos de uso principales

### CU-01: Convertir una guía de estilo a prompt reutilizable

El traductor carga un `.docx` recibido del cliente y obtiene una lista de instrucciones depurada para usar en otra IA.

### CU-02: Corregir extracción antes del análisis

El traductor revisa el texto extraído, corrige secciones erróneas o elimina ruido antes de ejecutar el análisis.

### CU-03: Ajustar la salida final

El traductor edita el prompt sugerido para adaptarlo a un proyecto específico.

## Requisitos de producto

### Requisitos funcionales

- RF-01: El sistema debe aceptar archivos `.docx`.
- RF-02: El sistema debe extraer el contenido textual principal del archivo.
- RF-03: El sistema debe permitir editar el contenido extraído antes del análisis.
- RF-04: El sistema debe analizar el contenido con IA para identificar instrucciones relevantes para traducción.
- RF-05: El sistema debe generar una salida estructurada en formato lista de instrucciones estilo prompt.
- RF-06: El sistema debe permitir editar la salida generada.
- RF-07: El sistema debe permitir copiar la salida al portapapeles.
- RF-08: El sistema debería permitir exportar la salida en texto o markdown en una iteración posterior cercana.

### Requisitos no funcionales

- RNF-01: La interfaz debe priorizar claridad y revisión humana.
- RNF-02: El procesamiento debe ser observable para el usuario: carga, extracción, análisis y resultado.
- RNF-03: La salida debe ser consistente y fácil de reutilizar entre proyectos.
- RNF-04: El sistema debe estar preparado para soportar otros tipos de documentos en módulos futuros.
- RNF-05: El contenido del documento no debe enviarse a análisis sin acción explícita del usuario.

## Entradas y salidas

### Entrada principal

- Archivo `.docx` con lineamientos lingüísticos.

### Salidas esperadas

- Texto extraído editable.
- Listado de instrucciones estilo prompt.
- Versión final editable y copiable/exportable.

## Criterios de éxito

- El usuario puede transformar una guía `.docx` en un prompt usable sin rehacer manualmente el documento.
- La salida generada reduce ambigüedad y ruido respecto al documento original.
- El usuario mantiene control editorial antes y después del análisis con IA.

## Riesgos de producto

- Extracción incompleta de documentos con formato complejo.
- Instrucciones redundantes o contradictorias en el documento fuente.
- Sobreinterpretación por parte de la IA.
- Pérdida de contexto si el documento mezcla guía de estilo con información operativa no lingüística.

## Supuestos

- La primera versión trabajará principalmente con `.docx` textuales y no con documentos fuertemente diagramados.
- El valor principal del módulo está en sintetizar instrucciones, no en preservar el layout original.
- La revisión humana seguirá siendo obligatoria antes de reutilizar el prompt final.
