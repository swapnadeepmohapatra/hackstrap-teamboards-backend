import { RequestDTO } from 'core/definition';

class EditCardPriorityRequestDTO implements RequestDTO {
  body: any;
  user: any;

  constructor(obj: any) {
    this.body = obj.body;
    this.user = obj.header('user');
  }

  validate(): Boolean {
    if (!this.body) return false;

    return true;
  }
}

export default EditCardPriorityRequestDTO;
