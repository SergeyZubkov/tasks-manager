import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const columns = [
	{
		title: 'Задачи',
		cards: [
			{
				author: 'Костя',
				executor: 'Сергей',
				title: 'Задача 1',
				text: `Lorem ipsum dolor sit amet, 
				consectetur adipisicing elit. 
				Ea error, odio eligendi, saepe, 
				eveniet ratione optio possimus illo 
				soluta inventore eos, neque placeat
				laudantium sunt!`,
				dateCreate: '15/04/17 20:15',
				comments: [
					{
						author: 'Женя',
						text: `Lorem ipsum dolor sit amet, 
						consectetur adipisicing elit. 
						Ratione laudantium, laboriosam ad, 
						nulla ea quis excepturi architecto 
						consequatur.`,
						dateCreate: '15/04/17 20:15'
					},
						{
						author: 'Женя',
						text: `Lorem ipsum dolor sit amet, 
						consectetur adipisicing elit. 
						Ratione laudantium, laboriosam ad, 
						nulla ea quis excepturi architecto 
						consequatur.`,
						dateCreate: '15/04/17 20:15'
					}
				]
			}
		]
	},
	{ 
		title: 'Выполняются',
		cards: [
			{
				author: 'Костя',
				executor: 'Сергей',
				title: 'Задача 1',
				text: `Lorem ipsum dolor sit amet, 
				consectetur adipisicing elit. 
				Ea error, odio eligendi, saepe, 
				eveniet ratione optio possimus illo 
				soluta inventore eos, neque placeat
				laudantium sunt!`,
				dateCreate: '15/04/17 20:15',
				comments: []
			},
			{
				author: 'Витя',
				executor: 'Сергей',
				title: 'Задача 2',
				text: `Lorem ipsum dolor sit amet, 
				consectetur adipisicing elit. 
				Ea error, odio eligendi, saepe, 
				eveniet ratione optio possimus illo 
				soluta inventore eos, neque placeat
				laudantium sunt!`,
				dateCreate: '15/04/17 20:15',
				comments: [
					{
						author: 'Женя',
						text: `Lorem ipsum dolor sit amet, 
						consectetur adipisicing elit. 
						Ratione laudantium, laboriosam ad, 
						nulla ea quis excepturi architecto 
						consequatur.`,
						dateCreate: '15/04/17 20:15'
					},
						{
						author: 'Женя',
						text: `Lorem ipsum dolor sit amet, 
						consectetur adipisicing elit. 
						Ratione laudantium, laboriosam ad, 
						nulla ea quis excepturi architecto 
						consequatur.`,
						dateCreate: '15/04/17 20:15'
					}
				]
			}
		]
	},
	{	
		title: 'Завершенные',
		cards: [
			{
				author: 'Костя',
				executor: 'Сергей',
				title: 'Задача 3',
				text: `Lorem ipsum dolor sit amet, 
				consectetur adipisicing elit. 
				Ea error, odio eligendi, saepe, 
				eveniet ratione optio possimus illo 
				soluta inventore eos, neque placeat
				laudantium sunt!`,
				dateCreate: '15/04/17 20:15',
				comments: []
			}
		]
	},
	{	
		title: 'Замороженные',
		cards: [
			{
				author: 'Костя',
				executor: 'Сергей',
				title: 'Задача 3',
				text: `Lorem ipsum dolor sit amet, 
				consectetur adipisicing elit. 
				Ea error, odio eligendi, saepe, 
				eveniet ratione optio possimus illo 
				soluta inventore eos, neque placeat
				laudantium sunt!`,
				dateCreate: '15/04/17 20:15',
				comments: []
			}
		]
	}
]

ReactDOM.render(<App columns={columns}/>, document.getElementById('root'));
registerServiceWorker();
