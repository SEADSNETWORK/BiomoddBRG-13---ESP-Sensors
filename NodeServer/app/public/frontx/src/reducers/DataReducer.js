export const ACTIONS = Object.freeze({
    SET_CLIENT: Symbol("data/client"),
    SET_NAV_OPEN: Symbol('data/navopen'),
    SET_THEME: Symbol('data/theme'),
    SET_THEMES: Symbol('data/themes'),
    SET_NEWS: Symbol('data/news'),
    SET_EVENTS: Symbol('data/cal'),
    SET_FAQS: Symbol('data/faq')
});

const initialState = {
  client: null,
  navopen: window.innerWidth > 768,
  theme: null,
  themes: null,
  news: null,
  events: null,
  faqs: null
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case ACTIONS.SET_CLIENT: {
      return {
        ...state,
        client: action.client
      };
    }
    case ACTIONS.SET_FAQS: {
      return {
        ...state,
        faqs: action.faqs
      };
    }
    case ACTIONS.SET_NEWS: {
      return {
        ...state,
        news: action.news
      };
    }
    case ACTIONS.SET_EVENTS: {
      return {
        ...state,
        events: action.events
      };
    }
    case ACTIONS.SET_NAV_OPEN: {
      return {
        ...state,
        navopen: action.navopen
      };
    }
    case ACTIONS.SET_THEME: {
      return {
        ...state,
        theme: action.theme
      };
    }
    case ACTIONS.SET_THEMES: {
      return {
        ...state,
        themes: action.themes
      };
    }
    default: {
      return {
        ...state
      };
    }
  } 
};
