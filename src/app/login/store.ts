export interface LoginPageState {
  returnPath: string;
  preferredProvider: "email" | "kakao" | "naver" | "google";
}

export type LoginPageAction =
  | { type: "returnPathChanged"; returnPath: string }
  | {
      type: "preferredProviderChanged";
      provider: LoginPageState["preferredProvider"];
    };

export const loginPageInitialState: LoginPageState = {
  returnPath: "/",
  preferredProvider: "email",
};

export function loginPageReducer(
  state: LoginPageState,
  action: LoginPageAction,
): LoginPageState {
  switch (action.type) {
    case "returnPathChanged":
      return { ...state, returnPath: action.returnPath };
    case "preferredProviderChanged":
      return { ...state, preferredProvider: action.provider };
    default:
      return state;
  }
}
