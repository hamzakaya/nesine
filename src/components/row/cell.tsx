import React from 'react';

type IProps = { text?: string; className?: string; onClick?: () => void };

const Cell = React.memo(({ text, onClick, className }: IProps) => {
  return (
    <td className={`border border-slate-300 py-2 text-slate-500 text-center text-sm ${className}`} onClick={onClick}>
      {text}
    </td>
  );
});

export default Cell;
