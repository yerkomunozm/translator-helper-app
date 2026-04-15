# Especificación técnica inicial

## Objetivo técnico

Diseñar un módulo desacoplado que permita:

- Ingerir archivos `.docx`.
- Extraer contenido textual editable.
- Enviar el texto curado a un motor de análisis IA.
- Recibir una estructura de instrucciones reutilizable.
- Mantener trazabilidad entre documento original, texto editado y resultado generado.

## Arquitectura lógica propuesta

### Bloques principales

1. `Document Ingestion`
2. `DOCX Text Extraction`
3. `Editable Source Workspace`
4. `AI Analysis Orchestrator`
5. `Prompt Instruction Formatter`
6. `Result Editor and Export`

## Modelo conceptual de datos

### `SourceDocument`

- `id`
- `file_name`
- `mime_type`
- `uploaded_at`
- `original_file_ref`
- `status`

### `ExtractedContent`

- `document_id`
- `raw_text`
- `structured_blocks`
- `extraction_warnings`
- `edited_text`
- `edited_at`

### `AnalysisRequest`

- `document_id`
- `input_text`
- `analysis_version`
- `requested_at`
- `status`

### `PromptInstructionSet`

- `document_id`
- `title`
- `instructions`
- `categories`
- `notes`
- `generated_at`
- `edited_result`

## Contratos funcionales propuestos

### Entrada al analizador IA

Debe recibir:

- Texto editado por el usuario.
- Metadatos mínimos del documento.
- Parámetros opcionales de análisis en el futuro.

### Salida del analizador IA

Debe devolver una estructura normalizada, idealmente JSON interno, con campos como:

- `tone_and_register`
- `audience`
- `terminology_preferences`
- `forbidden_terms`
- `formatting_rules`
- `localization_rules`
- `brand_rules`
- `do_not_translate`
- `special_instructions`
- `warnings`
- `final_prompt_instructions`

La UI puede renderizar una vista amigable a partir de esa estructura.

## Decisiones técnicas iniciales

### Extracción de DOCX

Primera iteración:

- Priorizar extracción de texto, párrafos, listas y tablas simples.
- No depender de fidelidad visual completa.
- Mantener una capa adaptadora para poder cambiar la librería de parsing sin afectar el dominio.

### Integración IA

Primera iteración:

- Encapsular la llamada al proveedor IA detrás de un servicio propio.
- Separar prompt de sistema, prompt de análisis y formateo del resultado.
- Diseñar salidas estructuradas para minimizar texto libre difícil de validar.

### Persistencia

Primera iteración:

- Puede comenzar con persistencia local o almacenamiento mínimo según stack elegido.
- Debe quedar preparado para versionar documentos y resultados más adelante.

## Consideraciones de calidad

### Observabilidad

- Registrar estados de carga, extracción y análisis.
- Capturar warnings de extracción y errores del proveedor IA.

### Resiliencia

- Preservar el texto editado si falla el análisis.
- Permitir reintentos de análisis sin volver a cargar el archivo.

### Seguridad y privacidad

- No enviar el archivo binario completo al proveedor IA si no es necesario.
- Enviar solo el texto relevante al análisis.
- Dejar explícito cuándo el usuario dispara una acción que manda contenido al proveedor externo.

## Riesgos técnicos

- DOCX con estructura compleja o tablas anidadas.
- Diferencias entre texto extraído y documento visible al usuario en Word.
- Respuestas de IA no deterministas o demasiado verbosas.
- Necesidad futura de soporte multilenguaje y versionado de prompts.

## Estrategia de validación técnica

### Pruebas del parser DOCX

- Documento simple con párrafos.
- Documento con listas.
- Documento con tablas.
- Documento con encabezados y secciones.
- Documento con contenido vacío o corrupto.

### Pruebas del analizador IA

- Guía de estilo corta.
- Documento largo con ruido operativo.
- Documento con instrucciones contradictorias.
- Documento con glosario y exclusiones.

### Pruebas de flujo

- Carga exitosa.
- Edición antes de análisis.
- Reintento tras error.
- Copia del resultado final.

## Decisiones abiertas para validación

- Si el resultado final se almacenará por proyecto, por documento o por sesión.
- Si la salida exportable debe ser texto plano, markdown o ambos desde la primera entrega.
- Si el usuario podrá definir un template de salida para distintos clientes en una segunda fase.
