import React from 'react';
import style from './DashboardSideBoards.module.scss';
import { ReactComponent as BoardIcon } from '../../../assets/icon-board.svg';
const mokup = [
  'App Launch',
  'Marketing Plan',
  'RoadMap',
  'App Launch',
  'Marketing Plan',
  'RoadMap',
  'App Launch',
  'Marketing Plan',
  'RoadMap',
  'App Launch',
  'Marketing Plan',
  'RoadMap',
  'App Launch',
  'Marketing Plan',
  'RoadMap',
  'App Launch',
  'Marketing Plan',
  'RoadMap',
  'App Launch',
  'Marketing Plan',
  'RoadMap',
  'App Launch',
  'Marketing Plan',
  'RoadMap',
];

/* one function for when user select a board 
and another one when user need to create a new board */

const DashboardSideBoards = () => {
  return (
    <div className={style.boards}>
      <h3 className={[style['boards__title'], 'heading-S'].join(' ')}>
        ALL BOARDS (3)
      </h3>
      <ul className={style['boards__list']}>
        {mokup.map((board, index) => {
          return (
            <li className={style['boards__item']} key={index}>
              <BoardIcon />
              <h4 className="heading-M">{board}</h4>
            </li>
          );
        })}
      </ul>
      <button className={[style['boards__addNewBtn'], 'heading-M'].join(' ')}>
        <BoardIcon />
        <span>Create New Board</span>
      </button>
    </div>
  );
};

export default DashboardSideBoards;
