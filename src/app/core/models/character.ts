import { Contact } from './contact';
export class Character{
  id!: number;
  name!: string;
  status!: string;
  species!: string;
  gender!: string;
  image!: string;
  created!: Date;
  contact!: Contact;
}
