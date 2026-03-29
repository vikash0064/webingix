import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const uploadToCloudinary = async (base64Image, folder = 'webingix') => {
    try {
        if (!base64Image || !base64Image.startsWith('data:image')) return base64Image;

        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
            folder,
            resource_type: 'image',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' }
            ]
        });

        return uploadResponse.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw error;
    }
};

export const deleteFromCloudinary = async (url) => {
    try {
        if (!url || !url.includes('cloudinary.com')) return;
        
        // Extract public_id from URL
        // Example: https://res.cloudinary.com/dfsfoolzs/image/upload/v12345/webingix/myimage.jpg
        const split = url.split('/');
        const lastPart = split[split.length - 1].split('.')[0];
        const folder = split[split.length - 2];
        const publicId = `${folder}/${lastPart}`;

        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
    }
};

export default cloudinary;
