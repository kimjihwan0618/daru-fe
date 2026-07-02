export interface HomePageState {
  activeSection: "briefing" | "issues" | "stocks" | "settings";
}

export type HomePageAction = {
  type: "sectionChanged";
  section: HomePageState["activeSection"];
};

export const homePageInitialState: HomePageState = {
  activeSection: "briefing",
};

export function homePageReducer(
  state: HomePageState,
  action: HomePageAction,
): HomePageState {
  if (action.type === "sectionChanged") {
    return { ...state, activeSection: action.section };
  }

  return state;
}
