import Ember from 'ember';

export default Ember.Component.extend({
	flipCount: 0,
	cardsBloked: false,
	points: 0,
	combo: 0,
	lvlIndex: 0,
	levels: null,
	interval: null,
	intervalValue: 1000,
	duration: 0,
	totalPoints: 0,
	isPause: false,




	init: function () {
		this._super();
		this.resetTimers();
	},


	isLost: Ember.computed('duration', 'currentLevel.time', function () {
		if (this.get('duration') >= this.get('currentLevel').get('time')) {
			return true;
		} else {
			return false;
		}
	}),


	isFinish: Ember.computed('isLost', 'isWin', function () {
		if (this.get('isLost') | this.get('isWin')) {

			if (this.get('isWin')) {
				this.set('pointsBonus', this.get('reminder') * this.get('currentLevel').get('comboModifier') / 10);
				this.set('totalPoints', this.get('totalPoints') + this.get('pointsBonus'));
			}
			this.stopTimers();
			return true;
		}
		else {
			return  false;
		}
	}), 

	isWin: Ember.computed('cards.@each.bloked', function () {
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


	reminder: Ember.computed('duration', 'currentLevel.time', function () {
		return this.get('currentLevel').get('time') - this.get('duration');
	}),


	percentTimer: Ember.computed('duration', function () {
		return Math.floor(this.get('duration') / this.get('currentLevel').get('time') * 100);
	}),

	tick: function (scope) {
		scope.set('duration', scope.get('duration') + 1);
	},

	stopTimers: function () {
		var interval  = this.get('interval');
		if (interval) {
			clearInterval(this.get('interval'));
		}		
	},

	resetTimers: function () {
		var scope  = this;
		var interval  = this.get('interval');
		var intervalValue  = this.get('intervalValue');
		var tick = this.tick;
		if (interval) {
			clearInterval(this.get('interval'));
		}
		this.set('duration', 0);

		interval = setInterval(function() {
			tick(scope);
		}, intervalValue);

		this.set('interval', interval);
	},

	actions: {

		next: function () {
			if (this.get('hasNextLevel')) {
				this.set('lvlIndex', this.get('lvlIndex') + 1);
			}
			this.resetTimers();
		},

		pause: function () {
			var interval  = this.get('interval');
			if (interval) {
				clearInterval(this.get('interval'));
			}
			this.set('isPause', true);
		},

		resume: function () {
			var scope  = this;
			var interval  = this.get('interval');
			var intervalValue  = this.get('intervalValue');
			var tick = this.tick;
			if (interval) {
				clearInterval(this.get('interval'));
			}

			interval = setInterval(function() {
				tick(scope);
			}, intervalValue);

			this.set('interval', interval);
			this.set('isPause', false);
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
					this.set('points', this.get('points') + this.get('combo') * modifier);
					this.set('totalPoints', this.get('points'));
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
