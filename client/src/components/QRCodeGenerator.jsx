'use client';

import React from 'react';

/**
 * Lightweight SVG QR Code Generator component for NEXLINE Tokens
 */
export default function QRCodeGenerator({ value, size = 120, className = '' }) {
  // Generates a deterministic high-contrast QR visual block using SVG
  const generateMatrix = (text) => {
    const size = 15;
    const matrix = Array.from({ length: size }, () => Array(size).fill(false));
    
    // Finder patterns (corners)
    const addFinder = (row, col) => {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (r === 0 || r === 4 || c === 0 || c === 4 || (r >= 1 && r <= 3 && c >= 1 && c <= 3)) {
            matrix[row + r][col + c] = true;
          }
        }
      }
    };

    addFinder(0, 0);
    addFinder(0, size - 5);
    addFinder(size - 5, 0);

    // Pseudorandom grid based on hash of input text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Skip finder areas
        if ((r < 5 && c < 5) || (r < 5 && c >= size - 5) || (r >= size - 5 && c < 5)) continue;
        const bit = Math.abs((hash ^ (r * 31 + c * 17)) % 3) === 0;
        matrix[r][c] = bit;
      }
    }

    return matrix;
  };

  const matrix = generateMatrix(value || 'NEXLINE-TOKEN');
  const cellSize = size / matrix.length;

  return (
    <div className={`p-2 bg-white rounded-xl shadow-md inline-block ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {matrix.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize - 0.5}
                height={cellSize - 0.5}
                fill="#070F2B"
                rx={1}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
