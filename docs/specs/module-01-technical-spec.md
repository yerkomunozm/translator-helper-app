# Especificación técnica inicial

## Objetivo técnico

Diseñar un módulo desacoplado que permita:

- Ingerir archivos `.pdf`.
- Validar el archivo en frontend antes de continuar.
- Mantener trazabilidad entre el archivo original y el estado del flujo.
- Dejar preparado el contrato para un procesamiento posterior del documento.

## Arquitectura lógica propuesta

### Bloques principales

1. `PDF Intake`
2. `File Validation`
3. `Upload State Workspace`
4. `Next Step Handoff`

## Modelo conceptual de datos

### `SourceDocument`

- `id`
- `file_name`
- `mime_type`
- `file_size`
- `uploaded_at`
- `original_file_ref`
- `status`

### `UploadValidationResult`

- `is_valid`
- `error_code`
- `error_message`
- `validated_at`

## Contratos funcionales propuestos

### Entrada del flujo

Debe recibir:

- Un objeto `File` seleccionado por el usuario.
- Metadatos derivados del archivo: nombre, MIME type y tamaño.

### Salida de esta historia

Debe devolver o conservar:

- El archivo válido en estado para el siguiente paso.
- Un estado de flujo normalizado.
- Un error normalizado cuando la validación falle.

## Decisiones técnicas iniciales

### Ingesta de PDF

Primera iteración:

- Restringir la selección desde la UI a archivos `.pdf`.
- Validar extensión y MIME type cuando el navegador lo informe.
- Validar archivo no vacío.
- Validar tamaño máximo definido por producto.

### Contrato para el siguiente paso

Primera iteración:

- No extraer contenido ni parsear el PDF en esta historia.
- Dejar el archivo válido accesible para el siguiente paso del flujo.
- Mantener una estructura de estado que permita agregar procesamiento posterior sin rediseñar la pantalla.

### Persistencia

Primera iteración:

- Puede comenzar con persistencia en estado de pantalla o sesión.
- No requiere almacenamiento permanente en esta historia.

## Consideraciones de calidad

### Observabilidad

- Registrar estados de carga, validación y procesamiento inicial.
- Capturar motivos de rechazo para mostrar mensajes claros.

### Resiliencia

- Preservar el archivo válido en estado mientras el usuario continúe en el flujo.
- Permitir reintentos de selección sin necesidad de recargar toda la pantalla.

### Seguridad y privacidad

- No enviar el archivo a servicios externos en esta historia.
- Limitarse a validaciones locales del archivo seleccionado.

## Riesgos técnicos

- Navegadores que no entreguen MIME type confiable.
- Archivos renombrados con extensión `.pdf` pero tipo incorrecto.
- Estados inconsistentes si la validación y la UI no comparten la misma fuente de verdad.

## Estrategia de validación técnica

### Pruebas del validador

- PDF válido.
- Archivo con extensión no soportada.
- Archivo vacío.
- Archivo que supera tamaño máximo.
- Archivo con MIME inválido cuando exista esa señal.

### Pruebas de flujo

- Selección exitosa.
- Visualización de error.
- Bloqueo de avance sin archivo válido.
- Conservación del archivo válido para el siguiente paso.

## Decisiones abiertas para validación

- Tamaño máximo exacto permitido para el archivo.
- Si el archivo válido se conservará solo en memoria o también en session storage.
- Qué componente o pantalla consumirá el `SourceDocument` en el siguiente paso.
