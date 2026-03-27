// Tropical Map API Client
// Communique avec le backend API au lieu de localStorage

(function() {
  'use strict';

  // Configuration
  const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000/api';
  const USE_BACKEND = window.USE_BACKEND !== false; // Enable by default, set to false to use localStorage

  // Storage keys
  const LS_TOKEN = 'tm_token_v1';
  const LS_SESSION = 'tm_session_v1';

  // Helper: Get auth token
  function getToken() {
    return localStorage.getItem(LS_TOKEN);
  }

  // Helper: Set auth token
  function setToken(token) {
    if (token) {
      localStorage.setItem(LS_TOKEN, token);
    } else {
      localStorage.removeItem(LS_TOKEN);
    }
  }

  // Helper: API request with auth
  async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { error: text || `HTTP ${response.status}` };
        }
      }

      if (!response.ok) {
        const errorMessage = data.error || data.message || `HTTP ${response.status}`;
        console.error('API Error:', {
          url,
          status: response.status,
          statusText: response.statusText,
          error: errorMessage,
          data
        });
        
        // Create error object with status code for better error handling
        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API Error:', {
        url,
        message: error.message,
        error
      });
      throw error;
    }
  }

  // Auth API
  const AuthAPI = {
    async register({ email, password, role, commune }) {
      if (!USE_BACKEND) {
        // Fallback to localStorage (for development)
        return window.TM.register({ email, password, role, commune });
      }

      const result = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, role, commune })
      });

      // Store session info
      if (result.user) {
        localStorage.setItem(LS_SESSION, JSON.stringify({
          userId: result.user.id,
          at: new Date().toISOString()
        }));
      }

      return result.user;
    },

    async verifyEmail({ email, code }) {
      if (!USE_BACKEND) {
        return window.TM.verifyEmailCode({ email, code });
      }

      const result = await apiRequest('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, code })
      });

      return result;
    },

    async resendVerification({ email }) {
      if (!USE_BACKEND) {
        return window.TM.resendVerification({ email });
      }

      const result = await apiRequest('/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      return result;
    },

    async login({ email, password }) {
      if (!USE_BACKEND) {
        return window.TM.login({ email, password });
      }

      const result = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      // Store token and session
      if (result.token) {
        setToken(result.token);
        localStorage.setItem(LS_SESSION, JSON.stringify({
          userId: result.user.id,
          email: result.user.email,
          role: result.user.role,
          commune: result.user.commune || 'Lubumbashi',
          adminLevel: result.user.adminLevel || null,
          at: new Date().toISOString()
        }));
      }

      // Ensure user object has all required fields
      const user = {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        commune: result.user.commune || 'Lubumbashi',
        emailVerified: result.user.emailVerified !== false,
        adminLevel: result.user.adminLevel || null
      };

      return user;
    },

    async resetPasswordRequest({ email }) {
      if (!USE_BACKEND) {
        return window.TM.requestPasswordReset({ email });
      }

      const result = await apiRequest('/auth/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      return result;
    },

    async resetPassword({ email, code, newPassword }) {
      if (!USE_BACKEND) {
        return window.TM.resetPassword({ email, newPassword });
      }

      const result = await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, code, newPassword })
      });

      return result;
    },

    logout() {
      setToken(null);
      localStorage.removeItem(LS_SESSION);
      if (window.TM && window.TM.logout) {
        window.TM.logout();
      }
    },

    getCurrentUser() {
      if (!USE_BACKEND) {
        return window.TM.getCurrentUser();
      }

      const token = getToken();
      if (!token) return null;

      try {
        // Decode JWT token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        const session = JSON.parse(localStorage.getItem(LS_SESSION) || '{}');
        
        return {
          id: payload.userId || session.userId,
          email: payload.email,
          role: payload.role,
          commune: session.commune || 'Lubumbashi',
          adminLevel: payload.adminLevel || session.adminLevel || null
        };
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    },

    async getMe() {
      if (!USE_BACKEND) return null;
      const result = await apiRequest('/auth/me');
      return result.user;
    },

    async updateProfile(data) {
      if (!USE_BACKEND) {
        if (window.TM && window.TM.updateUserAddress) {
          return window.TM.updateUserAddress(data);
        }
        return null;
      }
      const result = await apiRequest('/auth/me', {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
      return result.user;
    }
  };

  // Places API
  const PlacesAPI = {
    async getAll(status = null) {
      if (!USE_BACKEND) {
        return window.TM.getPlaces();
      }

      const endpoint = status ? `/places?status=${status}` : '/places';
      const result = await apiRequest(endpoint);
      return result.places || [];
    },

    async getPublic() {
      if (!USE_BACKEND) {
        // Fallback: return only business places (not residential)
        return window.TM.getPlaces().filter(p => {
          if (p.type === "home") return false; // Residential addresses are private
          const isPublic = p.visibility === "public" || (!p.visibility && p.type !== "home");
          return p.status === "approved" && isPublic;
        });
      }

      // Public endpoint doesn't require authentication
      const response = await fetch(`${API_BASE_URL}/places/public`);
      if (!response.ok) {
        throw new Error('Failed to fetch public places');
      }
      const result = await response.json();
      return result.places || [];
    },

    async getById(id) {
      if (!USE_BACKEND) {
        return window.TM.getPlaceById(id);
      }

      const result = await apiRequest(`/places/${id}`);
      return result.place;
    },

    async create(placeData) {
      if (!USE_BACKEND) {
        return window.TM.createPlace(placeData);
      }

      const result = await apiRequest('/places', {
        method: 'POST',
        body: JSON.stringify(placeData)
      });

      return result.place;
    },

    async update(id, placeData) {
      if (!USE_BACKEND) {
        return window.TM.updatePlace(id, placeData);
      }

      const result = await apiRequest(`/places/${id}`, {
        method: 'PUT',
        body: JSON.stringify(placeData)
      });

      return result.place;
    },

    async delete(id) {
      if (!USE_BACKEND) {
        return window.TM.deletePlaceOwner(id);
      }

      const result = await apiRequest(`/places/${id}`, {
        method: 'DELETE'
      });

      return result;
    },

    async approve(id, { note, lat, lng, name } = {}) {
      if (!USE_BACKEND) {
        return window.TM.inspectorApprove({ id, note, lat, lng, name });
      }

      const result = await apiRequest(`/places/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ note, lat, lng, name })
      });

      return result.place;
    },

    async reject(id, { note }) {
      if (!USE_BACKEND) {
        return window.TM.inspectorReject({ id, note });
      }

      const result = await apiRequest(`/places/${id}/reject`, {
        method: 'PUT',
        body: JSON.stringify({ note })
      });

      return result.place;
    },

    async undoApproval(id) {
      if (!USE_BACKEND) {
        throw new Error('Undo approval only available with backend');
      }

      const result = await apiRequest(`/places/${id}/undo-approval`, {
        method: 'PUT'
      });

      return result.place;
    },

    async requestModification(id, { note, location_lat, location_lng, name }) {
      if (!USE_BACKEND) {
        // Fallback: set status to pending_review
        const place = window.TM.getPlaceById(id);
        if (place) {
          place.status = 'pending_review';
          place.inspector_note = note;
          if (name) place.name = name;
          if (location_lat && location_lng) {
            place.location = { lat: location_lat, lng: location_lng };
          }
          window.TM.updatePlace(place);
        }
        return place;
      }

      const result = await apiRequest(`/places/${id}/request-modification`, {
        method: 'PUT',
        body: JSON.stringify({ note, location_lat, location_lng, name })
      });

      return result.place;
    },

    async approvePlace(id, { note, location_lat, location_lng, name }) {
      return this.approve(id, { note, lat: location_lat, lng: location_lng, name });
    },

    async rejectPlace(id, { note }) {
      return this.reject(id, { note });
    }
  };

  // Notifications API
  const NotificationsAPI = {
    async getAll() {
      if (!USE_BACKEND) {
        return [];
      }

      try {
        const result = await apiRequest('/notifications');
        return result.notifications || [];
      } catch (error) {
        console.error('[NotificationsAPI] Error fetching notifications:', error);
        // Return empty array instead of throwing to prevent UI breakage
        return [];
      }
    },

    async markAsRead(notificationId) {
      if (!USE_BACKEND) {
        return;
      }

      await apiRequest(`/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
    },

    async markAllAsRead() {
      if (!USE_BACKEND) {
        return;
      }

      await apiRequest('/notifications/read-all', {
        method: 'PUT'
      });
    }
  };

  // Real Estate API
  const RealEstateAPI = {
    async getPublic(filters = {}) {
      if (!USE_BACKEND) {
        return [];
      }

      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await apiRequest(`/real-estate/public?${params.toString()}`);
      return response.listings || [];
    },

    async getById(id) {
      if (!USE_BACKEND) {
        return null;
      }

      const response = await apiRequest(`/real-estate/${id}`);
      return response.listing || null;
    },

    async getMyListings() {
      if (!USE_BACKEND) {
        return [];
      }

      const response = await apiRequest('/real-estate/my/listings');
      return response.listings || [];
    },

    async create(listing) {
      if (!USE_BACKEND) {
        throw new Error('Backend not available');
      }

      const response = await apiRequest('/real-estate', {
        method: 'POST',
        body: JSON.stringify(listing)
      });
      return response.listing;
    },

    async update(id, updates) {
      if (!USE_BACKEND) {
        throw new Error('Backend not available');
      }

      const response = await apiRequest(`/real-estate/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return response.listing;
    },

    async delete(id) {
      if (!USE_BACKEND) {
        throw new Error('Backend not available');
      }

      await apiRequest(`/real-estate/${id}`, {
        method: 'DELETE'
      });
    },

    async getPendingApprovals() {
      if (!USE_BACKEND) return [];
      const response = await apiRequest('/real-estate/admin/pending');
      return response.listings || [];
    },

    async approve(id) {
      if (!USE_BACKEND) throw new Error('Backend not available');
      const response = await apiRequest(`/real-estate/${id}/approve`, { method: 'POST' });
      return response.listing;
    },

    async reject(id) {
      if (!USE_BACKEND) throw new Error('Backend not available');
      await apiRequest(`/real-estate/${id}/reject`, { method: 'POST' });
    }
  };

  // Incidents API (danger reports)
  const IncidentsAPI = {
    async getPublic() {
      if (!USE_BACKEND) return [];
      try {
        const response = await fetch(`${API_BASE_URL}/incidents/public`);
        if (!response.ok) return [];
        const data = await response.json();
        return data.incidents || [];
      } catch (e) {
        console.error('[IncidentsAPI] getPublic error:', e);
        return [];
      }
    },

    async getMy() {
      if (!USE_BACKEND) return [];
      const result = await apiRequest('/incidents/my');
      return result.incidents || [];
    },

    async create(incident) {
      if (!USE_BACKEND) throw new Error('Backend not available');
      const result = await apiRequest('/incidents', {
        method: 'POST',
        body: JSON.stringify(incident)
      });
      return result.incident;
    },

    async delete(id) {
      if (!USE_BACKEND) throw new Error('Backend not available');
      await apiRequest(`/incidents/${id}`, { method: 'DELETE' });
    },

    async getPending() {
      if (!USE_BACKEND) return [];
      const result = await apiRequest('/incidents/pending');
      return result.incidents || [];
    },

    async approve(id, { note } = {}) {
      if (!USE_BACKEND) throw new Error('Backend not available');
      const result = await apiRequest(`/incidents/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ note })
      });
      return result.incident;
    },

    async reject(id, { note } = {}) {
      if (!USE_BACKEND) throw new Error('Backend not available');
      const result = await apiRequest(`/incidents/${id}/reject`, {
        method: 'PUT',
        body: JSON.stringify({ note })
      });
      return result.incident;
    }
  };

  // Export API
  window.TMAPI = {
    Auth: AuthAPI,
    Places: PlacesAPI,
    Notifications: NotificationsAPI,
    RealEstate: RealEstateAPI,
    Incidents: IncidentsAPI,
    getToken,
    setToken,
    apiRequest, // Expose for admin pages
    USE_BACKEND,
    API_BASE_URL
  };

  console.log('✅ TMAPI loaded', { USE_BACKEND, API_BASE_URL });
})();

