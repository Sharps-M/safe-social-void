import type { Message } from '../entities/message';
import type { AuthorId, ConversationId } from '../value-objects/ids';
import type { PlatformId } from '../value-objects/platform-id';
import type { FilterDecision } from '../filtering/evaluate';

export interface Disposable {
  dispose(): void;
}

/**
 * Puerto de plataforma. Cada mensajeria (WhatsApp primero, luego Telegram...) lo
 * implementa. `TNode` es el tipo de nodo de UI: en el browser sera `HTMLElement`, pero
 * el dominio lo trata como OPACO para no depender del DOM.
 *
 * IMPORTANTE: solo lectura + render local. No existe `send`, `delete` ni `revoke`. El
 * codigo es estructuralmente incapaz de actuar sobre el servicio (esa es la garantia
 * read-only, verificable por tipos, no una promesa del README).
 */
export interface PlatformAdapter<TNode = unknown> {
  readonly platformId: PlatformId;
  observe(onMessage: (node: TNode, message: Message) => void): Disposable;
  resolveAuthor(node: TNode): AuthorId | null;
  applyDecision(node: TNode, decision: FilterDecision): void;
  getConversationContext(node: TNode): ConversationId | null;
}
