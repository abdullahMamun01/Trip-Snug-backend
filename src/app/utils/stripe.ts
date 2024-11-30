import Stripe from "stripe";
import config from "../config";


const initializeStripe = () => {
    return new Stripe(config.stipe_secret_key as string, {
        apiVersion: '2024-11-20.acacia',
        appInfo: { name: 'Trip-Snug' }
    });
};

const stripe = initializeStripe()

export default stripe