import { CivicEvent, SectorZone, CivicFeed, ReplayMilestone } from '../types';

/**
 * CityPulse API Client
 * This handles the frontend <-> backend communication.
 * Member 1 (Frontend) can use these functions instead of the mock data.
 */

const API_BASE = '/api';

export const CityPulseAPI = {
  getEvents: async (): Promise<CivicEvent[]> => {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  },

  getZones: async (): Promise<SectorZone[]> => {
    const res = await fetch(`${API_BASE}/zones`);
    if (!res.ok) throw new Error('Failed to fetch zones');
    return res.json();
  },

  getFeeds: async (): Promise<CivicFeed[]> => {
    const res = await fetch(`${API_BASE}/feeds`);
    if (!res.ok) throw new Error('Failed to fetch feeds');
    return res.json();
  },

  getReplay: async (): Promise<ReplayMilestone[]> => {
    const res = await fetch(`${API_BASE}/replay`);
    if (!res.ok) throw new Error('Failed to fetch replay data');
    return res.json();
  },

  getRelationshipsCauses: async (): Promise<any[]> => {
    const res = await fetch(`${API_BASE}/relationships/causes`);
    if (!res.ok) throw new Error('Failed to fetch causes');
    return res.json();
  },

  getRelationshipsEmpirical: async (): Promise<any[]> => {
    const res = await fetch(`${API_BASE}/relationships/empirical`);
    if (!res.ok) throw new Error('Failed to fetch empirical');
    return res.json();
  },

  getRelationshipsHistorical: async (): Promise<any[]> => {
    const res = await fetch(`${API_BASE}/relationships/historical`);
    if (!res.ok) throw new Error('Failed to fetch historical');
    return res.json();
  },

  getRelationshipsRecovery: async (): Promise<any[]> => {
    const res = await fetch(`${API_BASE}/relationships/recovery`);
    if (!res.ok) throw new Error('Failed to fetch recovery');
    return res.json();
  },

  getFeedsDegradation: async (): Promise<any[]> => {
    const res = await fetch(`${API_BASE}/feeds/degradation`);
    if (!res.ok) throw new Error('Failed to fetch degradation steps');
    return res.json();
  }
};
