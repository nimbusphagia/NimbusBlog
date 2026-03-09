export type Block = {
  id: string,
  entryId: string,
  blockType: 'HEADING' | 'TEXT' | 'IMAGE',
  index: number,
  text?: string,
  mediaSrc?: string,
}
