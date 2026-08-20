import { API_BASE_URL } from './config';

/**
 * Helper to handle fetch responses and extract meaningful error messages
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.validationErrors) {
        const details = Object.entries(errorData.validationErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(', ');
        errorMessage = `${errorData.message || 'Validation error'}: ${details}`;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Response wasn't JSON
      const text = await response.text();
      if (text) errorMessage = text;
    }
    throw new Error(errorMessage);
  }

  // If 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/**
 * Emergency API client using standard fetch()
 */
export const emergencyApi = {
  /**
   * Fetch all emergencies
   * GET /api/emergencies
   */
  async getAll() {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Fetch a single emergency by ID
   * GET /api/emergencies/{id}
   */
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Create a new emergency
   * POST /api/emergencies
   */
  async create(emergencyData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emergencyData),
    });
    return handleResponse(response);
  },

  /**
   * Update an existing emergency
   * PUT /api/emergencies/{id}
   */
  async update(id, emergencyData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emergencyData),
    });
    return handleResponse(response);
  },

  /**
   * Update the status of an emergency
   * PATCH /api/emergencies/{id}/status
   */
  async updateStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  /**
   * Delete an emergency by ID
   * DELETE /api/emergencies/{id}
   */
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
