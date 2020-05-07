import { User } from './User';
import { Post } from './Post';

export class Comment{
    "idComment":number;
    "user":User;
    "post":Post;
    "texte":string;
    "dateComment":number;
}