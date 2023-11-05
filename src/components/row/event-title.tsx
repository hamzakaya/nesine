import React from 'react';

type IProps = { text: JSX.Element; style?: React.CSSProperties };

const EventTitle = React.memo(({ text, style }: IProps) => {
  return (
    <th className="px-6 py-3 whitespace-nowrap w-96" style={style}>
      <div className="flex items-center">
        <div className="text-left">
          <div className="text-sm font-light text-gray-900">{text}</div>
        </div>
      </div>
    </th>
  );
});

export default EventTitle;
