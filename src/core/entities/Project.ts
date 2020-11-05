import { ObjectID } from 'mongodb';

interface Project {
  title: string;
  desc?: string;
  boards?: ObjectID[];
  author: string;
  members?: string[];
}

export default Project;
