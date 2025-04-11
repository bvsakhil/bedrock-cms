import { CollectionConfig } from 'payload';
import { anyone } from '../access/anyone'
import { withCors } from '@/utilities/custom';
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'maile',
  },
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
  },
  fields: [
    {
      name: 'maile',
      type: 'email',
      required: true,
      unique: true,
    },     
  ],
  endpoints: [
    {
      path: '/subscribe',
      method: 'post',
      handler: withCors(async (req) => {
        if(req.json === undefined) {
          return Response.json({
            message: 'send maile',
          });
        }
        const data = await req.json(); // parse the request body
        const { maile } = data; // destructure whatever you're sending

        if (!maile || typeof maile !== 'string') {
          return Response.json({
            message: 'send maile',
          })
        }

        try {
          const existing = await req.payload.find({
            collection: 'subscribers',
            where: { maile: { equals: maile } },
          });

          if (existing.docs.length > 0) {
            return Response.json({
              message: 'Already subscribed',
            })
          }

          const created = await req.payload.create({
            collection: 'subscribers',
            data: { maile },
          });

          return Response.json({ message: 'Subscribed!', doc: created });
        } catch (err) {
          console.error('Subscription error:', err);
          return Response.json({ error: 'Something went wrong' });
        }
      }),
    },
  ],
};


