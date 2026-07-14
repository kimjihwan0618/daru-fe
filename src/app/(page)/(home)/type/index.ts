export interface HomePageState {
  activeSection: "briefing" | "issues" | "stocks" | "settings";
}

export type HomePageAction = {
  type: "sectionChanged";
  section: HomePageState["activeSection"];
};
export * from "./briefing";
