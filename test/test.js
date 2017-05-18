'use strict';

var TEST_PIPEFY_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo4MjI4NywiZW1haWwiOiJzeXMuYWRtaW5AaW5vYnJheC5jb20iLCJhcHBsaWNhdGlvbiI6Mzk4Nn19.fw-Q1lbD9wJbV0sF6hstvp6r0pDkl12UQfTeAJW15B-nr5fIPkWxUYVLFM16flIqXrMCJLBVhRm8vAeOXqBPcQ';

var expect = require('chai').expect;
var pipefy = require('../index')({
  accessToken: TEST_PIPEFY_TOKEN
});

var USER_ID = 82287;

var ORGANIZATION_ID, PIPE_ID, CLONE_PIPE_ID, PIPE_RELATION_ID, LABEL_ID, PHASE_ID, PHASE_FIELD_ID, CARD_ID, COMMENT_ID;

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

  describe('#createOrganization', function() {
    it('should return created organization data from API', function() {
      return pipefy.createOrganization({ industry: 'technology', name: 'DONT DELETE' })
        .then(function(result) {
          var parsedResult = JSON.parse(result);
          ORGANIZATION_ID = parsedResult.data.createOrganization.organization.id;
          expect(parsedResult).to.have.deep.property('data.createOrganization.organization');
        });
    });
  });

  describe('#createPipe', function() {
    it('should return created pipe from API', function() {
      return pipefy.createPipe({
        organization_id: ORGANIZATION_ID,
        name: 'TEST PIPE',
        labels: [{
          name: 'Single Label',
          color: '#FF0044'
        }],
        members: [{
          user_id: USER_ID,
          role_name: 'admin'
        }],
        phases: [
          { name: 'Building', done: false },
          { name: 'Built', done: true }
        ],
        start_form_fields: [{
          label: 'Label of Fly Proj.',
          type_id: 'phone'
        }]
      }).then(function(result) {
        var parsedResult = JSON.parse(result);
        PIPE_ID = parsedResult.data.createPipe.pipe.id;
        expect(parsedResult).to.have.deep.property('data.createPipe.pipe');
      });
    });
  });

  describe('#clonePipes', function() {
    it('should return success on clone pipe from API', function() {
      return pipefy.clonePipes({ organization_id: ORGANIZATION_ID, pipe_template_ids: [PIPE_ID] })
        .then(function(result) {
          var parsedResult = JSON.parse(result);
          CLONE_PIPE_ID = parsedResult.data.clonePipes.pipes[0].id;
          expect(parsedResult).to.have.deep.property('data.clonePipes.pipes');
        });
    });
  });

  describe('#createPipeRelation', function() {
    it('should return created pipe relation from API', function() {
      return pipefy.createPipeRelation({
        parent_id: CLONE_PIPE_ID,
        child_id: PIPE_ID,
        name: 'Pipe Connection',
        child_must_exist_to_move_parent: true,
        child_must_exist_to_finish_parent: false,
        all_children_must_be_done_to_finish_parent: true,
        all_children_must_be_done_to_move_parent: true,
        can_create_connected_cards: false,
        can_search_connected_cards: true,
        can_connect_multiple_cards: true
      }).then(function(result) {
        var parsedResult = JSON.parse(result);
        PIPE_RELATION_ID = parsedResult.data.createPipeRelation.pipe_relation.id;
        expect(parsedResult).to.have.deep.property('data.createPipeRelation.pipe_relation');
      });
    });
  });

  describe('#createLabel', function() {
    it('should return created label from API', function() {
      return pipefy.createLabel({ pipe_id: CLONE_PIPE_ID, name: 'My label', color: '#000000' })
        .then(function(result) {
          var parsedResult = JSON.parse(result);
          LABEL_ID = parsedResult.data.createLabel.label.id;
          expect(parsedResult).to.have.deep.property('data.createLabel.label');
        });
    });
  });

  describe('#createPhase', function() {
    it('should return created phase from API', function() {
      return pipefy.createPhase({
        pipe_id: CLONE_PIPE_ID,
        name: 'To Finished',
        description: 'This phase is to be used for cards that are to be finished',
        done: false,
        only_admin_can_move_to_previous: false,
        can_receive_card_directly_from_draft: true
      }).then(function(result) {
        var parsedResult = JSON.parse(result);
        PHASE_ID = parsedResult.data.createPhase.phase.id;
        expect(parsedResult).to.have.deep.property('data.createPhase.phase');
      });
    });
  });

  describe('#createPhaseField', function() {
    it('should return create phase field from API', function() {
      return pipefy.createPhaseField({
        phase_id: PHASE_ID,
        type: 'phone',
        label: 'Customer Phone',
        description: 'Customer phone field',
        required: false,
        help: 'Fill up with customer phone number',
        editable: false,
        can_create_database_record: false,
        can_have_multiple_database_records: false,
        sync_with_card: true
      }).then(function(result) {
        var parsedResult = JSON.parse(result);
        PHASE_FIELD_ID = parsedResult.data.createPhaseField.phase_field.id;
        expect(parsedResult).to.have.deep.property('data.createPhaseField.phase_field');
      });
    });
  });

  describe('#createCard', function() {
    it('should return created card from API', function() {
      return pipefy.createCard({
        pipe_id: CLONE_PIPE_ID,
        title: 'Card created by Botkit-Inobrax',
        due_date: '2017-05-18T13:05:30-03:00',
        assignee_ids: [USER_ID],
        label_ids: [LABEL_ID]
      }).then(function(result) {
        var parsedResult = JSON.parse(result);
        CARD_ID = parsedResult.data.createCard.card.id;
        expect(parsedResult).to.have.deep.property('data.createCard.card');
      });
    });
  });

  describe('#createComment', function() {
    it('should return created comment from API', function() {
      return pipefy.createComment({ card_id: CARD_ID, text: 'I added this comment' })
        .then(function(result) {
          var parsedResult = JSON.parse(result);
          COMMENT_ID = parsedResult.data.createComment.comment.id;
          expect(parsedResult).to.have.deep.property('data.createComment.comment');
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
      return pipefy.getOrganizationById(ORGANIZATION_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.organization');
        });
    });
  });

  describe('#getPipesByIds', function() {
    it('should return pipes data by ids from API', function() {
      return pipefy.getPipesByIds([PIPE_ID, CLONE_PIPE_ID])
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.pipes');
        });
    });
  });

  describe('#getPipeById', function() {
    it('should return pipe data by id from API', function() {
      return pipefy.getPipeById(PIPE_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.pipe');
        });
    });
  });

  describe('#getPhaseById', function() {
    it('should return phase data by id from API', function() {
      return pipefy.getPhaseById(PHASE_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.phase');
        });
    });
  });

  describe('#getCardsByPipeId', function() {
    it('should return cards data by pipe id from API', function() {
      return pipefy.getCardsByPipeId(PIPE_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.cards');
        });
    });
  });

  describe('#getCardById', function() {
    it('should return card data by id from API', function() {
      return pipefy.getCardById(CARD_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.card');
        });
    });
  });

  describe('#getPipeRelationByIds', function() {
    it('should return pipe realtion by ids from API', function() {
      return pipefy.getPipeRelationByIds([PIPE_ID, CLONE_PIPE_ID])
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.pipe_relations');
        });
    });
  });

  describe('#updateOrganization', function() {
    it('should return updated organization data from API', function() {
      return pipefy.updateOrganization({
        id: ORGANIZATION_ID,
        name: 'Capsule Corp.',
        only_admin_can_invite_users: false,
        only_admin_can_create_pipes: false,
        force_omniauth_to_normal_users: false
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updateOrganization.organization');
      });
    });
  });

  describe('#updatePipe', function() {
    it('should return updated pipe from API', function() {
      return pipefy.updatePipe({
        id: CLONE_PIPE_ID,
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

  describe('#updatePhase', function() {
    it('should return updated phase from API', function() {
      return pipefy.updatePhase({
        id: PHASE_ID,
        name: 'Available to test',
        only_admin_can_move_to_previous: false,
        can_receive_card_directly_from_draft: true,
        description: 'Im editing this phase'
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updatePhase.phase');
      });
    });
  });

  describe('#updatePhaseField', function() {
    it('should return updated phase field from API', function() {
      return pipefy.updatePhaseField({
        id: PHASE_FIELD_ID,
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

  describe('#updateLabel', function() {
    it('should return updated label from API', function() {
      return pipefy.updateLabel({ id: LABEL_ID, color: '#000000', name: 'Changed Name Label' })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.updateLabel.label');
        });
    });
  });

  describe('#updateCard', function() {
    it('should return updated card from API', function() {
      return pipefy.updateCard({
        id: CARD_ID,
        title: 'New Test Card',
        due_date: '2017-01-10T11:15:06-02:00',
        assignee_ids: [USER_ID],
        label_ids: [LABEL_ID]
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updateCard.card');
      });
    });
  });

  describe('#updateComment', function() {
    it('should return updated comment from API', function() {
      return pipefy.updateComment({ id: COMMENT_ID, text: 'Edit: Im editing this comment' })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.updateComment.comment');
        });
    });
  });

  describe('#updatePipeRelation', function() {
    it('should return updated pipe relation from API', function() {
      return pipefy.updatePipeRelation({
        id: PIPE_RELATION_ID,
        name: 'Edit: Pipe Connection',
        child_must_exist_to_move_parent: false,
        child_must_exist_to_finish_parent: false,
        all_children_must_be_done_to_finish_parent: false,
        all_children_must_be_done_to_move_parent: false,
        can_create_connected_cards: true,
        can_search_connected_cards: true,
        can_connect_multiple_cards: true
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.updatePipeRelation.pipe_relation');
      });
    });
  });

  describe('#moveCardToPhase', function() {
    it('should return moved card from API', function() {
      return pipefy.moveCardToPhase({ card_id: CARD_ID, destination_phase_id: PHASE_ID })
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.moveCardToPhase.card');
        });
    });
  });

  describe('#setRole', function() {
    it('should return member with new role from API', function() {
      return pipefy.setRole({
        pipe_id: CLONE_PIPE_ID,
        organization_id: ORGANIZATION_ID,
        member: { user_id: USER_ID, role_name: 'admin' }
      }).then(function(result) {
        expect(JSON.parse(result)).to.have.deep.property('data.setRole.member');
      });
    });
  });

  describe('#deleteComment', function() {
    it('should return success on delete comment from API', function() {
      COMMENT_ID = false ? COMMENT_ID : 1;
      return pipefy.deleteComment(COMMENT_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deleteComment.success');
        });
    });
  });

  describe('#deleteCard', function() {
    it('should return success on delete card from API', function() {
      CARD_ID = false ? CARD_ID : 1;
      return pipefy.deleteCard(CARD_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deleteCard.success');
        });
    });
  });

  describe('#deletePhaseField', function() {
    it('should return success on delete phase field from API', function() {
      PHASE_FIELD_ID = false ? PHASE_FIELD_ID : 1;
      return pipefy.deletePhaseField(PHASE_FIELD_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePhaseField.success');
        });
    });
  });

  describe('#deletePhase', function() {
    it('should return success on delete phase from API', function() {
      PHASE_ID = false ? PHASE_ID : 1;
      return pipefy.deletePhase(PHASE_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePhase.success');
        });
    });
  });

  describe('#deleteLabel', function() {
    it('should return success on delete label from API', function() {
      LABEL_ID = false ? LABEL_ID : 1;
      return pipefy.deleteLabel(LABEL_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deleteLabel.success');
        });
    });
  });

  describe('#deletePipeRelation', function() {
    it('should return success on delete pipe relation from API', function() {
      PIPE_RELATION_ID = false ? PIPE_RELATION_ID : 1;
      return pipefy.deletePipeRelation(PIPE_RELATION_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePipeRelation.success');
        });
    });
  });

  describe('#deletePipe', function() {
    it('should return success on delete pipe from API', function() {
      CLONE_PIPE_ID = false ? CLONE_PIPE_ID : 1;
      return pipefy.deletePipe(CLONE_PIPE_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deletePipe.success');
        });
    });
  });

  describe('#deleteOrganization', function() {
    it('should return success on delete organization from API', function() {
      return pipefy.deleteOrganization(ORGANIZATION_ID)
        .then(function(result) {
          expect(JSON.parse(result)).to.have.deep.property('data.deleteOrganization.success');
        });
    });
  });

});