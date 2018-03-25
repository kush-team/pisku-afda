import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		var store = this.store;
		var createCards = this.createCards;
		var suffle = this.suffle;

		var data = {
			cards: ['piezas-1', 'piezas-2', 'piezas-3', 'piezas-4', 'piezas-5', 'piezas-6', 'piezas-7', 'piezas-8'],
			
			levels: [{
				name: 'Lvl 1',
				title: 'Nivel 1 - facil',
				lvlclass: 'nivel-7',
				modifier: 50,
				time: 1511111111,
				total: 8
			}, {
				name: 'Lvl 2',
				title: 'Nivel 2 - facil',
				lvlclass: 'nivel-2',
				modifier: 200,
				time: 30,
				total: 3
			}, {
				name: 'Lvl 3',
				title: 'Nivel 3 - facil',
				lvlclass: 'nivel-3',
				modifier: 200,
				time: 45,
				total: 4
			}, {
				name: 'Lvl 4',
				title: 'Nivel 4 - intermedio',
				lvlclass: 'nivel-4',
				modifier: 200,
				time: 60,
				total: 5
			}, {
				name: 'Lvl 5',
				title: 'Nivel 5 - intermedio',
				lvlclass: 'nivel-5',
				modifier: 200,
				time: 70,
				total: 6
			}, {
				name: 'Lvl 6',
				title: 'Nivel 6 - dificil',
				lvlclass: 'nivel-6',
				modifier: 200,
				time: 80,
				total: 7
			}, {
				name: 'Lvl 7',
				title: 'Nivel 7 - dificil',
				lvlclass: 'nivel-7',
				modifier: 1000,
				time: 90,
				total: 8
			}]
		};

		var levels = [];
		data.levels.forEach(function (lvl) {
			levels.push(store.createRecord('level', {
				name: lvl.name,
				title: lvl.title,
				lvlclass: lvl.lvlclass,
				total: lvl.total,
				time: lvl.time,
				comboModifier: lvl.modifier,
				cards: suffle(suffle(suffle(createCards(data.cards, lvl.total, store))))
			}));
		});
		return levels;
	},

	createCards: function (pieces, total, store) {
		var cards = [];

		pieces.slice(0, total).forEach(function (pieza) {
			cards.push(store.createRecord('card', {className: pieza, flipped: false, bloked: false}));
			cards.push(store.createRecord('card', {className: pieza, flipped: false, bloked: false}));
		}, this);

		return cards;
	},

	suffle: function (arr) {
	    var i, j, temp;
	    for (i = arr.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        temp = arr[i];
	        arr[i] = arr[j];
	        arr[j] = temp;
	    }
	    return arr;    
	}	
});
