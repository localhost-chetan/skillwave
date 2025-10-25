export const getMailgunDomain = () => {
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

    if (!MAILGUN_DOMAIN) {
        throw new Error("MAILGUN_DOMAIN is not set in environment variables");
    }
    return MAILGUN_DOMAIN;
}

export const getMailgunAPIKey = () => {
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;

    if (!MAILGUN_API_KEY) {
        throw new Error("MAILGUN_API_KEY is not set in environment variables");
    }
    return MAILGUN_API_KEY;
}