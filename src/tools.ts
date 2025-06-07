import Firecrawl, { SearchResponse, FirecrawlDocument } from 'firecrawl';

export const tools = {
    // ... existing tools ...

    performWebSearch: {
        name: "performWebSearch",
        description: "Perform a web search using the Firecrawl API and return relevant results",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query to find relevant information"
                }
            },
            required: ["query"]
        },
        async handler({ query }: { query: string }) {
            try {
                const crawler = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
                const response = await crawler.search(query);

                if (!response.success) {
                    throw new Error(response.error || 'Search failed');
                }

                return response.data.map((doc: FirecrawlDocument) => ({
                    title: doc.title || '',
                    url: doc.url || '',
                    snippet: doc.description || ''
                }));
            } catch (error) {
                console.error('Error performing web search:', error);
                throw new Error('Failed to perform web search');
            }
        }
    }
};
