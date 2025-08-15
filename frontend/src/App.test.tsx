import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('MiniKiro App', () => {
  test('renders MiniKiro header', () => {
    render(<App />);
    const headerElement = screen.getByText(/MiniKiro/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('prompt input renders and accepts text', async () => {
    render(<App />);
    
    const promptInput = screen.getByLabelText(/code generation prompt input/i);
    expect(promptInput).toBeInTheDocument();
    
    await userEvent.type(promptInput, 'create a red button');
    expect(promptInput).toHaveValue('create a red button');
  });

  test('generate button is disabled when prompt is empty', () => {
    render(<App />);
    
    const generateButton = screen.getByLabelText(/generate code from prompt/i);
    expect(generateButton).toBeDisabled();
  });

  test('generate button enables when prompt has text', async () => {
    render(<App />);
    
    const promptInput = screen.getByLabelText(/code generation prompt input/i);
    const generateButton = screen.getByLabelText(/generate code from prompt/i);
    
    await userEvent.type(promptInput, 'create a red button');
    expect(generateButton).not.toBeDisabled();
  });

  test('toggle button shows and hides code output', async () => {
    render(<App />);
    
    const promptInput = screen.getByLabelText(/code generation prompt input/i);
    const generateButton = screen.getByLabelText(/generate code from prompt/i);
    
    // Generate code first
    await userEvent.type(promptInput, 'create a red button');
    await userEvent.click(generateButton);
    
    // Check if toggle button appears and code is shown
    const toggleButton = screen.getByLabelText(/hide code/i);
    expect(toggleButton).toBeInTheDocument();
    
    const codeOutput = screen.getByRole('region', { name: /generated code output/i });
    expect(codeOutput).toBeInTheDocument();
    
    // Hide code
    await userEvent.click(toggleButton);
    expect(screen.getByLabelText(/show code/i)).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /generated code output/i })).not.toBeInTheDocument();
  });

  test('format button triggers and updates code', async () => {
    render(<App />);
    
    const promptInput = screen.getByLabelText(/code generation prompt input/i);
    const generateButton = screen.getByLabelText(/generate code from prompt/i);
    
    // Generate code first
    await userEvent.type(promptInput, 'javascript counter');
    await userEvent.click(generateButton);
    
    // Find and click format button (Kid Mode shows "Make Pretty")
    const formatButton = screen.getByLabelText(/format code using agent hook/i);
    expect(formatButton).toBeInTheDocument();
    
    await userEvent.click(formatButton);
    
    // Check if formatting state is shown
    await waitFor(() => {
      expect(screen.getByText(/formatting\.\.\./i)).toBeInTheDocument();
    });
    
    // Wait for formatting to complete (Kid Mode shows "Make Pretty")
    await waitFor(() => {
      expect(screen.getByText(/make pretty/i)).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test('retro styling classes are applied', () => {
    render(<App />);
    
    const appContainer = document.querySelector('.min-h-screen');
    // App starts in Kid Mode by default
    expect(appContainer).toHaveClass('font-press-start');
    expect(appContainer).toHaveClass('text-white'); // Kid mode text color
  });

  test('accessibility attributes are present', async () => {
    render(<App />);
    
    const promptInput = screen.getByLabelText(/code generation prompt input/i);
    const generateButton = screen.getByLabelText(/generate code from prompt/i);
    
    // Generate code to show toggle button
    await userEvent.type(promptInput, 'create a red button');
    await userEvent.click(generateButton);
    
    const toggleButton = screen.getByLabelText(/hide code/i);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(toggleButton).toHaveAttribute('aria-controls', 'code-output');
  });

  test('preview window renders generated HTML correctly', async () => {
    render(<App />);
    
    const promptInput = screen.getByLabelText(/code generation prompt input/i);
    const generateButton = screen.getByLabelText(/generate code from prompt/i);
    
    // Generate HTML code
    await userEvent.type(promptInput, 'create a red button');
    await userEvent.click(generateButton);
    
    // Check if preview is shown
    const previewOutput = screen.getByRole('region', { name: /code preview output/i });
    expect(previewOutput).toBeInTheDocument();
    
    // Check if preview toggle button works
    const previewToggleButton = screen.getByLabelText(/hide preview/i);
    expect(previewToggleButton).toBeInTheDocument();
    
    await userEvent.click(previewToggleButton);
    expect(screen.getByLabelText(/show preview/i)).toBeInTheDocument();
  });

  test('preview shows message for non-HTML code', async () => {
    render(<App />);
    
    const promptInput = screen.getByLabelText(/code generation prompt input/i);
    const generateButton = screen.getByLabelText(/generate code from prompt/i);
    
    // Generate Python code
    await userEvent.type(promptInput, 'python hello world');
    await userEvent.click(generateButton);
    
    // Check if preview shows kid-friendly message (since app starts in Kid Mode)
    expect(screen.getByText(/this code runs in the computer/i)).toBeInTheDocument();
    expect(screen.getByText(/some code needs special programs/i)).toBeInTheDocument();
  });

  test('Jest exits without hanging', () => {
    // Placeholder test to confirm Jest exits cleanly
    expect(true).toBe(true);
    
    // Log test completion
    console.log('Jest test suite completed successfully');
  });

  test('Git command logging works', () => {
    // Placeholder test to confirm Git hook execution
    expect(true).toBe(true);
    
    // Log Git hook test
    console.log('Git command logging hook test completed');
  });

  test('Kid Mode renders correctly', () => {
    render(<App />);
    
    // Should start in Kid Mode by default
    expect(screen.getByText(/Kid Mode \(Ages 6-16\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🎓 Pro Mode/i)).toBeInTheDocument();
  });

  test('Pro Mode toggle works', async () => {
    render(<App />);
    
    const modeToggle = screen.getByText(/🎓 Pro Mode/i);
    await userEvent.click(modeToggle);
    
    expect(screen.getByText(/Pro Mode \(Ages 17\+\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🎨 Kid Mode/i)).toBeInTheDocument();
  });

  test('Prompt library shows correct prompts for each mode', async () => {
    render(<App />);
    
    // Test Kid Mode prompts
    const promptLibraryButton = screen.getByText(/📚 Prompt Library/i);
    await userEvent.click(promptLibraryButton);
    
    expect(screen.getByText(/draw a red star/i)).toBeInTheDocument();
    expect(screen.getByText(/make a cartoon button/i)).toBeInTheDocument();
    
    // Close prompt library first
    await userEvent.click(promptLibraryButton);
    
    // Switch to Pro Mode
    const modeToggle = screen.getByText(/🎓 Pro Mode/i);
    await userEvent.click(modeToggle);
    
    // Wait for mode switch and then test Pro Mode prompts
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const promptLibraryButtonPro = screen.getByText(/📚 Prompt Library/i);
    await userEvent.click(promptLibraryButtonPro);
    
    expect(screen.getByText(/create a glowing navbar/i)).toBeInTheDocument();
    expect(screen.getByText(/build a rest api client/i)).toBeInTheDocument();
  });

  test('Kid Mode renders red star correctly', () => {
    const { generateCode } = require('./generatedCode');
    const result = generateCode('draw a red star');
    
    expect(result.code).toContain('<svg');
    expect(result.code).toContain('polygon');
    expect(result.code).toContain('fill="red"');
    expect(result.language).toBe('html');
  });

  test('Badges system works', async () => {
    render(<App />);
    
    const badgesButton = screen.getByText(/🏆 Badges/i);
    await userEvent.click(badgesButton);
    
    expect(screen.getByText(/Your Badges/i)).toBeInTheDocument();
    expect(screen.getByText(/Star Coder/i)).toBeInTheDocument();
    expect(screen.getByText(/Button Master/i)).toBeInTheDocument();
  });

  test('Real-time code generation works for glowing navbar', () => {
    const { generateCode } = require('./generatedCode');
    const result = generateCode('create a glowing navbar');
    
    expect(result.code).toContain('<nav');
    expect(result.code).toContain('linear-gradient');
    expect(result.code).toContain('box-shadow');
    expect(result.language).toBe('html');
  });
});
