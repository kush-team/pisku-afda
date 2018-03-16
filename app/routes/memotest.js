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
				title: 'Nivel Inicial',
				modifier: 50,
				total: 2
			}, {
				name: 'Lvl 2',
				title: 'Nivel Intermedio',
				modifier: 200,
				total: 4
			}, {
				name: 'Lvl 3',
				title: 'Nivel Final',
				modifier: 1000,
				total: 8
			}]
		};

		var levels = [];
		data.levels.forEach(function (lvl) {
			levels.push(store.createRecord('level', {
				name: lvl.name,
				title: lvl.title,
				total: lvl.total,
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
