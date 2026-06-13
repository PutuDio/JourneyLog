import { Prisma } from "@prisma/client";

const noteInclude = {
  category: true,
  noteTags: { include: { tag: true } },
  images: true,
} as const;

export type NoteWithRelations = Prisma.NoteGetPayload<{
  include: typeof noteInclude;
}>;

export { noteInclude };
