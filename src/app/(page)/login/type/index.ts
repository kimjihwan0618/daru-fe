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
