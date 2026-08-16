import React from 'react';
import './StatCard.css';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  hint?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, hint }) => (
  <div className="stat-card">
    <div className="stat-card__icon">{icon}</div>
    <div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
      {hint && <div className="stat-card__hint">{hint}</div>}
    </div>
  </div>
);

export default StatCard;
