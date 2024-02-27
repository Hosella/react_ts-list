import React from 'react';
import './style.scss'

type Props = {
  fruit: {
    id: number;
    name: string;
  },
  deleteFruits: (id: number) => void,
};

export const FruitsItem: React.FC<Props> = ({ fruit, deleteFruits }) => {
  return (
    <div className='FruitsItem'>
      <span>{fruit.name}</span>
      <button onClick={() => {deleteFruits(fruit.id)}}>delete</button>
    </div>
  );
}