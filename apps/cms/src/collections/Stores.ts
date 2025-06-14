import { CollectionConfig } from "payload";

export const Stores: CollectionConfig = {
    slug: 'stores',
    labels: {
        singular: 'Store',
        plural: 'Stores',
    },
    auth: false,
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'coreId',
            type: 'text',
            admin: { readOnly: true },
        },
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
        },
        // Use StoreMedia collection for media assets
        {
            name: 'logoAsset',
            label: 'Logo Image',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                description: 'Select an approved logo asset from StoreMedia',
            },
        },
        {
            name: 'headerAsset',
            label: 'Header Image',
            type: 'relationship',
            relationTo: 'media',
            admin: {
                description: 'Select an approved header asset from StoreMedia',
            },
        },
        {
            name: 'contactPhone',
            type: 'text',
        },
        {
            name: 'website',
            type: 'text',
        },
        {
            name: 'tags',
            type: 'array',
            fields: [{ name: 'tag', type: 'text' }],
        },
        {
            name: 'sites',
            label: 'Store Sites / Locations',
            type: 'array',
            fields: [
                {
                    name: 'coreId',
                    type: 'text',
                    admin: { readOnly: true },
                },
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Display name for this site/location',
                    },
                },
                {
                    name: 'address',
                    type: 'text',
                },
                {
                    name: 'city',
                    type: 'relationship',
                    relationTo: 'cities',
                    required: true,
                },
                {
                    name: 'postalCode',
                    type: 'text',
                },
                {
                    name: 'phone',
                    type: 'text',
                },
                {
                    name: 'location',
                    type: 'point',
                },
                {
                    name: 'siteLogoAsset',
                    label: 'Site Logo',
                    type: 'relationship',
                    relationTo: 'media',
                    admin: {
                        description: 'Select an approved media asset for site logo',
                    },
                },
                {
                    name: 'siteHeaderAsset',
                    label: 'Site Header',
                    type: 'relationship',
                    relationTo: 'media',
                    admin: {
                        description: 'Select an approved media asset for site header',
                    },
                },
                {
                    name: 'approved',
                    type: 'checkbox',
                    defaultValue: false,
                },
            ],
        },
    ],
};
