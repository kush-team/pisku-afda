import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		var cards = [];
		var piezas = ['piezas-1', 'piezas-2', 'piezas-3'];

		piezas.forEach(function (pieza) {
			cards.push(this.store.createRecord('card', {className: pieza, flipped: false, bloked: false}));
			cards.push(this.store.createRecord('card', {className: pieza, flipped: false, bloked: false}));
		}, this);

		return this.suffle(this.suffle(this.suffle(cards)));
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
