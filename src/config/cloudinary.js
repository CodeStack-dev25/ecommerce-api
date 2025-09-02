import { v2 as cloudinary} from 'cloudinary';
import env from './env.js';

cloudinary.config({
    cloud_name: env.cloudName,
    api_key: env.cloudApiKey,
    api_secret: env.cloudApiSecret
});

export default cloudinary;