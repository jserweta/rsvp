import React from 'react';

export default function InfoRow({
  title,
  details,
  last,
}: {
  title: string;
  details: string[];
  last?: boolean;
}) {
  return (
    <div className="flex flex-row flex-nowrap justify-between gap-5 border-b border-foreground px-2 py-7 last:border-b-0">
      <p className="block flex-1 font-[500] uppercase">{title}</p>
      <p className="block flex-1">
        {details.map((line, index) => (
          <React.Fragment key={index}>
            <span className={index === 0 && !last ? 'font-[500]' : ''}>
              {line}
            </span>
            {index !== details.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
