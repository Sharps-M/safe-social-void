import { describe, expect, it } from 'vitest';
import { evaluate } from './evaluate';
import type { Message } from '../entities/message';
import { createFilterRule, type FilterRule } from '../entities/filter-rule';
import { AuthorId, ConversationId, MessageId } from '../value-objects/ids';

const NOW = 1_000_000;

const msg = (author: string): Message => ({
  id: MessageId('m1'),
  authorId: AuthorId(author),
  conversationId: ConversationId('c1'),
});

const rule = (author: string, until: number | null = null): FilterRule =>
  createFilterRule({ platformId: 'whatsapp-web', authorId: AuthorId(author), mode: 'hidden', until, now: NOW });

describe('evaluate', () => {
  it('muestra el mensaje si no hay reglas', () => {
    expect(evaluate(msg('alice'), [], NOW)).toEqual({ action: 'show' });
  });

  it('oculta si hay una regla permanente para el autor', () => {
    expect(evaluate(msg('alice'), [rule('alice')], NOW)).toEqual({ action: 'hide', mode: 'hidden' });
  });

  it('muestra si la regla es de otro autor', () => {
    expect(evaluate(msg('alice'), [rule('bob')], NOW)).toEqual({ action: 'show' });
  });

  it('oculta mientras la regla temporal no venza', () => {
    expect(evaluate(msg('alice'), [rule('alice', NOW + 100)], NOW)).toEqual({ action: 'hide', mode: 'hidden' });
  });

  it('muestra cuando la regla temporal ya vencio', () => {
    expect(evaluate(msg('alice'), [rule('alice', NOW - 1)], NOW)).toEqual({ action: 'show' });
  });

  it('trata el instante exacto de vencimiento como vencido', () => {
    expect(evaluate(msg('alice'), [rule('alice', NOW)], NOW)).toEqual({ action: 'show' });
  });

  it('respeta el modo de la regla que matchea', () => {
    const r = createFilterRule({ platformId: 'whatsapp-web', authorId: AuthorId('alice'), mode: 'placeholder', now: NOW });
    expect(evaluate(msg('alice'), [r], NOW)).toEqual({ action: 'hide', mode: 'placeholder' });
  });
});
