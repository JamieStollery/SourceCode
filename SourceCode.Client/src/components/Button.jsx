import React from 'react';

export function ButtonPrimary({ onClick, children, className }) {
  return (
    <Button
      onClick={onClick}
      className={`${className} border-transparent bg-indigo-600 text-white hover:bg-indigo-700`}
    >
      {children}
    </Button>
  );
}

export function ButtonSecondary({ onClick, children, className }) {
  return (
    <Button onClick={onClick} className={`${className} border-gray-300 bg-white text-gray-700 hover:bg-gray-50`}>
      {children}
    </Button>
  );
}

function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} w-full rounded-md border py-2 px-3 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
    >
      {children}
    </button>
  );
}
