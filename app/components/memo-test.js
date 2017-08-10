import Ember from 'ember';

export default Ember.Component.extend({
	cards: null,
	flipCount: 0,
	cardsBloked: false,

	isFinish: Ember.computed('cards.@each.bloked', function () {
		var cardsBloked = this.get('cards').filterProperty('bloked', true);
		return cardsBloked.length === this.get('cards').length;
	}), 

	actions: {
		flipped: function (card) {
			var _this = this;
			card.toggleProperty('flipped');
			var flipCount = this.get('cards').filterProperty('flipped', true);
			if (flipCount.length === 2) {
				this.set('cardsBloked', true);
				if (flipCount[0].get('className') === flipCount[1].get('className')) {
					flipCount[0].set('bloked', true);
					flipCount[0].set('flipped', false);
					flipCount[1].set('bloked', true);
					flipCount[1].set('flipped', false);
					this.set('cardsBloked', false);
				} else {
					Ember.run.later(function () {
						flipCount[0].set('flipped', false);
						flipCount[1].set('flipped', false);
						_this.set('cardsBloked', false);
					}, 1100);
				}
			}
		}
	}
});
