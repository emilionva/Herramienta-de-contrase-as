import React, { useState, useCallback } from 'react';

const generatePassword = (length: number, hasUpper: boolean, hasLower: boolean, hasNumbers: boolean, hasSymbols: boolean) => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  let chars = '';
  if (hasUpper) chars += upper;
  if (hasLower) chars += lower;
  if (hasNumbers) chars += numbers;
  if (hasSymbols) chars += symbols;

  return Array(length)
    .fill(null)
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('');
};

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [hasUpper, setHasUpper] = useState(true);
  const [hasLower, setHasLower] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(true);

  const updatePassword = useCallback(() => {
    const newPassword = generatePassword(length, hasUpper, hasLower, hasNumbers, hasSymbols);
    setPassword(newPassword);
  }, [length, hasUpper, hasLower, hasNumbers, hasSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Contraseña copiada al portapapeles!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Generador de Contraseñas</h1>
        <p className="text-center mb-6">Utilice nuestro generador de contraseñas online para crear al instante una contraseña segura y aleatoria.</p>
        
        <div className="mb-6">
          <div className="flex mb-2">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full p-2 border rounded"
              placeholder="Aquí aparecerá tu contraseña"
            />
          </div>
          <div className="flex mb-4">
            <label>Longitud:</label>
            <input
              type="number"
              value={length}
              min="4"
              max="20"
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hasUpper}
                  onChange={(e) => setHasUpper(e.target.checked)}
                  className="mr-2"
                />
                Mayúsculas
              </label>
            </div>
            <div className="w-1/2 px-2 mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hasLower}
                  onChange={(e) => setHasLower(e.target.checked)}
                  className="mr-2"
                />
                Minúsculas
              </label>
            </div>
            <div className="w-1/2 px-2 mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hasNumbers}
                  onChange={(e) => setHasNumbers(e.target.checked)}
                  className="mr-2"
                />
                Números
              </label>
            </div>
            <div className="w-1/2 px-2 mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hasSymbols}
                  onChange={(e) => setHasSymbols(e.target.checked)}
                  className="mr-2"
                />
                Símbolos
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={updatePassword}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Generar contraseña
        </button>
        <button
          onClick={copyToClipboard}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
        >
          Copiar contraseña
        </button>
      </div>
    </div>
  );
}
