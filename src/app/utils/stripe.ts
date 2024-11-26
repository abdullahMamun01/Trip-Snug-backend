import Stripe from "stripe";
import config from "../config";


const initializeStripe = () => {

    
    return new Stripe(config.stipe_secret_key as string, {
        apiVersion: '2024-06-20',
        appInfo: { name: 'MuscleMax' }
    });
};

const stripe = initializeStripe()

export default stripe