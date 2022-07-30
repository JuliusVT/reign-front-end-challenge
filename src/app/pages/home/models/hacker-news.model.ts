export interface HackerNews {
    created_at: string;
    title: string;
    url: string;
    author: string;
    points: string;
    story_text: string;
    comment_text: string;
    num_comments: number;
    story_id: number;
    story_title: string;
    story_url: string;
    parent_id: number;
    created_at_i: number;
    _tags: string[];
    objectID: string;
  }
  
  export interface HackerNewsQueryResult {
    hits: HackerNews[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    exhaustiveNbHits: boolean;
    exhaustiveTypo: boolean;
    query: string;
    params: string;
    processingTimeMS: number;
  }

  export interface PostQueryContext {
    query: string | undefined | null;
    page: string | undefined | null;
    hitsPerPage: number;
  }
  