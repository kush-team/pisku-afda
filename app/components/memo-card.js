import Ember from 'ember';

export default Ember.Component.extend({
	isOpen: false,

	actions: {
	    toggleOpen: function (element) {
	        this.toggleProperty('isOpen');
	    }
	}
});
