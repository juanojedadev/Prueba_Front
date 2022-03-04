import { GenericInterfaceObject } from "@coreelements/interface/generic.interface";
import { Character } from "@coreelements/models/character";
import { Subject } from "rxjs";



export abstract class CharacterGateway extends GenericInterfaceObject<Character, Number>{
  abstract _getRefresher(): Subject<void>;
}
