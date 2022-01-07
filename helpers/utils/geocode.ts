import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_KEY);
Geocode.setLanguage("es");
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

export const getGeometry = async (address) => {
    // Get latitude & longitude from address.
    try {
        const response = await Geocode.fromAddress(address);
        // const location = response.results[0].geometry.location;

        return response;
    } catch (error) {
        return undefined;
    }
};

// export const getGeometry = async (address) => {
//     console.log("Address: ", address);
//     // Get latitude & longitude from address.
//     try {
//         //         let address = address.address.split(" ").join("+")
//         //  let city = address.city.split(" ").join("+")
//         //  let state = address.state
//         // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${process.env.REACT_APP_GOOGLE_API_KEY}
//         // const response = await Geocode.fromAddress(address);
//         // return response;
//     } catch (error) {
//         return undefined;
//     }
// };
