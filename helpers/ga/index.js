// log the pageview with their URL
export const pageview = (url, userId) => {
    event({ action: "page_view", params: { page_path: url, user_id: userId } });
    // window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    //     page_path: url,
    //     user_id: userId,
    //     // custom_map: {
    //     //     dimension1: 'app_language',
    //     //     metrix1: 'isLoggedIn',
    //     // }
    // });
};

// log specific events happening.
export const event = ({ action, params }) => {
    if (typeof window === "undefined") return;
    console.log("Shoudk send");
    window.gtag("event", action, params);
};

// log purchase event (ecommerce settings)
export const purchase = (puchaseDetails) => {
    window.gtag("event", "purchase", puchaseDetails);
};
