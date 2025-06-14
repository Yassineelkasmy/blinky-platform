import { CollectionConfig } from "payload";

export const Cities: CollectionConfig = {
    slug: 'cities',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'slug', 'createdAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
            admin: {
                description: 'Optional image to represent this city (e.g., skyline)',
            },
        },
    ],
    timestamps: true,
};