export interface SlackInstallation {
    ok: boolean;
    app_id: string;
    authed_user: {
        id: string;
    };
    scope: string;
    token_type: string;
    access_token: string;
    bot_user_id: string;
    team: {
        id: string;
        name: string;
    };
    enterprise: null | unknown
    is_enterprise_install: boolean;
}