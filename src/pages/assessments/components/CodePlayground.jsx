import { useState, useEffect, useRef } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import '@uiw/react-textarea-code-editor/dist.css';

const CodePlayground = ({ language = 'javascript' }) => {
  const [code, setCode] = useState(
    language === 'javascript' 
      ? '// Write your JavaScript code here\nfunction helloWorld() {\n  console.log("Hello, World!");\n  return "Code executed successfully!";\n}\n\nhelloWorld();'
      : language === 'html' 
      ? '<!-- Write your HTML here -->\n<div>\n  <h1>Hello, World!</h1>\n  <p>Edit this code to see changes</p>\n</div>'
      : '// Select a language from the dropdown to start coding.'
  );
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const executeCode = () => {
    setIsLoading(true);
    setOutput('Executing code...');

    // Simulate code execution with a timeout
    setTimeout(() => {
      try {
        if (selectedLanguage === 'javascript') {
          // Create a safe execution environment
          const originalConsoleLog = console.log;
          let logs = [];
          
          console.log = (...args) => {
            logs.push(args.join(' '));
          };

          // Execute the code in a try-catch to handle any errors
          try {
            // Using Function constructor for better security
            const result = new Function(`
              ${code}\n
              return (typeof main === 'function') ? main() : null;
            `)();
            
            let outputText = logs.join('\n');
            if (result !== undefined) {
              outputText += outputText ? '\n' + result : result;
            }
            setOutput(outputText || 'Code executed successfully!');
          } catch (error) {
            setOutput(`Error: ${error.message}`);
          }
          
          // Restore original console.log
          console.log = originalConsoleLog;
        } else if (selectedLanguage === 'html') {
          // For HTML, we'll show a preview
          const iframe = document.createElement('iframe');
          iframe.srcdoc = `
            <!DOCTYPE html>
            <html>
              <head>
                <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
              </head>
              <body>${code}</body>
            </html>
          `;
          
          const outputDiv = document.getElementById('code-output');
          outputDiv.innerHTML = '';
          outputDiv.appendChild(iframe);
          setOutput('HTML preview rendered successfully!');
        } else {
          setOutput('Code execution is only supported for JavaScript and HTML in this demo.');
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const clearOutput = () => {
    setOutput('');
    const outputDiv = document.getElementById('code-output');
    if (outputDiv) {
      outputDiv.innerHTML = '';
    }
  };

  const resetCode = () => {
    if (window.confirm('Are you sure you want to reset the code?')) {
      setCode(
        selectedLanguage === 'javascript' 
          ? '// Write your JavaScript code here\nfunction helloWorld() {\n  console.log("Hello, World!");\n  return "Code executed successfully!";\n}\n\nhelloWorld();'
          : '<!-- Write your HTML here -->\n<div>\n  <h1>Hello, World!</h1>\n  <p>Edit this code to see changes</p>\n</div>'
      );
    }
  };

  useEffect(() => {
    // Reset code when language changes
    setCode(
      selectedLanguage === 'javascript' 
        ? '// Write your JavaScript code here\nfunction helloWorld() {\n  console.log("Hello, World!");\n  return "Code executed successfully!";\n}\n\nhelloWorld();'
        : '<!-- Write your HTML here -->\n<div>\n  <h1>Hello, World!</h1>\n  <p>Edit this code to see changes</p>\n</div>'
    );
    setOutput('');
  }, [selectedLanguage]);

  const editorRef = useRef(null);

  // Focus the editor when component mounts
  useEffect(() => {
    if (editorRef.current) {
      // Focus the textarea directly if available
      const textarea = editorRef.current.querySelector('textarea');
      if (textarea) {
        textarea.focus();
      }
    }
  }, []);

  return (
    <div className="code-playground">
      
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
        </select>
        
        <button
          onClick={executeCode}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
        
        <button
          onClick={clearOutput}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Clear Output
        </button>
        
        <button
          onClick={resetCode}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset Code
        </button>
      </div>
      
      <div className="code-playground__editor bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div ref={editorRef} className="w-full">
          <CodeEditor
            value={code}
            language={selectedLanguage}
            placeholder={`Enter your ${selectedLanguage.toUpperCase()} code here`}
            onChange={(e) => setCode(e.target.value)}
            padding={15}
            style={{
              fontSize: 14,
              backgroundColor: '#f8fafc',
              fontFamily: '"Fira Code", "Fira Mono", "Menlo", "Monaco", "Courier New", monospace',
              minHeight: '200px',
            }}
            data-color-mode="light"
          />
        </div>
      </div>
      
      <div className="code-playground__output-container">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-700">Output</h3>
          <div className="flex gap-2">
            <button
              onClick={clearOutput}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        <div 
          id="code-output"
          className="code-playground__output"
        >
          {output || <span className="text-gray-500">Run your code to see the output here...</span>}
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        <p className="font-medium mb-1">Tips:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use <code className="bg-gray-200 px-1 rounded">console.log()</code> to print output in JavaScript</li>
          <li>For HTML, the preview will show the rendered result</li>
          <li>Click "Run Code" to execute your code</li>
        </ul>
      </div>
    </div>
  );
};

export default CodePlayground;
