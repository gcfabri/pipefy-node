'use strict';

import { request, GraphQLClient } from 'graphql-request';
import log from 'loglevel';

// FIXME: Tornar parametros das funcoes como objetos!

/**
 * @export
 * @class Pipefy
 */
export default class Pipefy {
  constructor({ accessToken, logLevel = log.levels.SILENT }) {
    if (!accessToken)
      return Error('The contructor argument \'accessToken\' was not specified.');

    this.accessToken = accessToken;
    this.logLevel = logLevel;

    log.setLevel(this.logLevel, false);

    this.endpoint = 'https://app.pipefy.com/queries';
    this.authHeader = 'Bearer ' + this.accessToken;

    this.client = new GraphQLClient(this.endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader
      }
    });
  }

  /**
   * Get information about yourself
   *
   * @async
   * @function getMe
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async getMe() {
    const query = `
      query getMe {
        me {
          id
          name
          username
          email
          avatarUrl
          created_at
          locale
          timeZone
        }
      }
    `;
    try {
      return await this.client.request(query);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Get a list of organizations by their identifiers.
   *
   * @async
   * @function listOrganizations
   * @param {Array<number>} [ids] Organizations identifiers
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async listOrganizations(ids) {
    const query = `
      query listOrganizations($ids: [ID]) {
        organizations(ids: $ids) {
          name
          created_at
          members {
            user {
              id
              name
            }
            role_name
          }
          only_admin_can_create_pipes
          only_admin_can_invite_users
          pipes {
            id
            name
          }
          tables {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `;
    const variables = { ids };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Get an organization by its identifier.
   *
   * @async
   * @function showOrganization
   * @param {number} Organization identifier
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async showOrganization(id) {
    const query = `
      query showOrganization($id: ID!) {
        organization(id: $id) {
          name
          created_at
          members {
            user {
              id
              name
            }
            role_name
          }
          only_admin_can_create_pipes
          only_admin_can_invite_users
          pipes {
            id
            name
          }
          tables {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `;
    const variables = { id };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Mutation to create a organization, in case of success a query is returned.
   *
   * @async
   * @function createOrganization
   * @param {string} Organization industry
   * @param {string} Organization name
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async createOrganization(industry, name) {
    const query = `
      mutation createOrganization($industry: String!, $name: String!) {
        createOrganization(
          input: {
            industry: $industry
            name: $name
          }
        ) {
          organization {
            id
            name
          }
        }
      }
    `;
    const variables = { industry, name };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Mutation to update a organization, in case of success a query is returned.
   *
   * @async
   * @function updateOrganization
   * @param {number} Organization identifier
   * @param {string} Organization name
   * @param {boolean} [only_admin_can_invite_users] Only administrators can invite users
   * @param {boolean} [only_admin_can_create_pipes] Only administrators can create pipes
   * @param {boolean} [force_omniauth_to_normal_users] Force omniauth to normal users
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async updateOrganization(
    id,
    name,
    only_admin_can_invite_users,
    only_admin_can_create_pipes,
    force_omniauth_to_normal_users
  ) {
    const query = `
      mutation updateOrganization($id: ID!, $name: String!, $only_admin_can_invite_users: Boolean, $only_admin_can_create_pipes: Boolean, $force_omniauth_to_normal_users: Boolean) {
        updateOrganization(
          input: {
            id: $id
            name: $name
            only_admin_can_invite_users: $only_admin_can_invite_users
            only_admin_can_create_pipes: $only_admin_can_create_pipes
            force_omniauth_to_normal_users: $force_omniauth_to_normal_users
          }
        ) {
          organization {
            id
            name
            only_admin_can_invite_users
            only_admin_can_create_pipes
            force_omniauth_to_normal_users
          }
        }
      }
    `;
    const variables = {
      id,
      name,
      only_admin_can_invite_users,
      only_admin_can_create_pipes,
      force_omniauth_to_normal_users
    };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Mutation to delete an organization, in case of success success: true is returned.
   *
   * @async
   * @function deleteOrganization
   * @param {number} Organization identifier
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async deleteOrganization(id) {
    const query = `
      mutation deleteOrganization($id: ID!) {
        deleteOrganization(input: { id: $id }) {
          success
        }
      }
    `;
    const variables = { id };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Mutation to create a webhook, in case of success a query is returned.
   *
   * @async
   * @function createWebhook
   * @param {number} Pipe identifier
   * @param {string} Webhook name
   * @param {string} URL string
   * @param {string} Email
   * @param {Array<string>} Card actions
   * @param {Object} Headers
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async createWebhook(pipe_id, name, url, email, actions, headers) {
    const query = `
      mutation createWebhook($pipe_id: ID!, $name: String!, $url: String!, $email: String, $actions: [String]!, $headers: Json) {
        createWebhook(
          input: {
            pipe_id: $pipe_id
            name: $name
            email: $email
            url: $url
            actions: $actions
            headers: $headers
          }
        ) {
          webhook {
            id
            name
            email
            url
            actions
            headers
          }
        }
      }
    `;
    const variables = { pipe_id, name, url, email, actions, headers };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Mutation to update a webhook, in case of success a query is returned.
   *
   * @async
   * @function updateWebhook
   * @param {number} Webhook identifier
   * @param {string} Email
   * @param {Array<string>} Card actions
   * @param {Object} Headers
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async updateWebhook(id, email, actions) {
    const query = `
      mutation updateWebhook($id: ID!, $email: String!, $actions: [String]!) {
        updateWebhook(
          input: {
            id: $id
            email: $email
            actions: $actions
          }
        ) {
          webhook {
            id
            email
            actions
          }
        }
      }
    `;
    const variables = { id, email, actions };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }

  /**
   * Mutation to delete a webhook, in case of success success: true is returned.
   *
   * @async
   * @function deleteWebhook
   * @param {number} Webhook identifier
   * @returns {Promise.<Object>} A promise with the response body.
   * @memberof Pipefy
   */
  async deleteWebhook(id) {
    const query = `
      mutation deleteWebhook($id: ID!) {
        deleteWebhook(input:{ id: $id }) {
          success
        }
      }
    `;
    const variables = { id };
    try {
      return await this.client.request(query, variables);
    } catch (err) {
      log.debug(err);
    }
  }
}
