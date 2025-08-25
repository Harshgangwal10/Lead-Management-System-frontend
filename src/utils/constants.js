export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  LOST: 'lost',
  WON: 'won'
};

export const LEAD_SOURCES = {
  WEBSITE: 'website',
  FACEBOOK_ADS: 'facebook_ads',
  GOOGLE_ADS: 'google_ads',
  REFERRAL: 'referral',
  EVENTS: 'events',
  OTHER: 'other'
};

export const STATUS_OPTIONS = [
  { value: LEAD_STATUS.NEW, label: 'New' },
  { value: LEAD_STATUS.CONTACTED, label: 'Contacted' },
  { value: LEAD_STATUS.QUALIFIED, label: 'Qualified' },
  { value: LEAD_STATUS.LOST, label: 'Lost' },
  { value: LEAD_STATUS.WON, label: 'Won' }
];

export const SOURCE_OPTIONS = [
  { value: LEAD_SOURCES.WEBSITE, label: 'Website' },
  { value: LEAD_SOURCES.FACEBOOK_ADS, label: 'Facebook Ads' },
  { value: LEAD_SOURCES.GOOGLE_ADS, label: 'Google Ads' },
  { value: LEAD_SOURCES.REFERRAL, label: 'Referral' },
  { value: LEAD_SOURCES.EVENTS, label: 'Events' },
  { value: LEAD_SOURCES.OTHER, label: 'Other' }
];
