import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, icon: Icon, error, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          className={`w-full bg-slate-950 border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-800 group-hover:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-lg py-2.5 ${Icon ? 'pl-9' : 'pl-3'} pr-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
