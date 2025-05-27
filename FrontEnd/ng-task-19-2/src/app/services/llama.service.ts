import { Injectable } from '@angular/core';

declare const LlamaContext: any;  // Expuesto por llama.js

@Injectable({ providedIn: 'root' })
export class LlamaService {
  private ctx: any;

  /** Inicializa el motor llama.cpp con el modelo */
  async init(modelPath: string, nThreads = 4) {
    this.ctx = new LlamaContext({
      modelUrl: modelPath,
      n_threads: nThreads
    });
    // Si llama.js requiere un load explícito, por ejemplo:
    if (this.ctx.load) {
      await this.ctx.load();
    }
  }

  /** Envía un prompt y devuelve la respuesta de la IA */
  async chat(prompt: string, maxTokens = 128): Promise<string> {
    if (!this.ctx) {
      throw new Error('LlamaService no inicializado. Llama a init() primero.');
    }
    const resp = await this.ctx.chat({
      prompt,
      max_tokens: maxTokens
    });
    return resp.trim();
  }
}
