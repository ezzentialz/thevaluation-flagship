export interface BuildingConfig {
  width: number;
  height: number;
  depth: number;
  floors: number;
  windowsPerFloor: number;
  color: number;
  emissiveColor?: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  type: 'skyscraper' | 'residential' | 'commercial' | 'industrial' | 'hotel';
}

export interface SceneConfig {
  buildings: BuildingConfig[];
  ambientLight: {
    color: number;
    intensity: number;
  };
  directionalLight: {
    color: number;
    intensity: number;
    position: [number, number, number];
  };
  pointLights: Array<{
    color: number;
    intensity: number;
    position: [number, number, number];
    distance?: number;
    decay?: number;
  }>;
  fog?: {
    color: number;
    near: number;
    far: number;
  };
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface ScrollProgress {
  progress: number;
  section: string;
}

export type Locale = 'th' | 'en';

export interface TranslationKeys {
  nav: {
    home: string;
    about: string;
    services: string;
    properties: string;
    branches: string;
    careers: string;
    articles: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    scrollDown: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      years: string;
      projects: string;
      clients: string;
      branches: string;
    };
    readMore: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  properties: {
    title: string;
    subtitle: string;
    buy: string;
    rent: string;
    sell: string;
    agent: string;
  };
  branches: {
    title: string;
    subtitle: string;
  };
  careers: {
    title: string;
    subtitle: string;
    apply: string;
  };
  articles: {
    title: string;
    subtitle: string;
    readMore: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
  };
  footer: {
    rights: string;
    privacy: string;
  };
}