export type IWebviewStack = { url: string, title: string }

export type IAppStack = {
    WebView: IWebviewStack;
    SettingScreen: undefined;
    AppTabs: undefined;
    Drawer: undefined;
    Admob: undefined;
};