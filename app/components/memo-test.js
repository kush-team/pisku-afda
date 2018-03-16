import Ember from 'ember';

export default Ember.Component.extend({
	flipCount: 0,
	cardsBloked: false,
	points: 0,
	combo: 0,
	lvlIndex: 0,
	levels: null,

	isFinish: Ember.computed('cards.@each.bloked', function () {
		var cardsBloked = this.get('cards').filterProperty('bloked', true);
		return cardsBloked.length === this.get('cards').length;
	}), 

	currentLevel: Ember.computed('lvlIndex', function () {
		var level = this.get('levels').objectAt(this.get('lvlIndex'));
		return level;
	}),

	cards: Ember.computed('currentLevel', function () {
		var currentLevel = this.get('currentLevel');
		if (currentLevel)
			return currentLevel.get('cards');
		else
			return [];
	}),	

	hasNextLevel: Ember.computed('lvlIndex', function () {
		var nextLevel = this.get('levels').objectAt(this.get('lvlIndex') + 1);

		if (nextLevel) {
			return true;
		}
		else {
			return false;
		}
	}),

	actions: {
		next: function () {
			if (this.get('hasNextLevel')) {
				this.set('lvlIndex', this.get('lvlIndex') + 1);
			}
		},

		flipped: function (card) {
			var _this = this;
			var modifier = this.get('currentLevel').get('comboModifier');

			card.toggleProperty('flipped');
			var flipCount = this.get('cards').filterProperty('flipped', true);
			if (flipCount.length === 2) {
				this.set('cardsBloked', true);
				if (flipCount[0].get('className') === flipCount[1].get('className')) {
					this.set('combo', this.get('combo') + 1);
					this.set('points', this.get('points') + this.get('combo') * modifier)
					flipCount[0].set('bloked', true);
					flipCount[0].set('flipped', false);
					flipCount[1].set('bloked', true);
					flipCount[1].set('flipped', false);
					this.set('cardsBloked', false);
				} else {
					Ember.run.later(function () {
						_this.set('combo', 0);
						flipCount[0].set('flipped', false);
						flipCount[1].set('flipped', false);
						_this.set('cardsBloked', false);
					}, 1100);
				}
			}
		}
	}
});
