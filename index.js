/** @module pipefy-node  */

/**
 * Creates a new Pipefy API client
 *
 * @example
 *
 * Basic usage:
 *
 * ```javascript
 * var pipefy = require('pipefy-node')({
 *    accessToken: <token>,
 *    logLevel: '<['info', 'warn', 'debug', 'trace']>'
 * });
 *
 * pipefy.getMe();
 * ```
 * @param {object} config - Configuration options object
 * @param {string} config.accessToken - Personal access token (required)
 * @param {string} config.logLevel - Set the log level (optional)
 */

'use strict';

var rp = require('request-promise');
var log = require('loglevel');

function Pipefy(config) {
  if (!config) {
    console.error('No \'config\' parameter specified.');
  } else if (!config.accessToken) {
    console.error('No \'accessToken\' property specified.');
  }

  if (!config.logLevel) {
    log.setLevel(log.levels.SILENT, false);
  } else {
    log.setLevel(config.logLevel, false);
  }

  var baseUrl = 'https://app.pipefy.com/queries';
  var bearerToken = 'Bearer ' + config.accessToken;

  /**
   * Custom querying
   * @function
   * @param {string} body - string of body request
   * @returns
   */
  this.customQuery = function(body) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: body
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get information about yourself.
   * @function
   * @returns A promise with the response body
   */
  this.getMe = function() {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body:
          '{  "query": "{ me { id, name, username, avatar_url, email, locale, time_zone } }"}'
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get the list of Organizations.
   * @function
   * @returns A promise with the response body
   */
  this.getOrganizations = function() {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: '{  "query": "{ organizations{ id, name, pipes { name } } }"}'
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get an organization by organization id, with pipes and phases.
   * @function
   * @param {number} id - The organization id
   * @returns A promise with the response body
   */
  this.getOrganizationById = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"{ organization(id: ${id}){ name, pipes { name, phases { name } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get pipes by pipes ids, with phases and cards.
   * @function
   * @param {Array} ids - An array with pipes ids
   * @returns A promise with the response body
   */
  this.getPipesByIds = function(ids) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"{ pipes(ids: [${ids}]){ id, name, phases{ name, cards(first: 10){ edges{ node{ id, title } } } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get a pipe by pipe id, with phases and cards.
   * @function
   * @param {number} id - A pipe id
   * @returns A promise with the response body
   */
  this.getPipeById = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"{ pipe(id: ${id}){ id, name, phases{ name, cards(first: 1){ edges{ node{ id, title } } } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get a phase by phase id, with cards, fields and cards cane be moved to phases.
   * @function
   * @param {number} id - A phase id
   * @returns A promise with the response body
   */
  this.getPhaseById = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"{  phase(id: ${id}){ id name cards_count cards { edges{ node{ id, title } } } fields { id } cards_can_be_moved_to_phases { id name } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get cards by pipe id, with assignees, child relations, fields ...
   * @function
   * @param {number} pipe_id - A pipe id
   * @returns A promise with the response body
   */
  this.getCardsByPipeId = function(pipe_id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"{ cards(pipe_id: ${pipe_id}) { edges { node { title assignees { id, username } child_relations { name, cards { id } } fields { name, value, phase_field { id } } } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get a card by card id, with assignees, child relations, fields ...
   * @function
   * @param {number} id - A card id
   * @returns A promise with the response body
   */
  this.getCardById = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"{ card(id: ${id}) { current_phase { id, name } pipe { id } title assignees { id, username } child_relations { name, cards { id } } fields { name, value, phase_field { id } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Get a list of pipe relations by their ids, with properties and the child name
   * @function
   * @param {Array} ids - An array with pipe relations ids
   * @returns A promise with the response body
   */
  this.getPipeRelationByIds = function(ids) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"{ pipe_relations(ids: [${ids}]) { id, name, parent_id, child_id, can_create_connected_cards, can_search_connected_cards, can_connect_multiple_cards, child_must_exist_to_move_parent, child_must_exist_to_finish_parent, all_children_must_be_done_to_finish_parent, all_children_must_be_done_to_move_parent, child_name } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to create a organization, in case of success a query is returned.
   * @function
   * @param {object} params - The new organization data
   * @param {string} params.industry - The company industry (e.g.: 'technology', 'consulting')
   * @param {string} params.name - The company name
   * @returns A promise with the response body
   */
  this.createOrganization = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { createOrganization(input: {industry: \\"${
          params.industry
        }\\", name: \\"${params.name}\\"}){ organization{ id, name } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to update a organization, in case of success a query is returned.
   * @function
   * @param {object} params - The new organization data
   * @param {number} params.id - The organization id
   * @param {string} params.name - The new organization name
   * @param {boolean} params.only_admin_can_invite_users - Only admin can invite users
   * @param {boolean} params.only_admin_can_create_pipes - Only admin can create pipes
   * @param {boolean} params.force_omniauth_to_normal_users - Force omniauth to normal users
   * @returns A promise with the response body
   */
  this.updateOrganization = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ updateOrganization(input:{id: ${
          params.id
        }, name: \\"${params.name}\\", only_admin_can_invite_users: ${
          params.only_admin_can_invite_users
        }, only_admin_can_create_pipes: ${
          params.only_admin_can_create_pipes
        }, force_omniauth_to_normal_users: ${
          params.force_omniauth_to_normal_users
        } }) { organization{ name, only_admin_can_create_pipes, only_admin_can_invite_users, force_omniauth_to_normal_users } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to delete an organization, in case of success a query is returned.
   * @function
   * @param {number} id - The organization id
   * @returns A promise with the response body
   */
  this.deleteOrganization = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { deleteOrganization(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to clone a pipe, in case of success a query is returned.
   * @function
   * @param {object} params - The pipes data
   * @param {number} params.organization_id - The organization id
   * @param {Array} params.pipe_template_ids - An array with pipes ids to be used as template
   * @returns A promise with the response body
   */
  this.clonePipes = function(params) {
    var pipe_template_ids = params.pipe_template_ids
      .map(function(element) {
        return element;
      })
      .join();

    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ clonePipes(input: {organization_id: ${
          params.organization_id
        }, pipe_template_ids:[ ${pipe_template_ids} ]}){ pipes{ id, name } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to create a pipe, in case of success a query is returned.
   * @function
   * @param {object} params
   * @param {number} params.organization_id - The organization id
   * @param {string} params.name - The pipe name
   * @param {Array.<object>} params.labels - An array of objects with 'name' and 'color' properties
   * @param {Array.<object>} params.members - An array of objects with 'user_id' and 'role_name' properties
   * @param {Array.<object>} params.phases - An array of objects with 'name' and 'done' properties
   * @param {Array.<object>} params.start_form_fields - An array of objects with 'label' and 'type_id' properties
   * @returns A promise with the response body
   */
  this.createPipe = function(params) {
    var labels = params.labels
      .map(function(element) {
        return (
          '{ name: \\"' +
          element.name +
          '\\", color: \\"' +
          element.color +
          '\\" }'
        );
      })
      .join();
    var members = params.members
      .map(function(element) {
        return (
          '{ user_id: \\"' +
          element.user_id +
          '\\", role_name: \\"' +
          element.role_name +
          '\\" }'
        );
      })
      .join();
    var phases = params.phases
      .map(function(element) {
        return (
          '{ name: \\"' + element.name + '\\", done: ' + element.done + '}'
        );
      })
      .join();
    var start_form_fields = params.start_form_fields
      .map(function(element) {
        return (
          '{ label: \\"' +
          element.label +
          '\\", type_id: \\"' +
          element.type_id +
          '\\" }'
        );
      })
      .join();

    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ createPipe( input: { organization_id: ${
          params.organization_id
        }, name: \\"${
          params.name
        }\\", labels:[ ${labels} ], members:[ ${members} ], phases:[ ${phases} ], start_form_fields:[ ${start_form_fields} ] } ) { pipe{ id, name, members{ user{ username } } phases{ name } start_form_fields { id } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to update a pipe, in case of success a query is returned.
   * @function
   * @param {object} params - The pipe new data
   * @param {number} params.id - The pipe id
   * @param {string} params.name - The pipe name
   * @param {boolean} params.anyone_can_create_card - Anyone can create cards
   * @param {boolean} params.public - It is public
   * @param {boolean} params.only_admin_can_remove_cards - Only admin can remove cards
   * @param {boolean} params.only_assignees_can_edit_cards - Only assignees can edit cards
   * @returns A promise with the response body
   */
  this.updatePipe = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ updatePipe(input:{ id: ${
          params.id
        }, name: \\"${params.name}\\", anyone_can_create_card: ${
          params.anyone_can_create_card
        }, public: ${params.public}, only_admin_can_remove_cards: ${
          params.only_admin_can_remove_cards
        }, only_assignees_can_edit_cards: ${
          params.only_assignees_can_edit_cards
        }}) { pipe{ name public only_assignees_can_edit_cards only_admin_can_remove_cards title_field{ id synced_with_card } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to delete a pipe, in case of success a query is returned.
   * @function
   * @param {number} id - The pipe id
   * @returns A promise with the response body
   */
  this.deletePipe = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { deletePipe(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to create a phase in a pipe, in case of success a query is returned.
   * @function
   * @param {object} params - The new phase data
   * @param {number} params.pipe_id - The pipe id
   * @param {string} params.name - The phase name
   * @param {string} params.description - The phase description
   * @param {boolean} params.done - It is done
   * @param {boolean} params.only_admin_can_move_to_previous - Only admin can move to previous
   * @param {boolean} params.can_receive_card_directly_from_draft - Can receive card directly from draft
   * @returns A promise with the response body
   */
  this.createPhase = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { createPhase(input: {pipe_id: ${
          params.pipe_id
        }, name: \\"${params.name}\\", description: \\"${
          params.description
        }\\", done: ${params.done}, only_admin_can_move_to_previous: ${
          params.only_admin_can_move_to_previous
        }, can_receive_card_directly_from_draft: ${
          params.can_receive_card_directly_from_draft
        }}) { phase{ id, name } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to update a phase, in case of success a query is returned.
   * @function
   * @param {object} params - The new phase data
   * @param {number} params.id - The phase id
   * @param {string} params.name - The phase name
   * @param {boolean} params.only_admin_can_move_to_previous - Only admin can move to previous
   * @param {boolean} params.can_receive_card_directly_from_draft - Can receive card directly from draft
   * @param {string} params.description - The phase description
   * @returns A promise with the response body
   */
  this.updatePhase = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ updatePhase(input:{id: ${
          params.id
        }, name: \\"${params.name}\\", only_admin_can_move_to_previous: ${
          params.only_admin_can_move_to_previous
        }, can_receive_card_directly_from_draft: ${
          params.can_receive_card_directly_from_draft
        }, description: \\"${
          params.description
        }\\"  }) { phase{ name, cards_count, cards{ edges{ node{ title } } }, cards_can_be_moved_to_phases{ id, name } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to delete a phase of a pipe, in case of success a query is returned.
   * @function
   * @param {number} id - The phase id
   * @returns A promise with the response body
   */
  this.deletePhase = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { deletePhase(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to create a phase field, in case of success a query is returned.
   * @function
   * @param {object} params - The phase field new data
   * @param {number} params.phase_id - The phase id
   * @param {string} params.type - The phase type
   * @param {string} params.label - The phase label
   * @param {string} params.description - The phase description
   * @param {boolean} params.required - It is required
   * @param {string} params.help - Help text
   * @param {boolean} params.editable - It is editable
   * @param {boolean} params.can_create_database_record - Can create database record
   * @param {boolean} params.can_have_multiple_database_records - Can have multiple database records
   * @param {boolean} params.sync_with_card - Sync with card
   * @returns A promise with the response body
   */
  this.createPhaseField = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ createPhaseField(input: { phase_id: ${
          params.phase_id
        }, type: \\"${params.type}\\", label: \\"${
          params.label
        }\\", description: \\"${params.description}\\", required: ${
          params.required
        }, help: \\"${params.help}\\", editable: ${
          params.editable
        }, can_create_database_record: ${
          params.can_create_database_record
        }, can_have_multiple_database_records: ${
          params.can_have_multiple_database_records
        }, sync_with_card: ${
          params.sync_with_card
        } } ) { phase_field{ id, type, description, phase{ name } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to update a phase field, in case of success a query is returned.
   * @function
   * @param {object} params - The new phase field data
   * @param {number} params.id - The phase field id
   * @param {number} params.index - Phase index
   * @param {string} params.label - The phase field label
   * @param {boolean} params.required - It is required
   * @param {boolean} params.editable - It is editable
   * @param {string} params.help - Help text
   * @param {string} params.description - The phase field description
   * @returns A promise with the response body
   */
  this.updatePhaseField = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { updatePhaseField(input: {id: \\"${
          params.id
        }\\", index: ${params.index}, label: \\"${params.label}\\", required: ${
          params.required
        }, editable: ${params.editable}, help: \\"${
          params.help
        }\\", description: \\"${params.description}\\", sync_with_card: ${
          params.sync_with_card
        }}) { phase_field { id label required description synced_with_card phase { name } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to delete a phase field, in case of success a query is returned.
   * @function
   * @param {number} id - The phase field id
   * @returns A promise with the response body
   */
  this.deletePhaseField = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { deletePhaseField(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to create a label, in case of success a query is returned.
   * @function
   * @param {object} params - The label new data
   * @param {number} params.pipe_id - The pipe id
   * @param {string} params.name - The label name
   * @param {string} params.color - The label color
   * @returns A promise with the response body
   */
  this.createLabel = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { createLabel(input: {pipe_id: ${
          params.pipe_id
        }, name: \\"${params.name}\\", color: \\"${
          params.color
        }\\"}){ label{ id, name, color } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to update a label, in case of success a query is returned.
   * @function
   * @param {object} params - The label new data
   * @param {number} params.id - The label id
   * @param {string} params.color - The label color
   * @param {string} params.name - The label name
   * @returns A promise with the response body
   */
  this.updateLabel = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { updateLabel(input:{id: ${
          params.id
        }, color: \\"${params.color}\\", name: \\"${
          params.name
        }\\"}){ label{ name, color } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to delete a label, in case of success a query is returned.
   * @function
   * @param {number} id - The label id
   * @returns A promise with the response body
   */
  this.deleteLabel = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { deleteLabel(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * The endpoint to create a card, in case of success a query is returned. When fields_attributes is passed as parameter, the field_value of first field_attribute replaces the card title.
   * @function
   * @param {object} params - The card new data
   * @param {number} params.pipe_id - The pipe id
   * @param {string} params.title - The card title
   * @param {string} params.due_date - Date in string format
   * @param {Array.} params.assigne_ids - An array with assignes ids numbers
   * @param {Array.} params.label_ids - An array with labels ids numbers
   * @returns A promise with the response body
   */
  this.createCard = function(params) {
    var fields_attributes;
    if (params.fields_attributes) {
      fields_attributes = params.fields_attributes
        .map(function(element) {
          return (
            '{ field_id: \\"' +
            element.field_id +
            '\\", field_value: \\"' +
            element.field_value +
            '\\"}'
          );
        })
        .join();
    } else {
      fields_attributes = '';
    }

    var hasAssigneeIds = params.assignee_ids && params.assignee_ids.length;

    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ createCard(input: {pipe_id: ${
          params.pipe_id
        }, title: \\"${params.title}\\"${
          hasAssigneeIds ? `, assignee_ids: ${params.assignee_ids}` : ','
        } fields_attributes: [${fields_attributes}] }) { card {id, title, due_date, assignees{id, username}, fields {name, value} }}}\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * The endpoint to update a card, in case of success a query is returned.
   * @function
   * @param {object} params - The card new data
   * @param {number} params.id - The card id
   * @param {string} params.title - The card titlte
   * @param {string} params.due_date - Date in string format
   * @param {Array.} params.assigne_ids - An array with assignes ids numbers
   * @param {Array.} params.label_ids - An array with labels ids numbers
   * @returns A promise with the response body
   */
  this.updateCard = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ updateCard(input: {id: ${
          params.id
        }, title: \\"${params.title}\\", due_date: \\"${
          params.due_date
        }\\", assignee_ids: ${params.assignee_ids}, label_ids: ${
          params.label_ids
        }}) { card { title, due_date, assignees { id, username }, labels{ id, name }}}}\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * The endpoint to delete a card, in case of success a query "success": true is returned.
   * @function
   * @param {number} id - The card id
   * @returns A promise with the response body
   */
  this.deleteCard = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ deleteCard(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * The endpoint to move a card to a phase, in case of success a card's query is returned.
   * @function
   * @param {object} params
   * @param {number} params.card_id - The card id
   * @param {number} params.phase_id - The phase id
   * @returns A promise with the response body
   */
  this.moveCardToPhase = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ moveCardToPhase(input: {card_id: ${
          params.card_id
        }, destination_phase_id: ${
          params.destination_phase_id
        }}){ card{ title, current_phase{ id, name } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
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

  /**
   * Mutation to create a comment to a card, in case of success a query is returned.
   * @function
   * @param {object} params - The comment new data
   * @param {number} params.card_id - The card id
   * @param {string} params.text - The comment text
   * @returns A promise with the response body
   */
  this.createComment = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { createComment(input: {card_id: ${
          params.card_id
        }, text: \\"${params.text}\\"}) { comment { id, text } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to update a comment, in case of success a query is returned.
   * @function
   * @param {object} params - The comment new data
   * @param {number} params.id - The comment id
   * @param {string} params.text - The comment text
   * @returns A promise with the response body
   */
  this.updateComment = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation{ updateComment(input: {id: ${
          params.id
        }, text: \\"${params.text}\\"}){ comment { author_name, text } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to delete a comment of a Card, in case of success a query is returned.
   * @function
   * @param {number} id - The comment id
   * @returns A promise with the response body
   */
  this.deleteComment = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { deleteComment(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to set a user's role, in case of success a query is returned.
   * @function
   * @param {object} params - The role data
   * @param {number} params.pipe_id - The pipe id
   * @param {number} params.organization_id - The organization id
   * @param {number} params.member.user_id - The member user id
   * @param {string} params.member.role_name - The member role name
   * @returns
   */
  this.setRole = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { setRole(input: {pipe_id: ${
          params.pipe_id
        }, organization_id: ${params.organization_id}, member: {user_id: ${
          params.member.user_id
        }, role_name: \\"${
          params.member.role_name
        }\\" } }) { member{ role_name, user{ username } } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to create a pipe relation between two pipes, in case of success a query is returned.
   * @function
   * @param {object} params - The pipe relation new data
   * @param {number} params.parent_id - Pipe parent id
   * @param {number} params.child_id - Pipe child id
   * @param {string} params.name - Pipe relation name
   * @param {boolean} params.child_must_exist_to_move_parent - Child must exist to move parent
   * @param {boolean} params.child_must_exist_to_finish_parent - Child must exist to finish parent
   * @param {boolean} params.all_children_must_be_done_to_finish_parent - All children must to be done to finish parent
   * @param {boolean} params.all_children_must_be_done_to_move_parent - All children must be done to move parent
   * @param {boolean} params.can_create_connected_cards - Can create connected cards
   * @param {boolean} params.can_search_connected_cards - Can search connected cards
   * @param {boolean} params.can_connect_multiple_cards - Can connect multiple cards
   * @returns A promise with the response body
   */
  this.createPipeRelation = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { createPipeRelation(input: { parent_id: ${
          params.parent_id
        }, child_id: ${params.child_id}, name: \\"${
          params.name
        }\\", child_must_exist_to_move_parent: ${
          params.child_must_exist_to_move_parent
        }, child_must_exist_to_finish_parent: ${
          params.child_must_exist_to_finish_parent
        }, all_children_must_be_done_to_finish_parent: ${
          params.all_children_must_be_done_to_finish_parent
        }, all_children_must_be_done_to_move_parent: ${
          params.all_children_must_be_done_to_move_parent
        }, can_create_connected_cards: ${
          params.can_create_connected_cards
        }, can_search_connected_cards: ${
          params.can_search_connected_cards
        }, can_connect_multiple_cards: ${
          params.can_connect_multiple_cards
        } }) { pipe_relation { id, name, parent_id, child_id, can_create_connected_cards, can_search_connected_cards, can_connect_multiple_cards, child_must_exist_to_move_parent, child_must_exist_to_finish_parent, all_children_must_be_done_to_move_parent, all_children_must_be_done_to_finish_parent } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to update a pipe relation, in case of success a query is returned.
   * @function
   * @param {object} params - The pipe relation new data
   * @param {number} params.id - The pipe relation id
   * @param {string} params.name - The pipe relation new name
   * @param {boolean} params.child_must_exist_to_move_parent - Child must exist to move parent
   * @param {boolean} params.child_must_exist_to_finish_parent - Child must exist to finish parent
   * @param {boolean} params.all_children_must_be_done_to_finish_parent - All children must to be done to finish parent
   * @param {boolean} params.all_children_must_be_done_to_move_parent - All children must be done to move parent
   * @param {boolean} params.can_create_connected_cards - Can create connected cards
   * @param {boolean} params.can_search_connected_cards - Can search connected cards
   * @param {boolean} params.can_connect_multiple_cards - Can connect multiple cards
   * @returns A promise with the response body
   */
  this.updatePipeRelation = function(params) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { updatePipeRelation(input: { id: ${
          params.id
        }, name: \\"${params.name}\\", child_must_exist_to_move_parent: ${
          params.child_must_exist_to_move_parent
        }, child_must_exist_to_finish_parent: ${
          params.child_must_exist_to_finish_parent
        }, all_children_must_be_done_to_finish_parent: ${
          params.all_children_must_be_done_to_finish_parent
        }, all_children_must_be_done_to_move_parent: ${
          params.all_children_must_be_done_to_move_parent
        }, can_create_connected_cards: ${
          params.can_create_connected_cards
        }, can_search_connected_cards: ${
          params.can_search_connected_cards
        }, can_connect_multiple_cards: ${
          params.can_connect_multiple_cards
        } }) { pipe_relation { id, name, parent_id, child_id, can_create_connected_cards, can_search_connected_cards, can_connect_multiple_cards, child_must_exist_to_move_parent, child_must_exist_to_finish_parent, all_children_must_be_done_to_move_parent, all_children_must_be_done_to_finish_parent } } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
  };

  /**
   * Mutation to delete a pipe relation, in case of success a query "success": true is returned.
   * @function
   * @param {number} id - The pipe relation id
   * @returns A promise with the response body
   */
  this.deletePipeRelation = function(id) {
    return rp(
      {
        method: 'POST',
        url: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken
        },
        body: `{  \"query\": \"mutation { deletePipeRelation(input: {id: ${id}}) { success } }\"}`
      },
      function(error, response, body) {
        log.debug('Status:', response.statusCode);
        log.debug('Headers:', JSON.stringify(response.headers));
        log.debug('Response:', body);
      }
    );
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
