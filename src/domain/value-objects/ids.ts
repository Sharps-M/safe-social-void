/**
 * Identificadores de dominio como *branded types*: por dentro son `string`, pero el
 * compilador los trata como tipos distintos. Asi un `AuthorId` nunca se confunde con un
 * `ConversationId` ni con un string cualquiera, y todo eso sin costo en runtime.
 *
 * El valor concreto (numero, JID, hash...) lo decide cada adapter de plataforma.
 * El dominio solo los compara por igualdad; no sabe ni le importa que hay adentro.
 */
declare const brand: unique symbol;
type Branded<T, B extends string> = T & { readonly [brand]: B };

export type AuthorId = Branded<string, 'AuthorId'>;
export type ConversationId = Branded<string, 'ConversationId'>;
export type MessageId = Branded<string, 'MessageId'>;

const nonEmpty = (raw: string, kind: string): string => {
  if (raw.length === 0) throw new Error(`${kind} no puede ser vacio`);
  return raw;
};

export const AuthorId = (raw: string): AuthorId => nonEmpty(raw, 'AuthorId') as AuthorId;
export const ConversationId = (raw: string): ConversationId =>
  nonEmpty(raw, 'ConversationId') as ConversationId;
export const MessageId = (raw: string): MessageId => nonEmpty(raw, 'MessageId') as MessageId;
