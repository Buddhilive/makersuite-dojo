export interface ChatRequestInterface {
    context: string,
    examples: [
        {
            input: {
                content: string
            },
            output: {
                content: string
            }
        }
    ],
    messages: [
        {
            content: string
        }
    ]
    temperature: number,
    top_k: number,
    top_p: number,
    candidate_cunt: number
}