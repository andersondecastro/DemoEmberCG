App = Ember.Application.create();

App.Router.map(function() {
  this.resource('cursos', function () {
  	this.route('criar')
  	this.resource('detalhes', { path: '/detalhes-sobre-o-curso/:curso_id' })
  })
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
    	{
    		nome: 'Anderson',
    		profissao: 'Programador'
    	},
    	{
    		nome: 'Ana',
    		profissao: 'Fotografa'
    	}
    ];
  }
});

App.CursosRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('cursos')
	}
});

App.DetalhesRoute = Ember.Route.extend({
	model: function (params) {
		return this.store.find('cursos', params.curso_id);
	}
});

App.CursosCriarController = Ember.Controller.extend({
	ativo: false,

	actions: {
		salvar_novo_curso: function () {
			var curso = this.getProperties('nome','ativo'),
				model = this.get('model'),
				registro = this.store.createRecord('cursos', curso);

			registro.save();

			this.set('nome', '');
		}
	}
});

App.CursosController = Ember.Controller.extend({
	actions: {
		remover_curso : function ( objecto ) {
			this.store.find('cursos', objecto.id).then(function (curso) {
				curso.destroyRecord();
			});
		}
	}
});


App.DetalhesController = Ember.ObjectController.extend({
	actions: {
		ativar_curso : function () {
			this.set('ativo', 1)
		},

		desativar_curso : function () {
			this.set('ativo', 0)
		}
	}
});



// Data

// App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.LSAdapter.extend();

App.Cursos = DS.Model.extend({
	nome: DS.attr('string'),
	ativo: DS.attr('boolean')
});

App.Curso = DS.Model.extend({
	nome: DS.attr('string'),
	ativo: DS.attr('boolean')
});

App.Cursos.FIXTURES = [
	{
		id: 1,
		nome: 'Biologia',
		ativo: 1
	},
	{
		id: 2,
		nome: 'Medicina',
		ativo: 1
	},
	{
		id: 3,
		nome: 'Analise de Sistemas',
		ativo: 0
	}
];