'use strict';

var request = require('request');
var rp = require('request-promise');
var log = require('loglevel');

function Pipefy(config) {

  if(!config) {
    console.error(`No 'config' parameter specified.`);
  } else if(!config.your_personal_access_token) {
    console.error(`No 'your_personal_access_token' property specified.`);
  }

  if(!config.logLevel) {
    log.setLevel(log.levels.SILENT, false);
  } else {
    log.setLevel(config.logLevel, false);
  }

  var baseUrl = 'https://app.pipefy.com/queries';
  var bearerToken = 'Bearer ' + config.your_personal_access_token;

  this.getMe = function() {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ me { id, name, username, avatar_url, email, locale, time_zone } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getOrganizations = function() {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ organizations{ id, name, pipes { name } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getOrganizationById = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ organization(id: ${id}){ name, pipes { name, phases { name } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getPipesByIds = function(ids) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ pipes(ids: [${ids}]){ id, name, phases{ name, cards(first: 10){ edges{ node{ id, title } } } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getPipeById = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ pipe(id: ${id}){ id, name, phases{ name, cards(first: 1){ edges{ node{ id, title } } } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getPhaseById = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{  phase(id: ${id}){ id name cards_count cards { edges{ node{ id, title } } } fields { id } cards_can_be_moved_to_phases { id name } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getCardsByPipeId = function(pipe_id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ cards(pipe_id: ${pipe_id}) { edges { node { title assignees { id, username } child_relations { name, cards { id } } fields { name, value, phase_field { id } } } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getCardById = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ card(id: ${id}) { title assignees { id, username } child_relations { name, cards { id } } fields { name, value, phase_field { id } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.getPipeRelationByIds = function(ids) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"{ pipe_relations(ids: [${ids}]) { id, name, parent_id, child_id, can_create_connected_cards, can_search_connected_cards, can_connect_multiple_cards, child_must_exist_to_move_parent, child_must_exist_to_finish_parent, all_children_must_be_done_to_finish_parent, all_children_must_be_done_to_move_parent, child_name } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.createOrganization = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { createOrganization(input: {industry: \\"${params.industry}\\", name: \\"${params.name}\\"}){ organization{ id, name } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updateOrganization = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ updateOrganization(input:{id: ${params.id}, name: \\"${params.name}\\", only_admin_can_invite_users: ${params.only_admin_can_invite_users}, only_admin_can_create_pipes: ${params.only_admin_can_create_pipes}, force_omniauth_to_normal_users: ${params.force_omniauth_to_normal_users} }) { organization{ name, only_admin_can_create_pipes, only_admin_can_invite_users, force_omniauth_to_normal_users } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deleteOrganization = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deleteOrganization(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.clonePipes = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ clonePipes(input: {organization_id: ${params.organization_id}, pipe_template_ids:${params.pipe_template_ids}}){ pipes{ id, name } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.createPipe = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ createPipe( input: { organization_id: 60993, name: \\"${params.name}\\", labels:[ { name: \\"${params.labels[0].name}\\", color:\\"${params.labels[0].color}\\" } ], members:[ { user_id: ${params.members[0].user_id}, role_name: \\"${params.members[0].role_name}\\" } ], phases:[ { name:\\"${params.phases[0].name}\\"}, { name: \\"${params.phases[1].name}\\", done: ${params.phases[1].done}} ], start_form_fields:[ { label: \\"${params.start_form_fields[0].label}\\", type_id: \\"${params.start_form_fields[0].type_id}\\" } ] } ) { pipe{ name, members{ user{ username } } phases{ name } start_form_fields { id } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updatePipe = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ updatePipe(input:{ id: ${params.id}, name: \\"${params.name}\\", anyone_can_create_card: ${params.anyone_can_create_card}, public: ${params.public}, only_admin_can_remove_cards: ${params.only_admin_can_remove_cards}, only_assignees_can_edit_cards: ${params.only_assignees_can_edit_cards}}) { pipe{ name public only_assignees_can_edit_cards only_admin_can_remove_cards title_field{ id synced_with_card } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deletePipe = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deletePipe(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.createPhase = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { createPhase(input: {pipe_id: ${params.pipe_id}, name: \\"${params.name}\\", description: \\"${params.description}\\", done: ${params.done}, only_admin_can_move_to_previous: ${params.only_admin_can_move_to_previous}, can_receive_card_directly_from_draft: ${params.can_receive_card_directly_from_draft}}) { phase{ id, name } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updatePhase = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ updatePhase(input:{id: ${params.id}, name: \\"${params.name}\\", only_admin_can_move_to_previous: ${params.only_admin_can_move_to_previous}, can_receive_card_directly_from_draft: ${params.can_receive_card_directly_from_draft}, description: \\"${params.description}\\"  }) { phase{ name, cards_count, cards{ edges{ node{ title } } }, cards_can_be_moved_to_phases{ id, name } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deletePhase = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deletePhase(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };


  this.createPhaseField = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ createPhaseField(input: { phase_id: ${params.phase_id}, type: \\"${params.type}\\", label: \\"${params.label}\\", description: \\"${params.description}\\", required: ${params.required}, help: \\"${params.help}\\", editable: ${params.editable}, can_create_database_record: ${params.can_create_database_record}, can_have_multiple_database_records: ${params.can_have_multiple_database_records}, sync_with_card: ${params.sync_with_card} } ) { phase_field{ id, type, description, phase{ name } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updatePhaseField = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { updatePhaseField(input: {id: \\"${params.id}\\", index: ${params.index}, label: \\"${params.label}\\", required: ${params.required}, editable: ${params.editable}, help: \\"${params.help}\\", description: \\"${params.description}\\", sync_with_card: ${params.sync_with_card}}) { phase_field { id label required description synced_with_card phase { name } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deletePhaseField = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deletePhaseField(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.createLabel = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { createLabel(input: {pipe_id: ${params.pipe_id}, name: \\"${params.name}\\", color: \\"${params.color}\\"}){ label{ id, name, color } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updateLabel = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { updateLabel(input:{id: ${params.id}, color: \\"${params.color}\\", name: \\"${params.name}\\"}){ label{ name, color } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deleteLabel = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deleteLabel(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.createCard = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ createCard(input: {pipe_id: ${params.pipe_id}, title: \\"${params.title}\\", assignee_ids: ${params.assignee_ids}, fields_attributes:{field_id: \\"${params.fields_attributes[0].field_id}\\", field_value: \\"${params.fields_attributes[0].field_value}\\"}}) { card {id, title, due_date, assignees{id, username}, fields {name, value} }}}\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updateCard = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ updateCard(input: {id: ${params.id}, title: \\"${params.title}\\", due_date: \\"${params.due_date}\\", assignee_ids: ${params.assignee_ids}, label_ids: ${params.label_ids}}) { card { title, due_date, assignees { id, username }, labels{ id, name }}}}\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deleteCard = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ deleteCard(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.moveCardToPhase = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ moveCardToPhase(input: {card_id: ${params.card_id}, destination_phase_id: ${params.destination_phase_id}}){ card{ title, current_phase{ id, name } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  /*this.updateCardField = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{ \"query\": \"mutation{ updateCardField(input:{card_id: ${params.card_id}, field_id: \\"${params.field_id}\\", new_value: \"${params.new_value}\"}){ card{ title, current_phase { name, fields {id, label} }, fields{ name, value } } } }\" }`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };*/

  this.createComment = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { createComment(input: {card_id: ${params.card_id}, text: \\"${params.text}\\"}) { comment { id, text } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updateComment = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation{ updateComment(input: {id: ${params.id}, text: \\"${params.text}\\"}){ comment { author_name, text } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deleteComment = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deleteComment(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.setRole = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { setRole(input: {pipe_id: ${params.pipe_id}, organization_id: ${params.organization_id}, member: {user_id: ${params.member.user_id}, role_name: \\"${params.member.role_name}\\" } }) { member{ role_name, user{ username } } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.createPipeRelation = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { createPipeRelation(input: { parent_id: ${params.parent_id}, child_id: ${params.child_id}, name: \\"${params.name}\\", child_must_exist_to_move_parent: ${params.child_must_exist_to_move_parent}, child_must_exist_to_finish_parent: ${params.child_must_exist_to_finish_parent}, all_children_must_be_done_to_finish_parent: ${params.all_children_must_be_done_to_finish_parent}, all_children_must_be_done_to_move_parent: ${params.all_children_must_be_done_to_move_parent}, can_create_connected_cards: ${params.can_create_connected_cards}, can_search_connected_cards: ${params.can_search_connected_cards}, can_connect_multiple_cards: ${params.can_connect_multiple_cards} }) { pipe_relation { id, name, parent_id, child_id, can_create_connected_cards, can_search_connected_cards, can_connect_multiple_cards, child_must_exist_to_move_parent, child_must_exist_to_finish_parent, all_children_must_be_done_to_move_parent, all_children_must_be_done_to_finish_parent } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.updatePipeRelation = function(params) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { updatePipeRelation(input: { id: ${params.id}, name: \\"${params.name}\\", child_must_exist_to_move_parent: ${params.child_must_exist_to_move_parent}, child_must_exist_to_finish_parent: ${params.child_must_exist_to_finish_parent}, all_children_must_be_done_to_finish_parent: ${params.all_children_must_be_done_to_finish_parent}, all_children_must_be_done_to_move_parent: ${params.all_children_must_be_done_to_move_parent}, can_create_connected_cards: ${params.can_create_connected_cards}, can_search_connected_cards: ${params.can_search_connected_cards}, can_connect_multiple_cards: ${params.can_connect_multiple_cards} }) { pipe_relation { id, name, parent_id, child_id, can_create_connected_cards, can_search_connected_cards, can_connect_multiple_cards, child_must_exist_to_move_parent, child_must_exist_to_finish_parent, all_children_must_be_done_to_move_parent, all_children_must_be_done_to_finish_parent } } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  this.deletePipeRelation = function(id) {
    return rp({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deletePipeRelation(input: {id: ${id}}) { success } }\"}`
    }, function(error, response, body) {
      log.debug('Status:', response.statusCode);
      log.debug('Headers:', JSON.stringify(response.headers));
      log.debug('Response:', body);
    });
  };

  /*this.createWebhook = function(params) {
    request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { createWebhook(input: { pipe_id: ${params.pipe_id}, name: \\"${params.name}\\", email: \\"${params.email}\\", url: \\"${params.url}\\", actions: [\\"${params.actions[0]}\\", \\"${params.actions[1]}\\"], headers: \\"{\\\\"Custom-Header\\\\": \\\\"in json format\\\\"}\\" }) { webhook { id, name, email, url, actions, headers } } }\"}`
    }, function(error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
  };*/

  /*this.updateWebhook = function(params) {
    request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { updateWebhook(input: { id: ${params.id}, name: \\"${params.name}\\", email: \\"${params.email}\\", url: \\"${params.url}\\", actions: [\\"${params.actions[0]}\\", \\"${params.actions[1]}\\"], headers: \\"{\\\\"Custom-Header\\\\": \\\\"in json format\\\\"}\\" }) { webhook { id, name, email, url, actions, headers } } }\"}`
    }, function(error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
  };*/

  /*this.deleteWebhook = function(id) {
    request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: `{  \"query\": \"mutation { deleteWebhook(input: { id: ${id} }) { success } }\"}`
    }, function(error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
  };*/

}

module.exports = function(config) {
  return new Pipefy(config);
};