import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { MAX_FILE_SIZE_BYTES } from './App';

function createFile(
  name: string,
  options?: { size?: number; type?: string }
) {
  const size = options?.size ?? 1024;
  const type = options?.type ?? 'application/pdf';
  const contents = 'a'.repeat(size);

  return new File([contents], name, { type });
}

describe('App', () => {
  it('accepts a valid PDF and enables continue', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/archivo pdf/i);
    const file = createFile('brief.pdf');

    await user.upload(input, file);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /continuar/i })).toBeEnabled()
    );

    expect(screen.getByText(/archivo válido\. puedes continuar\./i)).toBeInTheDocument();
  });

  it('rejects unsupported formats with a clear message', async () => {
    const user = userEvent.setup({ applyAccept: false });

    render(<App />);

    const input = screen.getByLabelText(/archivo pdf/i);
    const file = createFile('brief.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    await user.upload(input, file);

    expect(screen.getByRole('alert')).toHaveTextContent('Solo se permiten archivos PDF.');
    expect(screen.getByRole('button', { name: /continuar/i })).toBeDisabled();
  });

  it('shows an error when the file is empty', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/archivo pdf/i);
    const file = createFile('empty.pdf', { size: 0 });

    await user.upload(input, file);

    expect(screen.getByRole('alert')).toHaveTextContent('El archivo está vacío.');
  });

  it('shows the selected file name and size', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/archivo pdf/i);
    const file = createFile('client-guide.pdf', { size: 2048 });

    await user.upload(input, file);

    expect(await screen.findByText(/client-guide\.pdf/i)).toBeInTheDocument();
    expect(screen.getByText(/2\.0 kb/i)).toBeInTheDocument();
  });

  it('blocks continue when the file exceeds the max size', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/archivo pdf/i);
    const file = createFile('too-large.pdf', {
      size: MAX_FILE_SIZE_BYTES + 1
    });

    await user.upload(input, file);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'El archivo supera el tamaño máximo permitido.'
    );
    expect(screen.getByRole('button', { name: /continuar/i })).toBeDisabled();
  });
});
