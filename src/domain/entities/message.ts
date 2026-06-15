import type { AuthorId, ConversationId, MessageId } from '../value-objects/ids';

/** Representacion de dominio de un mensaje. Cero DOM: la construye el adapter. */
export interface Message {
  readonly id: MessageId;
  readonly authorId: AuthorId;
  readonly conversationId: ConversationId;
}
