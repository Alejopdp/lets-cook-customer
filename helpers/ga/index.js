// log the pageview with their URL
export const pageview = (url) => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
        // custom_map: {
        //     dimension1: 'app_language',
        //     metrix1: 'isLoggedIn',
        // }
    });
};

// log specific events happening.
export const event = ({ action, params }) => {
    // const paramsModified = { ...params, isLoggedIn: 1, app_language: 'es' }
    window.gtag("event", action, params);
};

// log purchase event (ecommerce settings)
export const purchase = (puchaseDetails) => {
    window.gtag("event", "purchase", puchaseDetails);

    // how i have to implement it
    // ga.purchase({
    //     transaction_id: "",
    //     affiliation: "LetsCook website",
    //     value: 0,
    //     currency: "EUR",
    //     tax: 0,
    //     shipping: 0,
    //     items: [
    //         {
    //             id: "",
    //             name: "",
    //             category: "",
    //             quantity: 0,
    //             price: 0
    //         }
    //     ]
    // })

    // window.gtag('event', 'purchase', {
    //     "transaction_id": "24.031608523954162",
    //     "affiliation": "Google online store",
    //     "value": 23.07,
    //     "currency": "USD",
    //     "tax": 1.24,
    //     "shipping": 0,
    //     "items": [
    //         {
    //             "id": "P12345",
    //             "name": "Android Warhol T-Shirt",
    //             "list_name": "Search Results",
    //             "brand": "Google",
    //             "category": "Apparel/T-Shirts",
    //             "variant": "Black",
    //             "list_position": 1,
    //             "quantity": 2,
    //             "price": "2.0"
    //         }
    //     ]
    // });
};
