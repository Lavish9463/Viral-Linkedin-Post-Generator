
import React from 'react';
import { VIRAL_STYLES } from '../constants';
import { ViralStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: ViralStyle;
  onStyleChange: (style: ViralStyle) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange, disabled }) => {
  return (
    <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <legend className="sr-only">Select a post style</legend>
      {VIRAL_STYLES.map((style) => (
        <div key={style.value}>
          <input
            type="radio"
            id={style.value}
            name="style-option"
            value={style.value}
            checked={selectedStyle === style.value}
            onChange={() => onStyleChange(style.value)}
            disabled={disabled}
            className="sr-only"
          />
          <label
            htmlFor={style.value}
            className={`
              block w-full cursor-pointer rounded-lg border p-3 text-center text-sm font-semibold
              transition-all duration-200
              ${selectedStyle === style.value
                ? 'bg-brand-primary border-brand-primary text-white ring-2 ring-offset-2 ring-brand-primary'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {style.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default StyleSelector;
