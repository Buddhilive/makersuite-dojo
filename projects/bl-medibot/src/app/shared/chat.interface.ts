export interface ChatRequestInterface {
    context: string,
    examples: Array<ExamplesItem>,
    messages: Array<MsgItem>,
    temperature: number,
    top_k: number,
    top_p: number,
    candidate_cunt: number
}

interface ExamplesItem {
    input: MsgItem,
    output: MsgItem
}

interface MsgItem {
    content: string
}