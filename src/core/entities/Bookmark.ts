interface IBookmark {
  id: bigint;
  link: string;
  title: string;
  created: number;
  updated: number;
  publisher: string;
  tags: Array<string>;
}

export default IBookmark;
