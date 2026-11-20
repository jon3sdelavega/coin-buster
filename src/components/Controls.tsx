import React, { useState } from 'react';
import { z } from 'zod';
import { FormFilterData } from '../types/crypto';

const filterSchema = z.object({
  searchQuery: z.string().trim().min(2, { message: 'El término debe tener al menos 2 caracteres.' }),
  currencyOption: z.enum(['usd', 'eur'], { errorMap: () => ({ message: 'Selecciona una moneda válida.' }) }),
});

interface ControlsProps {
  onSearch: (data: FormFilterData) => void;
  onToggleSimulateEmpty: (value: boolean) => void;
  simulateEmpty: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onSearch, onToggleSimulateEmpty, simulateEmpty }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyOption, setCurrencyOption] = useState('usd');
  const [errors, setErrors] = useState<{ searchQuery?: string; currencyOption?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = filterSchema.safeParse({ searchQuery, currencyOption });

    if (!result.success) {
      const formattedErrors: { searchQuery?: string; currencyOption?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'searchQuery') formattedErrors.searchQuery = issue.message;
        if (issue.path[0] === 'currencyOption') formattedErrors.currencyOption = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    onSearch({ searchQuery, currencyOption });
  };

  return (
    <section aria-labelledby="sec-filtro">
      <h2 id="sec-filtro">Filtrar Cotizaciones</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="searchQuery">Buscar criptomoneda:</label>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-describedby={errors.searchQuery ? 'error-search' : undefined}
          />
          {errors.searchQuery && (
            <span id="error-search" className="error-message" role="alert">
              ⚠️ {errors.searchQuery}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="currencyOption">Moneda base:</label>
          <select
            id="currencyOption"
            value={currencyOption}
            onChange={(e) => setCurrencyOption(e.target.value)}
            aria-describedby={errors.currencyOption ? 'error-currency' : undefined}
          >
            <option value="usd">USD - Dólares Estadounidenses</option>
            <option value="eur">EUR - Euros (Próximamente)</option>
          </select>
          {errors.currencyOption && (
            <span id="error-currency" className="error-message" role="alert">
              ⚠️ {errors.currencyOption}
            </span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="simulate-empty">
            <input
              id="simulate-empty"
              type="checkbox"
              checked={simulateEmpty}
              onChange={(e) => onToggleSimulateEmpty(e.target.checked)}
            />
            Simular estado sin resultados (vacío)
          </label>
        </div>

        <button type="submit">Aplicar Filtro</button>
      </form>
    </section>
  );
};