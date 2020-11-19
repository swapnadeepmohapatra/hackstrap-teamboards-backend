/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable require-jsdoc */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
import { RequestDTO } from 'core/definition';

class AddListRequestDTO implements RequestDTO {
  body: any;
  user: any;

  constructor(obj: any) {
    this.body = obj.body;
    this.user = obj.header('user');
  }

  validate(): boolean {
    if (!this.body) return false;
    if (!this.user) return false;

    return true;
  }
}

export default AddListRequestDTO;
