'use strict';

var TEST_PIPEFY_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo4MjI3MSwiZW1haWwiOiJnY2ZhYnJpQGdtYWlsLmNvbSIsImFwcGxpY2F0aW9uIjozOTg1fX0.Iri2Uu8l-3qBVr1jt8yTl7PJqrXD_eHnyyPcyg5LlCzKv-K3c0pAFRJtC5TQHeIy9m5NyzvmfJDpA6sjDldoIg';

var expect = require('chai').expect;
var pipefy = require('../index')({
  'your_personal_access_token': TEST_PIPEFY_TOKEN
});

describe('Access Token', function() {
  it('should return access token as a string', function() {
    var result = TEST_PIPEFY_TOKEN;
    expect(result).to.be.a('string');
  });
});

describe('Pipefy', function() {

  describe('#getMe', function() {
    it('should return personal info from API', function() {
      return pipefy.getMe()
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.me');
        });
    });
  });

  describe('#getOrganizations', function() {
    it('should return organizations list from API', function() {
      return pipefy.getOrganizations()
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.organizations');

        });
    });
  });

  describe('#getOrganizationById', function() {
    it('should return organization data by id from API', function() {
      return pipefy.getOrganizationById(61313)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.organization');
        });
    });
  });

  describe('#getPipesByIds', function() {
    it('should return pipes data by ids from API', function() {
      return pipefy.getPipesByIds([192725, 192726])
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.pipes');

        });
    });
  });

  describe('#getPipeById', function() {
    it('should return pipe data by id from API', function() {
      return pipefy.getPipeById(192725)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.pipe');

        });
    });
  });

  describe('#getPhaseById', function() {
    it('should return phase data by id from API', function() {
      return pipefy.getPhaseById(1405979)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.phase');
        });
    });
  });

  describe('#getCardsByPipeId', function() {
    it('should return cards data by pipe id from API', function() {
      return pipefy.getCardsByPipeId(193361)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.cards');
        });
    });
  });

  describe('#getCardById', function() {
    it('should return card data by id from API', function() {
      return pipefy.getCardById(2122859)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.card');
        });
    });
  });

  describe('#getPipeRelationByIds', function() {
    it('should return pipe realtion by ids from API', function() {
      return pipefy.getPipeRelationByIds([191546, 191547])
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.pipe_relations');
        });
    });
  });

  describe('#createOrganization', function() {
    it('should return created organization data from API', function() {
      return pipefy.createOrganization({ industry: 'technology', name: 'Inobrax' })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.createOrganization.organization');
        });
    });
  });

  describe('#updateOrganization', function() {
    it('should return updated organization data from API', function() {
      return pipefy.updateOrganization({
        id: 61313,
        name: 'Capsule Corp.',
        only_admin_can_invite_users: true,
        only_admin_can_create_pipes: true,
        force_omniauth_to_normal_users: true
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updateOrganization.organization');
      });
    });
  });

  describe('#deleteOrganization', function() {
    it('should return success on delete organization from API', function() {
      return pipefy.deleteOrganization(1)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deleteOrganization.success');
        });
    });
  });

  describe('#clonePipes', function() {
    it('should return success on clone pipe from API', function() {
      return pipefy.clonePipes({ organization_id: 60993, pipe_template_ids: [192157] })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.clonePipes.pipes');
        });
    });
  });

  describe('#createPipe', function() {
    it('should return created pipe from API', function() {
      return pipefy.createPipe({
        organization_id: 61508,
        name: 'Test project',
        labels: [{
          name: 'Single Label',
          color: '#FF0044'
        }],
        members: [{
          user_id: 1,
          role_name: 'admin'
        }],
        phases: [
          { name: 'Building' },
          { name: 'Built', done: true }
        ],
        start_form_fields: [{
          label: 'Label of Fly Proj.',
          type_id: 'phone'
        }]
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.createPipe.pipe');
      });
    });
  });

  describe('#updatePipe', function() {
    it('should return updated pipe from API', function() {
      return pipefy.updatePipe({
        id: 192726,
        name: 'Cao Project',
        anyone_can_create_card: true,
        public: true,
        only_admin_can_remove_cards: false,
        only_assignees_can_edit_cards: false
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updatePipe.pipe');
      });
    });
  });

  describe('#deletePipe', function() {
    it('should return success on delete pipe from API', function() {
      return pipefy.deletePipe(1)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePipe.success');
        });
    });
  });

  describe('#createPhase', function() {
    it('should return created phase from API', function() {
      return pipefy.createPhase({
        pipe_id: 193342,
        name: 'To Finished',
        description: 'This phase is to be used for cards that are to be finished',
        done: true,
        only_admin_can_move_to_previous: false,
        can_receive_card_directly_from_draft: false
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.createPhase.phase');
      });
    });
  });

  describe('#updatePhase', function() {
    it('should return updated phase from API', function() {
      return pipefy.updatePhase({
        id: 1407509,
        name: 'Available to test',
        only_admin_can_move_to_previous: false,
        can_receive_card_directly_from_draft: true,
        description: 'Im editing this phase'
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updatePhase.phase');
      });
    });
  });

  describe('#deletePhase', function() {
    it('should return success on delete phase from API', function() {
      return pipefy.deletePhase(1)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePhase.success');
        });
    });
  });

  describe('#createPhaseField', function() {
    it('should return create phase field from API', function() {
      return pipefy.createPhaseField({
        phase_id: 1407543,
        type: 'phone',
        label: 'Customer Phone',
        description: 'Customer phone field',
        required: true,
        help: 'Fill up with customer phone number',
        editable: false,
        can_create_database_record: false,
        can_have_multiple_database_records: false,
        sync_with_card: false
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.createPhaseField.phase_field');
      });
    });
  });

  describe('#updatePhaseField', function() {
    it('should return updated phase field from API', function() {
      return pipefy.updatePhaseField({
        id: 'hahaha',
        index: 1.1,
        label: 'Paid Value R$',
        required: false,
        editable: false,
        help: 'Fill this field with paid value (R$)',
        description: 'The Paid Value with currency symbol',
        sync_with_card: true
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updatePhaseField.phase_field');
      });
    });
  });

  describe('#deletePhaseField', function() {
    it('should return success on delete phase field from API', function() {
      return pipefy.deletePhaseField(1)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePhaseField.success');
        });
    });
  });

  describe('#createLabel', function() {
    it('should return created label from API', function() {
      return pipefy.createLabel({ pipe_id: 192426, name: 'My label', color: '#000000' })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.createLabel.label');
        });
    });
  });

  describe('#updateLabel', function() {
    it('should return updated label from API', function() {
      return pipefy.updateLabel({ id: 788509, color: '#000000', name: 'Changed Name Label' })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.updateLabel.label');
        });
    });
  });

  describe('#deleteLabel', function() {
    it('should return success on delete label from API', function() {
      return pipefy.deleteLabel(1).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.deleteLabel.success');
      });
    });
  });

  describe('#createCard', function() {
    it('should return created card from API', function() {
      return pipefy.createCard({
        pipe_id: 192726,
        title: 'Card created by a mutation',
        due_date: '2017-01-15T09:05:06-02:00',
        assignee_ids: [7],
        fields_attributes: [
          { field_id: 'label_name', field_value: 'This is a Field Value' }
        ],
        label_ids: [1]
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.createCard.card');
      });
    });
  });

  describe('#updateCard', function() {
    it('should return updated card from API', function() {
      return pipefy.updateCard({
        id: 2119605,
        title: 'New Title',
        due_date: '2017-01-10T11:15:06-02:00',
        assignee_ids: [5],
        label_ids: [2]
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updateCard.card');
      });
    });
  });

  describe('#deleteCard', function() {
    it('should return success on delete card from API', function() {
      return pipefy.deleteCard(1)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deleteCard.success');
        });
    });
  });

  describe('#moveCardToPhase', function() {
    it('should return moved card from API', function() {
      return pipefy.moveCardToPhase({ card_id: 2124637, destination_phase_id: 1405980 })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.moveCardToPhase.card');
        });
    });
  });

  /*describe('#updateCardField', function() {
    it('should return updated card field', function() {
        return pipefy.updateCardField({ card_id: 2124637, field_id: 'test', new_value: 99 })
        .then(function(result) {
            expect(JSON.parse(result)).to.have.deep.property('data.updateCardField.card');
        });
    });
  });*/

  describe('#createComment', function() {
    it('should return created comment from API', function() {
      return pipefy.createComment({ card_id: 2124637, text: 'I added this comment' })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.createComment.comment');
        });
    });
  });

  describe('#updateComment', function() {
    it('should return updated comment from API', function() {
      return pipefy.updateComment({ id: 312492, text: 'Edit: Im editing this comment' })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.updateComment.comment');
        });
    });
  });

  describe('#deleteComment', function() {
    it('should return success on delete comment from API', function() {
      return pipefy.deleteComment(312492)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deleteComment.success');
        });
    });
  });

  describe('#setRole', function() {
    it('should return member with new role from API', function() {
      return pipefy.setRole({
        pipe_id: 192426,
        organization_id: 60993,
        member: { user_id: 1, role_name: 'admin' }
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.setRole.member');
      });
    });
  });

  describe('#createPipeRelation', function() {
    it('should return created pipe relation from API', function() {
      return pipefy.createPipeRelation({
        parent_id: 193361,
        child_id: 193362,
        name: 'Pipe Connection',
        child_must_exist_to_move_parent: true,
        child_must_exist_to_finish_parent: false,
        all_children_must_be_done_to_finish_parent: true,
        all_children_must_be_done_to_move_parent: true,
        can_create_connected_cards: false,
        can_search_connected_cards: true,
        can_connect_multiple_cards: true
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.createPipeRelation.pipe_relation');
      });
    });
  });

  describe('#updatePipeRelation', function() {
    it('should return updated pipe relation from API', function() {
      return pipefy.updatePipeRelation({
        id: 1,
        name: 'Edit: Pipe Connection',
        child_must_exist_to_move_parent: true,
        child_must_exist_to_finish_parent: false,
        all_children_must_be_done_to_finish_parent: true,
        all_children_must_be_done_to_move_parent: true,
        can_create_connected_cards: false,
        can_search_connected_cards: true,
        can_connect_multiple_cards: true
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updatePipeRelation.pipe_relation');
      });
    });
  });

  describe('#deletePipeRelation', function() {
    it('should return success on delete pipe relation from API', function() {
      return pipefy.deletePipeRelation(1)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePipeRelation.success');
        });
    });
  });



});