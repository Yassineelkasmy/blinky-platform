import { CollectionConfig } from "payload";

export const MediaRequests: CollectionConfig = {
    slug: 'media-requests',
    labels: {
        singular: 'Media Request',
        plural: 'Media Requests',
    },
    auth: false,
    admin: {
        defaultColumns: ['filename', 'status', 'requestedBy', 'relatedTo'],
    },
    access: {
        read: ({ req: { user } }) => !!user,           // only authenticated dashboard users and admins
        create: ({ req: { user } }) => !!user,         // store owners or dashboard users can request uploads
        update: ({ req: { user } }) => !!user,         // admins will update status
        delete: ({ req: { user } }) => !!user,         // restricted to admins if needed
    },
    upload: {
        staticDir: 'media/requests',
        mimeTypes: ['image/*', 'video/*'],
    },
    fields: [
        // Optional: link to a specific store
        {
            name: 'store',
            type: 'relationship',
            relationTo: 'stores',
            required: false,
            admin: { description: 'Associate request with a store' },
        },
        {
            name: 'altText',
            type: 'text',
            admin: { description: 'Alt text or caption for the media' },
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'pending',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Rejected', value: 'rejected' },
            ],
            admin: { position: 'sidebar' },
        },
        // Predefined rejection reasons
        {
            name: 'rejectionReasonCode',
            type: 'select',
            options: [
                { label: 'Low Quality', value: 'low_quality' },
                { label: 'Inappropriate Content', value: 'inappropriate' },
                { label: 'Wrong Product', value: 'wrong_product' },
                { label: 'Other', value: 'other' },
            ],
            admin: {
                condition: (_, siblingData) => siblingData.status === 'rejected',
                description: 'Select a reason when rejecting',
            },
        },
        {
            name: 'rejectionReasonCustom',
            type: 'text',
            admin: {
                condition: (_, siblingData) => siblingData.status === 'rejected' && siblingData.rejectionReasonCode === 'other',
                description: 'Provide custom reason if "Other" selected',
            },
        },
        {
            name: 'adminNotes',
            type: 'textarea',
            admin: {
                description: 'Internal notes for this request',
            },
        },
    ],
};
