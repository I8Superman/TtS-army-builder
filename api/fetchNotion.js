import { Client } from '@notionhq/client';

const { NOTION_KEY, NOTION_DB } = process.env;

const notion = new Client({
    auth: NOTION_KEY,
})

export default async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: NOTION_DB,
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Notion');
    }
};


// export default async (req, context) => {
//     return new Response("Hello, world!");
// };

// import Client from '@notionhq/client';

// const { NOTION_KEY, NOTION_DB } = process.env;

// const notion = new Client({
//     auth: NOTION_KEY,
// })


// export async function handler(event, context) {
//     return {
//         statusCode: 200,
//         body: JSON.stringify({ message: "Hello from Vercel Functions using ES Modules!" })
//     };
// }


// const getData = async () => {
//     const response = await notion.databases.retrieve({ database_id: NOTION_DB });
//     console.log(response);
// };

// getData()

// eslint-disable-next-line no-unexpected-multiline
// (async (event, context) => {
//     try {
//         console.log(NOTION_DB)
//         const response = await notion.databases.retrieve({ database_id: NOTION_DB });
//         return {
//             statusCode: 200,
//             body: JSON.stringify(response),
//         };
//     } catch (error) {
//         console.log(error)
//         return {

//             body: JSON.stringify({ error: error.message }),
//         };
//     }
// })()

// (async () => {
//     const databaseId = 'd9824bdc-8445-4327-be8b-5b47500af6ce';
//     const response = await notion.databases.query({
//         database_id: databaseId,
//         filter: {
//             or: [
//                 {
//                     property: 'In stock',
//                     checkbox: {
//                         equals: true,
//                     },
//                 },
//                 {
//                     property: 'Cost of next trip',
//                     number: {
//                         greater_than_or_equal_to: 2,
//                     },
//                 },
//             ],
//         },
//         sorts: [
//             {
//                 property: 'Last ordered',
//                 direction: 'ascending',
//             },
//         ],
//     });
//     console.log(response);
// })();


// const { Client } = require('@notionhq/client');

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// module.exports = async (req, res) => {
//     try {
//         const response = await notion.databases.query({
//             database_id: 'your_database_id_here',
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching data from Notion');
//     }
// };