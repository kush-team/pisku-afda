import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	title: DS.attr('string'),
	total: DS.attr('number'),
	comboModifier: DS.attr('number'),
	cards: DS.hasMany('card')
});
