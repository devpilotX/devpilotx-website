// LLM pricing data, refreshed for late 2025.
// Prices are per 1M tokens unless stated. Always verify with each provider's docs before billing decisions.

export type LLMProvider =
  | 'OpenAI'
  | 'Anthropic'
  | 'Google'
  | 'DeepSeek'
  | 'Mistral'
  | 'Meta'
  | 'Alibaba'
  | 'xAI';

export type LLMModel = {
  id: string;
  name: string;
  provider: LLMProvider;
  context: number; // in tokens
  maxOutput: number; // in tokens
  inputPer1M: number; // USD
  outputPer1M: number; // USD
  modality: ('text' | 'vision' | 'audio')[];
  notes?: string;
  /** rough chars-per-token for this family's tokenizer */
  charsPerToken: number;
  /** tag for sorting / filtering */
  tier: 'frontier' | 'workhorse' | 'fast' | 'value';
};

export const llmModels: LLMModel[] = [
  { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', context: 400_000, maxOutput: 128_000, inputPer1M: 1.25, outputPer1M: 10.0, modality: ['text', 'vision'], charsPerToken: 4.0, tier: 'frontier' },
  { id: 'gpt-5-mini', name: 'GPT-5 mini', provider: 'OpenAI', context: 400_000, maxOutput: 128_000, inputPer1M: 0.25, outputPer1M: 2.0, modality: ['text', 'vision'], charsPerToken: 4.0, tier: 'fast' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', context: 128_000, maxOutput: 16_384, inputPer1M: 2.5, outputPer1M: 10.0, modality: ['text', 'vision', 'audio'], charsPerToken: 4.0, tier: 'workhorse' },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'OpenAI', context: 128_000, maxOutput: 16_384, inputPer1M: 0.15, outputPer1M: 0.6, modality: ['text', 'vision'], charsPerToken: 4.0, tier: 'value' },
  { id: 'claude-opus-4-1', name: 'Claude Opus 4.1', provider: 'Anthropic', context: 200_000, maxOutput: 32_000, inputPer1M: 15.0, outputPer1M: 75.0, modality: ['text', 'vision'], charsPerToken: 3.8, tier: 'frontier' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'Anthropic', context: 200_000, maxOutput: 64_000, inputPer1M: 3.0, outputPer1M: 15.0, modality: ['text', 'vision'], notes: '1M context in beta', charsPerToken: 3.8, tier: 'workhorse' },
  { id: 'claude-haiku-3-5', name: 'Claude Haiku 3.5', provider: 'Anthropic', context: 200_000, maxOutput: 8_192, inputPer1M: 0.8, outputPer1M: 4.0, modality: ['text', 'vision'], charsPerToken: 3.8, tier: 'fast' },
  { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', context: 1_000_000, maxOutput: 65_536, inputPer1M: 1.25, outputPer1M: 10.0, modality: ['text', 'vision', 'audio'], notes: 'Up to 2M context tier available', charsPerToken: 4.0, tier: 'frontier' },
  { id: 'gemini-2-5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', context: 1_000_000, maxOutput: 65_536, inputPer1M: 0.3, outputPer1M: 2.5, modality: ['text', 'vision', 'audio'], charsPerToken: 4.0, tier: 'fast' },
  { id: 'deepseek-v3-2', name: 'DeepSeek V3.2', provider: 'DeepSeek', context: 128_000, maxOutput: 8_192, inputPer1M: 0.28, outputPer1M: 0.42, modality: ['text'], charsPerToken: 4.0, tier: 'value' },
  { id: 'mistral-large-2', name: 'Mistral Large 2', provider: 'Mistral', context: 128_000, maxOutput: 8_192, inputPer1M: 2.0, outputPer1M: 6.0, modality: ['text'], charsPerToken: 4.0, tier: 'workhorse' },
  { id: 'llama-3-1-405b', name: 'Llama 3.1 405B', provider: 'Meta', context: 128_000, maxOutput: 4_096, inputPer1M: 3.0, outputPer1M: 3.0, modality: ['text'], notes: 'Via Fireworks/Together; varies by host', charsPerToken: 4.0, tier: 'workhorse' },
  { id: 'qwen-2-5-72b', name: 'Qwen 2.5 72B', provider: 'Alibaba', context: 128_000, maxOutput: 8_192, inputPer1M: 0.5, outputPer1M: 0.5, modality: ['text'], notes: 'Pricing via hosts like Together', charsPerToken: 4.0, tier: 'value' },
  { id: 'grok-4', name: 'Grok 4', provider: 'xAI', context: 256_000, maxOutput: 8_192, inputPer1M: 3.0, outputPer1M: 15.0, modality: ['text', 'vision'], charsPerToken: 4.0, tier: 'frontier' }
];

export type EmbeddingModel = {
  id: string;
  name: string;
  provider: string;
  dim: number;
  pricePer1M: number; // USD per 1M tokens
};

export const embeddingModels: EmbeddingModel[] = [
  { id: 'text-embedding-3-small', name: 'OpenAI text-embedding-3-small', provider: 'OpenAI', dim: 1536, pricePer1M: 0.02 },
  { id: 'text-embedding-3-large', name: 'OpenAI text-embedding-3-large', provider: 'OpenAI', dim: 3072, pricePer1M: 0.13 },
  { id: 'cohere-embed-v3-en', name: 'Cohere embed v3.0 English', provider: 'Cohere', dim: 1024, pricePer1M: 0.10 },
  { id: 'voyage-3', name: 'Voyage AI voyage-3', provider: 'Voyage', dim: 1024, pricePer1M: 0.06 },
  { id: 'jina-embeddings-v3', name: 'Jina embeddings v3', provider: 'Jina', dim: 1024, pricePer1M: 0.05 }
];

export function formatUSD(n: number): string {
  if (n === 0) return '$0.00';
  if (n < 0.01) return '$' + n.toFixed(5);
  if (n < 1) return '$' + n.toFixed(4);
  if (n < 100) return '$' + n.toFixed(2);
  return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatTokens(n: number): string {
  if (n < 1000) return String(Math.round(n));
  if (n < 1_000_000) return (n / 1000).toFixed(n < 10_000 ? 2 : 1) + 'k';
  return (n / 1_000_000).toFixed(n < 10_000_000 ? 2 : 1) + 'M';
}

export function formatBytes(n: number): string {
  if (n < 1024) return n + ' B';
  if (n < 1024 ** 2) return (n / 1024).toFixed(1) + ' KB';
  if (n < 1024 ** 3) return (n / 1024 ** 2).toFixed(1) + ' MB';
  if (n < 1024 ** 4) return (n / 1024 ** 3).toFixed(2) + ' GB';
  return (n / 1024 ** 4).toFixed(2) + ' TB';
}
