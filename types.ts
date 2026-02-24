// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type?: string;
  created_at?: string;
  modified_at?: string;
}

// Author object type
export interface Author extends CosmicObject {
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    social_link?: string;
  };
}

// Category object type
export interface Category extends CosmicObject {
  metadata: {
    name: string;
    description?: string;
  };
}

// Post object type
export interface Post extends CosmicObject {
  metadata: {
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
  };
}

// Cosmic API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}