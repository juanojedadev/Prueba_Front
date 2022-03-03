import { GenericInterfaceObject } from "@coreelements/interface/generic.interface";
import { Fruit } from "@coreelements/models/fruit";
import { Subject } from "rxjs";



export abstract class FruitGateway extends GenericInterfaceObject<Fruit, Number>{
  abstract setRefreshDataTap() : Subject<void>;
}
