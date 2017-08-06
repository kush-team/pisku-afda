import DS from 'ember-data';

export default DS.Model.extend({
	className: DS.attr('string'),
	flipped: DS.attr('boolean'),
	bloked: DS.attr('boolean'),
});
