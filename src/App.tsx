import { useEffect, useRef, useState } from 'react';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

type FlowState =
  | 'idle'
  | 'file_selected'
  | 'processing'
  | 'ready_to_continue'
  | 'error';

type ValidationResult =
  | { ok: true }
  | { ok: false; message: string };

function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024 * 1024) {
    return `${Math.max(sizeInBytes / 1024, 0.1).toFixed(1)} KB`;
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isPdfExtension(fileName: string) {
  return fileName.toLowerCase().endsWith('.pdf');
}

function isPdfMimeType(mimeType: string) {
  if (!mimeType) {
    return true;
  }

  return mimeType === 'application/pdf';
}

function validateFile(file: File | undefined): ValidationResult {
  if (!file) {
    return { ok: false, message: 'Debes seleccionar un archivo.' };
  }

  if (!isPdfExtension(file.name) || !isPdfMimeType(file.type)) {
    return { ok: false, message: 'Solo se permiten archivos PDF.' };
  }

  if (file.size === 0) {
    return { ok: false, message: 'El archivo está vacío.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, message: 'El archivo supera el tamaño máximo permitido.' };
  }

  return { ok: true };
}

function App() {
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const processingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (processingTimerRef.current !== null) {
        window.clearTimeout(processingTimerRef.current);
      }
    };
  }, []);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (processingTimerRef.current !== null) {
      window.clearTimeout(processingTimerRef.current);
      processingTimerRef.current = null;
    }

    const nextFile = event.target.files?.[0];
    const validation = validateFile(nextFile);

    if (!validation.ok) {
      setSelectedFile(null);
      setErrorMessage(validation.message);
      setFlowState('error');
      return;
    }

    setSelectedFile(nextFile ?? null);
    setErrorMessage('');
    setFlowState('file_selected');

    processingTimerRef.current = window.setTimeout(() => {
      setFlowState('ready_to_continue');
      processingTimerRef.current = null;
    }, 450);

    setFlowState('processing');
  };

  const statusText = {
    idle: 'Selecciona un PDF para iniciar el flujo.',
    file_selected: 'Archivo seleccionado.',
    processing: 'Validando archivo y preparando el siguiente paso...',
    ready_to_continue: 'Archivo válido. Puedes continuar.',
    error: errorMessage || 'No se pudo validar el archivo seleccionado.'
  }[flowState];

  const canContinue = flowState === 'ready_to_continue' && selectedFile !== null;

  return (
    <main className="app-shell">
      <section className="panel" aria-labelledby="upload-title">
        <p className="eyebrow">Epic 1</p>
        <h1 id="upload-title">Carga inicial de instrucciones PDF</h1>
        <p className="lede">
          Sube el PDF entregado por el cliente. Lo validaremos antes de habilitar el
          siguiente paso del flujo.
        </p>

        <div className="upload-card">
          <label className="field-label" htmlFor="pdf-upload">
            Archivo PDF
          </label>
          <input
            id="pdf-upload"
            name="pdf-upload"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelection}
            aria-describedby="upload-help upload-status"
          />
          <p id="upload-help" className="field-help">
            Formato permitido: PDF. Tamaño máximo: {formatFileSize(MAX_FILE_SIZE_BYTES)}.
          </p>

          <div
            id="upload-status"
            className={`status-banner status-${flowState}`}
            role={flowState === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {statusText}
          </div>

          {selectedFile ? (
            <div className="file-summary" aria-label="Resumen del archivo cargado">
              <h2>Archivo seleccionado</h2>
              <p>
                <strong>Nombre:</strong> {selectedFile.name}
              </p>
              <p>
                <strong>Tamaño:</strong> {formatFileSize(selectedFile.size)}
              </p>
              <p>
                <strong>Estado:</strong>{' '}
                {canContinue ? 'Listo para continuar' : 'Pendiente de validación'}
              </p>
            </div>
          ) : null}

          <div className="actions">
            <button type="button" className="secondary-button">
              Reemplazar archivo
            </button>
            <button type="button" className="primary-button" disabled={!canContinue}>
              Continuar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
export {
  MAX_FILE_SIZE_BYTES,
  formatFileSize,
  isPdfExtension,
  isPdfMimeType,
  validateFile
};
