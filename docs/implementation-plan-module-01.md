# Plan de implementación

## Objetivo del plan

Describir una secuencia de implementación para el primer módulo sin mezclar esta historia de carga inicial con historias futuras de procesamiento.

## Enfoque propuesto

Construir primero el arranque del flujo con la mínima complejidad técnica viable:

1. Cargar `.pdf`.
2. Validar el archivo.
3. Mostrar estados y errores.
4. Conservar el archivo válido para el siguiente paso.

Esto reduce riesgo temprano y permite validar el comportamiento base antes de avanzar a extracción o análisis del contenido.

## Fases

### Fase 1: definición funcional y UX del flujo

Objetivo:

- Validar el comportamiento de la pantalla y sus estados.

Entregables:

- Definición de estados de UI.
- Criterios de aceptación definitivos.
- Textos y mensajes de error revisados.

### Fase 2: carga y validación de PDF

Objetivo:

- Habilitar la selección y validación confiable del archivo.

Entregables:

- Componente de carga.
- Validación de extensión, MIME type, tamaño y archivo no vacío.
- Manejo de errores de validación.
- Confirmación visual de archivo válido.

### Fase 3: preparación del handoff al siguiente paso

Objetivo:

- Dejar el archivo válido disponible para el flujo posterior.

Entregables:

- Estado de pantalla con archivo válido.
- Lógica de bloqueo de avance sin archivo válido.
- Contrato base para consumo por la siguiente etapa.

### Fase 4: validación y hardening

Objetivo:

- Reducir riesgos de calidad antes de procesar el PDF.

Entregables:

- Tests del componente de carga.
- Revisión de accesibilidad básica.
- Revisión final de textos para asegurar consistencia total con PDF.

## Priorización recomendada

### MVP

- Carga de `.pdf`.
- Validación de archivo.
- Estados visibles de carga y error.
- Conservación del archivo válido.
- Bloqueo de avance cuando no haya archivo válido.

### Post-MVP inmediato

- Procesamiento inicial del PDF.
- Extracción de contenido.
- Revisión o edición del contenido extraído.

### Futuro

- Análisis con IA.
- Generación de instrucciones reutilizables.
- Soporte para otros formatos.

## Dependencias de decisión

Antes de implementar conviene validar:

- Stack frontend a usar.
- Tamaño máximo permitido para PDFs.
- Estrategia de persistencia temporal del archivo válido.
- Forma en que el siguiente paso consumirá ese archivo.

## Riesgos y mitigaciones

- Riesgo: validación insuficiente de archivos incorrectos.
- Mitigación: combinar validación por extensión, MIME type y tamaño.

- Riesgo: mensajes ambiguos al usuario.
- Mitigación: definir errores explícitos desde la spec.

- Riesgo: mezclar esta historia con extracción de contenido.
- Mitigación: separar claramente la carga inicial del procesamiento posterior.

## Propuesta de siguiente paso

Tras esta alineación documental, el siguiente paso razonable es diseñar la pantalla y el modelo de estados de UI antes de implementar el componente en React.
