import { FruitsItem } from "../FruitsItem/FruitsItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './style.scss';
import React from "react";

type Props = {
  fruits: {
    id: number;
    name: string;
  }[],
  deleteFruits: (id: number) => void,
};

export const FruitsList: React.FC<Props> = ({ fruits, deleteFruits }) => {
  return (
    <div>
      <TransitionGroup>
        {fruits.map(fruit => (
          <CSSTransition key={fruit.id} timeout={500} classNames='item'>
            <FruitsItem fruit={fruit} deleteFruits={deleteFruits} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
