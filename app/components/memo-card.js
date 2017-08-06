import Ember from 'ember';

export default Ember.Component.extend({
	bloked: false,
	model: null,

	isBloked: Ember.computed('model.bloked', 'bloked', function() {
	  	return	this.get('bloked') || this.get('model').get('bloked');
	}),

	isFlipped: Ember.computed('model.flipped', function () {
		return this.get('model.flipped') || this.get('model.bloked');
	}),

	actions: {
	    toggleOpen: function (element) {
	    	if (!this.get('isBloked')) {
	        	this.sendAction('flipped', this.model);
	    	}
	    }
	}
});
