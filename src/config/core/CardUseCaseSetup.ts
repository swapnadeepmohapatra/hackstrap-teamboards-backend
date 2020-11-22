/* eslint-disable require-jsdoc */
import {
  AddCardUseCase,
  CardEntityGateway,
  DeleteCardUseCase,
  DragCardUseCase,
  EditCardDateUseCase,
  EditCardPriorityUseCase,
  EditCardTextUseCase,
} from '../../core/usecases/card';

class CardUseCaseSetup {
  static addCardUseCase(cardEntityGateway: CardEntityGateway): AddCardUseCase {
    return new AddCardUseCase(cardEntityGateway);
  }
  static deleteCardUseCase(
    cardEntityGateway: CardEntityGateway,
  ): DeleteCardUseCase {
    return new DeleteCardUseCase(cardEntityGateway);
  }
  static editCardTextUseCase(
    cardEntityGateway: CardEntityGateway,
  ): EditCardTextUseCase {
    return new EditCardTextUseCase(cardEntityGateway);
  }
  static editCardDateUseCase(
    cardEntityGateway: CardEntityGateway,
  ): EditCardDateUseCase {
    return new EditCardDateUseCase(cardEntityGateway);
  }
  static editCardPriorityUseCase(
    cardEntityGateway: CardEntityGateway,
  ): EditCardPriorityUseCase {
    return new EditCardPriorityUseCase(cardEntityGateway);
  }
  static dragCardUseCase(
    cardEntityGateway: CardEntityGateway,
  ): DragCardUseCase {
    return new DragCardUseCase(cardEntityGateway);
  }
}

export default CardUseCaseSetup;
